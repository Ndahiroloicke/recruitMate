<script setup lang="ts">
import { CampaignStatus, CampaignStatusColor, CampaignStatusTranslation } from '~/types/campaign/status'
import type { IDefaultResponse } from '~/types/response';

interface Props {
    item: IDefaultResponse
    isLoading?: boolean
}

defineProps<Props>()

function mapCampaigns(campaigns: number[]) {
    if (!campaigns.length)
        return null
    const primaryStatus = (campaigns[0] !== undefined ? CampaignStatus[campaigns[0]] : undefined)as keyof typeof CampaignStatusTranslation
    const primary = primaryStatus ? CampaignStatusTranslation[primaryStatus] : 'Not Found'
    const color = primaryStatus ? CampaignStatusColor[primaryStatus] as 'gray' | 'blue' | 'green' | 'red' | 'orange' | 'purple' : 'gray'
    const remaining = campaigns.length - 1

    return {
        primary,
        remaining,
        color,
    }
}

</script>

<template>
    <div v-if="isLoading" class="campaignInfo campaignInfo__loading">
        <SkeletonBadge />
    </div>
    <div v-else-if="mapCampaigns(item.campaigns)" class="campaignInfo">
        <Badge
            class="campaignInfo_primaryBadge"
            :color="mapCampaigns(item.campaigns)?.color"
            :status="mapCampaigns(item.campaigns)?.primary"
        >
            {{ mapCampaigns(item.campaigns)?.primary }}
        </Badge>
        <Badge
            class="campaignInfo_remainingBadge"
            :status="mapCampaigns(item.campaigns)?.primary"
            color="blue"
        >
            <div class="campaignInfo_remainingContent">
                <p class="campaignInfo_remainingCount">
                    {{ mapCampaigns(item.campaigns)?.remaining }}
                </p>
                <p class="campaignInfo_remainingPlus">
                    +
                </p>
            </div>
        </Badge>
    </div>
</template>

<style lang="postcss" scoped>
.campaignInfo {
    @apply leading-4 text-captionM whitespace-nowrap;

    &__loading {
        @apply flex justify-end items-end;
    }

    &_primaryBadge {
        @apply border-none rounded-[6px] px-[6px] py-[2px] text-captionM leading-4 max-h-[20px] flex-shrink-0;
    }

    &_remainingBadge {
        @apply border-none rounded-[6px] px-[6px] py-[2px] ml-2 max-w-[28px] min-w-[28px] max-h-[20px] flex-shrink-0;
    }

    &_remainingContent {
        @apply flex items-center justify-center w-full;
    }

    &_remainingCount {
        @apply truncate;
    }

    &_remainingPlus {
        @apply pb-0.5;
    }
}
</style>
