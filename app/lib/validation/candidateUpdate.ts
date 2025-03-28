import { z } from 'zod'

export const candidateUpdateSchema = z.object({
    email: z.string().email().nullish(),
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    phone: z.string().nullish(),
    resume: z.string().nullish(),
    resume_content: z.any().nullish(),
}).partial()
