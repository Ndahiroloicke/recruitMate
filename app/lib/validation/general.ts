import { z } from 'zod'

export const checkBulkEditSchema = z.object({
    ids: z.array(z.number()),
    status: z.enum(['draft', 'running']),
})

export const checkBulkDeleteSchema = z.object({
    ids: z.array(z.number()),
})

export const checkByIdSchema = z.object({
    id: z.string(),
})
