import type { z } from 'zod'
import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { candidatesBulkUpsertSchema } from '~/lib/validation/candidatesBulkUpsertSchema'

export default defineEventHandler(async (event) => {
    const body: z.infer<typeof candidatesBulkUpsertSchema> = await readValidatedBody(event, candidatesBulkUpsertSchema.parse)
    const { ids, campaign_ids } = body

    const records = ids.flatMap((candidate_id: number) =>
        campaign_ids.map((campaign_id: number) => ({
            campaign_id,
            candidate_id,
        })),
    )

    const { data, error } = await (await serverSupabaseClient<Database>(event))
        .from('campaigns_candidates')
        .upsert(records, { onConflict: 'campaign_id,candidate_id' })

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, { updatedCount: (data ?? []).length || 0 })
})
