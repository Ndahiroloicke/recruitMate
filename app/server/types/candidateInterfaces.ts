export interface CandidateItem {
    name?: string
    contactinformation?: {
        email?: string
        phone?: string
    }
    contactInformation?: {
        email?: string
        phone?: string
    }
    [key: string]: any
}

export interface NormalizedCandidate {
    email: string
    first_name: string
    last_name: string
    phone: string
    resume_content: string
    position?: string | null
    companyInfo?: {
        company: string
        years: string
    } | null
}
