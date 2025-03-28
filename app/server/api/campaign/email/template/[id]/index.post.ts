import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { emailTemplateSchema, getTemplateEmailByIdSchema } from '~/lib/validation/emailTemplate'

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, getTemplateEmailByIdSchema.parse)
    const body = await readValidatedBody(event, emailTemplateSchema.parse)

    const { data: templates, error } = await (await serverSupabaseClient<Database>(event))
        .from('template_email')
        .update(body)
        .filter('id', 'eq', Number(id))
        .select('id')
        .single()
        .then(result => result)

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, templates || undefined)
})
