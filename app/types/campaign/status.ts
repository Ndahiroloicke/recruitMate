export enum CampaignStatus {
    CONTACTED = 1,
    SCREENING_INTERVIEW = 2,
    PRE_SCREEN_INTERVIEW = 3,
    HIRING_MANAGER_INTERVIEW = 4,
    OFFER_STAGE = 5,
    HIRED = 6,
}

export enum CampaignStatusColor {
    CONTACTED = 'blue',
    SCREENING_INTERVIEW = 'orange',
    PRE_SCREEN_INTERVIEW = 'purple',
    HIRING_MANAGER_INTERVIEW = 'yellow',
    OFFER_STAGE = 'red',
    HIRED = 'green',
}

export enum CampaignStatusHexColor {
    CONTACTED = 'text-text-blue-inverted',
    SCREENING_INTERVIEW = 'text-text-orange-inverted',
    PRE_SCREEN_INTERVIEW = 'text-text-purple-inverted',
    HIRING_MANAGER_INTERVIEW = 'text-text-yellow-inverted',
    OFFER_STAGE = 'text-text-red-inverted',
    HIRED = 'text-text-green-inverted',
}

export enum CampaignStatusTranslation {
    CONTACTED = 'Contacted',
    SCREENING_INTERVIEW = 'Screening Interview',
    PRE_SCREEN_INTERVIEW = 'Pre-screen Interview',
    HIRING_MANAGER_INTERVIEW = 'Hiring Manager Interview',
    OFFER_STAGE = 'Offer Stage',
    HIRED = 'Hired',
}
