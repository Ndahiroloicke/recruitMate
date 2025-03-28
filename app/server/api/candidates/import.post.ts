import type { CandidateItem, NormalizedCandidate } from '~/server/types/candidateInterfaces'
import type { Database } from '~/server/types/supabase'
import type { TableRows } from '~/types/supabase-helper'
import { serverSupabaseClient } from '#supabase/server'
import { createApiResponse } from '~/server/utils/useHelper'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const client = await serverSupabaseClient<Database>(event)

        if (!body.candidates || !Array.isArray(body.candidates)) {
            return createApiResponse(400, null, 'Invalid candidates data')
        }

        const candidates: Omit<TableRows<'candidates'>, 'created_at' | 'id' | 'recruiter_id' | 'resume' | 'updated_at'>[] = body.candidates.map((item: CandidateItem) => {
            const normalizedItem = Object.fromEntries(
                Object.entries(item).map(([key, value]) => [
                    key.charAt(0).toLowerCase() + key.slice(1),
                    value,
                ]),
            ) as CandidateItem

            const normalizedContact = normalizedItem.contactinformation || normalizedItem.contactInformation || {}

            const candidate: NormalizedCandidate = {
                email: normalizedContact.email || '',
                first_name: normalizedItem.name?.split(' ')[0] || '',
                last_name: normalizedItem.name?.split(' ')[1] || '',
                phone: normalizedContact.phone || '',
                resume_content: JSON.stringify(item),
            }

            return candidate
        })

        const { data: insertedCandidates, error: candidateError } = await client
            .from('candidates')
            .insert(candidates)
            .select('id')

        if (candidateError) {
            throw createError({
                status: Number(candidateError.code),
                statusMessage: candidateError.message,
            })
        }

        return createApiResponse(200, insertedCandidates)
    }
    catch (error: any) {
        console.error('Import error:', error)
        return createApiResponse(500, null, error.message || 'Import error')
    }
})
