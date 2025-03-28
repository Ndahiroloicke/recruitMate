import { z } from 'zod'

export interface TeamSettings {
    name: string
    description?: string
    logo?: string | File
}

export interface TeamLimits {
    size: number
    candidates: number
    campaigns: number
}

export const teamSettingsSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().optional(),
    logo: z.any().optional(),
}) satisfies z.ZodType<TeamSettings>

export const teamLimitSchema = z.object({
    size: z.number().min(1).max(1000),
    candidates: z.number().min(1).max(10000),
    campaigns: z.number().min(1).max(100),
}) satisfies z.ZodType<TeamLimits>

export type TeamSettingsSchema = z.infer<typeof teamSettingsSchema>
export type TeamLimitSchema = z.infer<typeof teamLimitSchema>
