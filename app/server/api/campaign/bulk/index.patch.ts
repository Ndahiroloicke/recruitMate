import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { checkBulkEditSchema } from '~/lib/validation/general'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, checkBulkEditSchema.parse)
    const { ids, status } = body

    const { data, error } = await (await serverSupabaseClient<Database>(event))
        .from('campaigns')
        .update({ status })
        .in('id', ids)

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, { updatedCount: (data ?? []).length || 0 })
})
