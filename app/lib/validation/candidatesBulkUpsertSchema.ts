import { z } from 'zod'

export const candidatesBulkUpsertSchema = z.object({
    ids: z.array(z.number()),
    campaign_ids: z.array(z.number()),
})
