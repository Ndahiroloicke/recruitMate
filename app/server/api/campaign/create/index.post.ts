import type { z } from 'zod'
import type { CandidateItem, NormalizedCandidate } from '~/server/types/candidateInterfaces'
import type { Database } from '~/server/types/supabase'
import type { TableRows } from '~/types/supabase-helper'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { campaignWizardSchema } from '~/lib/validation/campaignCreate'
import { uploadCompanyAvatar } from '~/server/utils/uploadAvatar'
import { createApiResponse, formDataToObject } from '~/server/utils/useHelper'

type CampaignWizard = z.infer<typeof campaignWizardSchema>

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)

    if (!formData) {
        throw createError({
            status: 400,
            statusMessage: 'No form data provided',
        })
    }

    const { companyAvatar, ...parsedData } = formDataToObject(formData) as CampaignWizard
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)

    const result = campaignWizardSchema.parse(parsedData)

    if (companyAvatar?.buffer) {
        if (!user?.id) {
            throw createError({ status: 401, statusMessage: 'Unauthorized' })
        }
        result.companyAvatar = await uploadCompanyAvatar(client, user.id, companyAvatar.buffer)
    }

    const { data: teamExists, error: teamError } = await client
        .from('teams')
        .select('id')
        .eq('id', Number(result.teamId))
        .single()

    if (teamError || !teamExists) {
        throw createError({
            status: 400,
            statusMessage: 'Invalid team ID provided',
        })
    }

    const campaignPayload = {
        tags: result.tags?.replace(/"/g, '').split(',').map(tag => tag.trim()) || [],
        hiring_company: result.hiringCompany || '',
        company_logo: result?.companyAvatar || '',
        description: result.campaignDescription || '',
        template_id: Number(result.readyMadeTemplate),
        team_id: Number(result.teamId),
        name: result.campaignName || '',
        status: 'draft' as const,
    }

    const { data: _data, error: _error } = await client
        .from('campaigns')
        .insert([campaignPayload])
        .select('id')
        .single()

    if (_error) {
        throw createError({
            status: Number(_error.code),
            statusMessage: _error.message,
        })
    }

    if (typeof result.importNewCandidates === 'string') {
        const candidates: Omit<TableRows<'candidates'>, 'created_at' | 'id' | 'recruiter_id' | 'resume' | 'updated_at'>[] = JSON.parse(result.importNewCandidates).map((item: CandidateItem) => {
            // Parse the resume content
            const contactInfo = item['Contact Information'] || {}
            const workExperience = item['Work Experience'] || []
            const currentPosition = workExperience[0] || {} // Get most recent position

            const candidate: NormalizedCandidate = {
                email: contactInfo.email || '',
                first_name: item.Name?.split(' ')[0] || '',
                last_name: item.Name?.split(' ').slice(1).join(' ') || '', // Handle multi-word last names
                phone: contactInfo.phone || '',
                resume_content: JSON.stringify(item),
                // Add current position and company info
                position: currentPosition['job title'] || null,
                companyInfo: currentPosition.company ? {
                    company: currentPosition.company,
                    years: currentPosition.years
                } : null
            }

            console.log('Normalized candidate data:', {
                name: `${candidate.first_name} ${candidate.last_name}`,
                email: candidate.email,
                phone: candidate.phone,
                position: candidate.position,
                company: candidate.companyInfo?.company
            })

            return candidate
        })

        const { data: insertedCandidates, error: candidate_error } = await client
            .from('candidates')
            .insert(candidates)
            .select('id')

        if (candidate_error) {
            throw createError({
                status: Number(candidate_error.code),
                statusMessage: candidate_error.message,
            })
        }

        if (insertedCandidates && insertedCandidates.length > 0) {
            const campaignCandidates = insertedCandidates.map(candidate => ({
                campaign_id: _data.id,
                candidate_id: candidate.id,
            }))

            const { error: campaignCandidateError } = await client
                .from('campaigns_candidates')
                .insert(campaignCandidates)

            if (campaignCandidateError) {
                throw createError({
                    status: Number(campaignCandidateError.code),
                    statusMessage: campaignCandidateError.message,
                })
            }
        }
    }

    return createApiResponse(200, _data.id)
})
