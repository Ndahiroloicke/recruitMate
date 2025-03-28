import { serverSupabaseClient } from '#supabase/server'
import { checkBulkDeleteSchema } from '~/lib/validation/general'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, checkBulkDeleteSchema.parse)

    const { ids } = checkBulkDeleteSchema.parse(body)

    const { data, error } = await (await serverSupabaseClient(event))
        .from('campaigns')
        .delete()
        .in('id', ids)

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, { deletedCount: (data ?? []).length || 0 })
})
