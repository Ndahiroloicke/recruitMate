import type { Database } from '~/server/types/supabase'
import type { TableRows } from '~/types/supabase-helper'
import { serverSupabaseClient } from '#supabase/server'
import { createApiResponse } from '~/server/utils/useHelper'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event)
    const body = await readBody(event)

    const { status, data, error } = await client
        .from('candidates')
        .insert(body)
        .eq('email', body.email)
        .single()

    return createApiResponse<TableRows<'candidates'>>(status, data || undefined, error?.message)
})
