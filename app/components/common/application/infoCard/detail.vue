<script setup lang="ts">
interface Props {
    data: any
}
const { data } = defineProps<Props>()

const cronIntervalMessage = computed(() => {
    const hours = data.cron_interval
    if (hours < 24) {
        return `${hours.toFixed(1)} hours`
    }
    else {
        const days = Math.floor(hours / 24)
        return `${days} days`
    }
})
</script>

<template>
    <div class="campaignInfo_details">
        <div class="campaignInfo_detail !border-l-0">
            <p class="campaignInfo_detailCount">
                {{ data.unread }}
            </p>
            <div class="flex flex-col gap-1">
                <p class="campaignInfo_detailCountText">
                    Unread
                </p>
                <p class="campaignInfo_detailDays">
                    {{ cronIntervalMessage }}
                </p>
            </div>
        </div>
        <div class="campaignInfo_detail">
            <p class="campaignInfo_detailCount">
                {{ data.replied }}
            </p>
            <div class="flex flex-col gap-1">
                <p class="campaignInfo_detailCountText">
                    Replied
                </p>
                <p class="campaignInfo_detailDays">
                    {{ cronIntervalMessage }}
                </p>
            </div>
        </div>
        <div class="campaignInfo_detail">
            <p class="campaignInfo_detailCount">
                {{ data.awaiting_feedback }}
            </p>
            <div class="flex flex-col gap-1">
                <p class="campaignInfo_detailCountText">
                    Awaiting Feedback
                </p>
                <p class="campaignInfo_detailDays">
                    {{ cronIntervalMessage }}
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.campaignInfo {
    &_labels {
        @apply w-fit flex flex-row gap-2;
    }

    &_badge {
        @apply text-bodyS font-medium leading-5 px-2 rounded-full py-1 border-none min-w-fit;
    }

    &_details {
        @apply flex gap-3 w-full sm:w-fit justify-between;
    }

    &_detail {
        @apply flex gap-3 items-start min-w-fit sm:min-w-36 border-l-[1px] pl-3 border-border-action-normal flex-col sm:items-center sm:flex-row;
    }

    &_detailCountText {
        @apply text-text-primary font-medium text-captionS leading-3 sm:text-captionM sm:leading-4;
    }

    &_detailDays {
        @apply text-text-tertiary text-captionS leading-4;
    }

    &_detailCount {
        @apply text-h6 font-bold text-primary leading-4;
    }
}
</style>
