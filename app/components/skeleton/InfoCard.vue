<script setup lang="ts">
import { computed } from 'vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'
import { useCampaigns } from '~/store/campaigns'
// import CampaignsDet§ail from './detail.vue'

interface Props {
    item: any
    handleClick: (e: any) => void
    variant?: 'team' | 'company'
}

const { item, handleClick, variant = 'company' } = defineProps<Props>()

const campaignsStore = useCampaigns()

const isEdited = computed(() => campaignsStore.isEdited)
const isRowSelected = computed(() => campaignsStore.isRowSelected(item.slug))
const borderClass = computed(() => {
    if (isEdited.value && variant === 'company') {
        return isRowSelected.value ? 'outline outline-2 outline-blue-600 shadow-md border-transparent' : 'border-dashed border-2 border-gray-200'
    }
    return 'border-solid border-gray-200'
})
</script>

<template>
    <CommonApplicationCard class="campaignCard" :class="borderClass" @click="handleClick(item)">
        <div class="campaignCardContainer">
            <div class="campaignCardHeader">
                <div class="campaignCardHeader_wrapper">
                    <CommonApplicationSkelatonAvatar size="sm" />
                    <div class="campaignCardHeader_content">
                        <p v-if="variant === 'company'" class="campaignCardHeader_hiringCompany">
                            kk
                        </p>
                        <div class="campaignCardHeader_nameWrapper">
                            <Skeleton class="campaignCardHeader_name" />
                            <CommonApplicationSkelatonAvatarGroup />
                        </div>
                        <Skeleton class="campaignCardHeader_description" />
                    </div>
                </div>
                <div class="campaignCardHeader_statusWrapper">
                    <Skeleton class="campaignCardHeader_status" />
                </div>
            </div>

            <div class="campaignCardFooter">
                <div class="campaignCardFooter_labels">
                    <Skeleton class="campaignCardFooter_badge" />
                    <Skeleton class="campaignCardFooter_badge" />
                </div>
                <div class="campaignCardFooter_divider" />
                <div class="campaignInfo_details">
                    <div class="campaignInfo_detail">
                        <Skeleton class="campaignInfo_detail_skelaton" />
                    </div>
                    <div class="campaignInfo_detail">
                        <Skeleton class="campaignInfo_detail_skelaton" />
                    </div>
                    <div class="campaignInfo_detail">
                        <Skeleton class="campaignInfo_detail_skelaton" />
                    </div>
                </div>
            </div>
        </div>
    </CommonApplicationCard>
</template>

<style lang="postcss" scoped>
.campaignCard {
    @apply !shadow-none border rounded-xl p-4 cursor-pointer;
}

.campaignCardContainer {
    @apply flex flex-col;
}

.campaignCardHeader {
    @apply flex flex-row w-full;

    &_wrapper {
        @apply flex flex-col w-full justify-between sm:flex-row items-start;
    }

    &_content {
        @apply flex flex-col gap-1 w-full;
    }

    &_nameWrapper {
        @apply flex items-center gap-2.5;
    }

    &_statusWrapper {
        @apply h-fit w-fit;
    }

    &_description {
        @apply leading-5 w-48 h-4 text-text-tertiary;
    }

    &_status {
        @apply text-bodyS font-medium leading-5 h-5 w-12 p-2.5 rounded-lg py-1 border-none;
    }

    &_name {
        @apply text-bodyM leading-6 w-28 h-4 font-medium text-primary;
    }

    &_hiringCompany {
        @apply font-medium leading-4 text-captionM text-text-tertiary;
    }
}

.campaignCardFooter {
    @apply flex flex-col items-start w-full justify-between gap-3 sm:gap-5 mt-3 sm:flex-row sm:flex-wrap sm:items-center;

    &_divider {
        @apply block sm:hidden h-[1px] my-2 bg-border-base-divider w-full;
    }

    &_labels {
        @apply w-fit flex flex-row gap-2;
    }

    &_badge {
        @apply text-bodyS font-medium leading-5 px-2 h-5 w-32 rounded-full py-1 border-none min-w-fit;
    }
}

.campaignInfo {
    &_details {
        @apply flex gap-3 w-full sm:w-fit justify-between;
    }

    &_detail {
        @apply flex gap-3 items-start min-w-fit sm:min-w-36 border-l-[1px] pl-3 border-border-action-normal flex-col sm:items-center sm:flex-row;

        &_skelaton {
            @apply md:h-12 md:w-36 w-20 h-16;
        }
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
</style>
