import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { createApiResponse } from '~/server/utils/useHelper'

interface ResumeContent {
    workExperience: WorkExperience[]
}

interface WorkExperience {
    jobTitle: string
    company: string
    years: string
}

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event)

    const { data, error } = await client.from('candidates').select('id, first_name, last_name, resume_content')

    if (error) {
        return createApiResponse(500, null, error.message)
    }

    const processedData = data?.map((candidate) => {
        const resumeContent = candidate.resume_content as unknown as ResumeContent
        const workExperience = Array.isArray(resumeContent?.workExperience) ? resumeContent.workExperience : []
        const companyInfo = workExperience.reduce((latest, current) => {
            const latestDate = new Date(latest.years.split(' – ')[1] || '1970/01')
            const currentDate = new Date(current.years.split(' – ')[1] || '1970/01')
            return currentDate > latestDate ? current : latest
        }, workExperience[0])

        return {
            id: candidate.id,
            first_name: candidate?.first_name,
            last_name: candidate?.last_name,
            position: companyInfo?.jobTitle,
            companyInfo: companyInfo
                ? {
                        company: companyInfo.company || null,
                        years: companyInfo.years || null,
                    }
                : null,
        }
    })

    return createApiResponse(200, processedData)
})
