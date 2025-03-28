import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const orderBy = query.orderBy as string || 'id'
    const direction = query.direction === 'asc'
    const teamId = query.teamId as string | undefined

    const client = await serverSupabaseClient<Database>(event)
    let queryBuilder = client.from('campaigns')
        .select('*, stats:campaigns_stats(*)')

    if (teamId) {
        queryBuilder = queryBuilder.eq('team_id', teamId)
    }

    const { data: campaigns, error } = await queryBuilder
        .order(orderBy, { ascending: direction })
        .then(result => result)

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, campaigns?.map((item) => {
        return {
            ...item,
            stats: item.stats[0],
        }
    }) || undefined)
})
