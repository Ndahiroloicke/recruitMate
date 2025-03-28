export interface ICandidateResponse {
    id: number
    first_name: string
    last_name: string
    position: string
    companyInfo: {
        company: string
        years: string
    }
    key?: string
    avatar: string
    startSince: number
    endSince: number
    campaigns: number[]
}
