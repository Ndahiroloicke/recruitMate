import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { checkByIdSchema } from '~/lib/validation/general'

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, checkByIdSchema.parse)

    const client = await serverSupabaseClient<Database>(event)

    const { status, data, error } = await client.from('teams_members').select('*, member:recruiters(email, first_name, last_name, role, status, avatar)').filter('team_id', 'eq', Number(id))

    return createApiResponse(status, data, error?.message || undefined)
})
