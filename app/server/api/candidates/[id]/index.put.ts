import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { candidateUpdateSchema } from '~/lib/validation/candidateUpdate'
import { checkByIdSchema } from '~/lib/validation/general'

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, checkByIdSchema.parse)
    const formData = await readMultipartFormData(event)
    const client = await serverSupabaseClient<Database>(event)

    const formObject = formDataToObject(formData)
    const candidateData = Object.entries(formObject).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
            acc[key] = value
        }
        return acc
    }, {} as Record<string, any>)

    const validatedData = candidateUpdateSchema.parse(candidateData)

    const { data: candidate, error } = await client
        .from('candidates')
        .update(validatedData)
        .filter('id', 'eq', Number(id))
        .single()

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, candidate)
})
