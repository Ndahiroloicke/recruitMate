<script setup lang="ts">
import { computed } from 'vue'
import Badge from '~/components/ui/badge/Badge.vue'
import { useCampaigns } from '~/store/campaigns'
import { CampaignStatus, CampaignStatusTranslation } from '~/types/campaign/status'
import CampaignsDetail from './detail.vue'

interface Props {
    item: any
    handleClick: (e: any) => void
    variant?: 'team' | 'company'
}

const { item, handleClick, variant = 'company' } = defineProps<Props>()
const campaignsStore = useCampaigns()
const isEdited = computed(() => campaignsStore.isEdited)
const isRowSelected = computed(() => campaignsStore.isRowSelected(item.id))
const borderClass = computed(() => {
    if (isEdited.value && variant === 'company') {
        return isRowSelected.value
            ? 'outline outline-2 outline-blue-600 shadow-md border-transparent'
            : 'border-dashed border-2 border-gray-200'
    }
    return 'border-solid border-gray-200'
})
</script>

<template>
    <CommonApplicationCard class="campaignCard" :class="borderClass" @click="handleClick(item)">
        <div class="campaignCardContainer">
            <div class="campaignCardHeader">
                <div class="flex flex-col w-full justify-between sm:flex-row gap-3 items-start">
                    <Avatar
                        shape="square"
                        size="xl"
                    >
                        <AvatarImage
                            class="object-fit h-full w-full"
                            :src="item?.company_logo || '/images/Company.svg'"
                            alt="User avatar"
                        />
                        <AvatarFallback>
                            <NuxtImg
                                class="object-fit h-full w-full"
                                :src="item?.company_logo || '/images/Company.svg'"
                                alt="Avatar Placeholder"
                            />
                        </AvatarFallback>
                    </Avatar>
                    <div class="flex flex-col gap-1 w-full">
                        <p v-if="!!item?.hiring_company" class="campaignCardHeader_hiringCompany">
                            {{ item?.hiring_company.toUpperCase() }}
                        </p>
                        <div class="flex gap-2.5">
                            <p v-if="!!item?.name" class="campaignCardHeader_name">
                                {{ item?.name }}
                            </p>
                            <CommonApplicationAvatarGroup
                                v-if="item?.avatars?.length > 0" size="sm"
                                :disable-text="true" :avatars="item.avatars"
                            />
                        </div>
                        <p v-if="!!item?.description" class="campaignCardHeader_description">
                            {{ item?.description }}
                        </p>
                    </div>
                </div>
                <div class="h-fit w-fit">
                    <Badge :color="item.status === 'draft' ? 'gray' : 'green'" class="campaignCardHeader_status">
                        {{ item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() }}
                    </Badge>
                </div>
            </div>

            <div class="campaignCardFooter">
                <div v-if="!!item?.tags && item.tags.length" class="campaignCardFooter_labels">
                    <div v-for="tag in item.tags" :key="tag">
                        <Badge color="blue" class="campaignCardFooter_badge">
                            {{ tag }}
                        </Badge>
                    </div>
                </div>
                <div class="block sm:hidden h-[1px] my-2 bg-border-base-divider w-full" />
                <SkeletonCampaignDetail v-if="!item.stats" />
                <CampaignsDetail v-else :data="item.stats" />
            </div>
        </div>
    </CommonApplicationCard>
</template>

<style lang="postcss" scoped>
.campaignCardContainer {
    @apply flex flex-col gap-3;
}

.campaignCardHeader {
    @apply flex flex-row gap-3 w-full;

    &_description {
        @apply leading-5 text-text-tertiary;
    }

    &_status {
        @apply text-bodyS font-medium leading-5 p-2.5 rounded-lg py-1 border-none;
    }

    &_name {
        @apply text-bodyM leading-6 font-medium text-primary;
    }

    &_hiringCompany {
        @apply font-medium leading-4 text-captionM text-text-tertiary;
    }
}

.campaignCardFooter {
    @apply flex flex-col items-start w-full justify-between gap-3 sm:gap-5 mt-3 sm:flex-row sm:flex-wrap sm:items-center;

    &_labels {
        @apply w-fit flex flex-row gap-2;
    }

    &_badge {
        @apply text-bodyS font-medium leading-5 px-2 rounded-full py-1 border-none min-w-fit;
    }

    &_details {
        @apply flex gap-3;
    }

    &_detail {
        @apply flex gap-3 items-start min-w-36 border-l-[1px] border-border-action-normal pl-3 flex-col sm:items-center sm:flex-row;
    }

    &_detailCountText {
        @apply text-text-primary font-medium text-captionM leading-4;
    }

    &_detailDays {
        @apply text-text-tertiary text-captionS;
    }

    &_detailCount {
        @apply text-h6 font-bold leading-8 text-primary leading-4;
    }
}

.campaignCard {
    @apply !shadow-none border rounded-xl p-4 cursor-pointer;
}
</style>
