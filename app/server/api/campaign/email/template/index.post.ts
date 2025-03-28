import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { createApiResponse } from '~/server/utils/useHelper'
import { emailTemplateSchema } from '~/lib/validation/emailTemplate'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, emailTemplateSchema.parse)

    const client = await serverSupabaseClient<Database>(event)

    const { data, error } = await client
        .from('template_email')
        .insert([
            body,
        ])
        .select('id')
        .single()

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, data)
})
