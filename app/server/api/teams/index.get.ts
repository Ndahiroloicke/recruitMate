import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { getMe } from '~/server/utils/me'
import { createApiResponse } from '~/server/utils/useHelper'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event)
    const me = await getMe(event)

    const { data, error } = await client
        .from('teams')
        .select('*')
        .filter('owner_id', 'eq', me.data?.id)

    if (error)
        throw createApiResponse(500, error.message)

    return createApiResponse(200, data)
})
