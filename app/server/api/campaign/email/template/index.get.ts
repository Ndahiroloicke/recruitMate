import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { data: templates, error } = await (await serverSupabaseClient<Database>(event))
        .from('template_email')
        .select('*')
        .order('id', { ascending: false })
        .then(result => result)

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, templates || undefined)
})
