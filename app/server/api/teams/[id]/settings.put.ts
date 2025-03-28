import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { checkByIdSchema } from '~/lib/validation/general'
import { teamSettingsSchema } from '~/lib/validation/teams'
import { createApiResponse, formDataToObject } from '~/server/utils/useHelper'

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, checkByIdSchema.parse)
    const formData = await readMultipartFormData(event)

    if (!formData) {
        throw createError({
            status: 400,
            statusMessage: 'No form data provided',
        })
    }

    const parsedFormData = formDataToObject(formData)
    const validatedData = teamSettingsSchema.parse(parsedFormData)

    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
        throw createError({
            status: 401,
            statusMessage: 'Unauthorized',
        })
    }

    let logoUrl = validatedData.logo

    const logoFile = formData.find(field => field.name === 'logo' && field.type?.startsWith('image/'))
    if (logoFile?.data) {
        const fileName = `team-${id}-${Date.now()}`
        const { error: uploadError } = await client.storage
            .from('teams')
            .upload(`logos/${fileName}`, logoFile.data, {
                contentType: logoFile.type || 'image/jpeg',
                upsert: true,
            })

        if (uploadError) {
            throw createError({
                status: 400,
                statusMessage: 'Logo upload failed',
            })
        }

        const { data: { publicUrl } } = client.storage
            .from('teams')
            .getPublicUrl(`logos/${fileName}`)

        logoUrl = publicUrl
    }

    const { data, error } = await client
        .from('teams')
        .update({
            name: validatedData.name,
            description: validatedData.description,
            logo: logoUrl,
        })
        .eq('id', Number(id))
        .select()
        .single()

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, data)
})
