import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { checkByIdSchema } from '~/lib/validation/general'

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, checkByIdSchema.parse)

    const { data: campaign, error } = await (await serverSupabaseClient<Database>(event))
        .from('campaigns')
        .select('*, stats:campaigns_stats(*)')
        .filter('id', 'eq', Number(id))
        .single()
        .then(result => result)

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, { ...campaign, stats: campaign.stats[0] })
})
