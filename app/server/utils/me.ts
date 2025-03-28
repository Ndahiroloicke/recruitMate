import type { EventHandlerRequest, H3Event } from 'h3'
import type { Database } from '../types/supabase'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export async function getMe(event: H3Event<EventHandlerRequest>) {
    const client = await serverSupabaseClient<Database>(event)
    const auth = await serverSupabaseUser(event)

    const { status, data, error } = await client.from('recruiters').select().eq('auth_id', auth?.id || '').single()

    return { status, data, error: error?.message || undefined }
}
