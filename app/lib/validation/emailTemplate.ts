import { z } from 'zod'

export const emailTemplateSchema = z.object({
    email_subject: z.string().min(1, 'Email subject is required'),
    email_body: z.string().min(1, 'Email body is required'),
    description: z.string().optional(),
    tags: z.any().optional(),
    title: z.string().min(1, 'Title is required'),
})

export const getTemplateEmailByIdSchema = z.object({
    id: z.string().min(1, 'Template ID is required'),
})

export type EmailTemplate = z.infer<typeof emailTemplateSchema>
