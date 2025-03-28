import type { Database } from '../../types/supabase'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event)
    const auth = await serverSupabaseUser(event)

    const { status, data, error } = await client
        .from('recruiters')
        .delete()
        .eq('auth_id', auth?.id || '')
        .single()

    return createApiResponse(status, data, error?.message || undefined)
})
