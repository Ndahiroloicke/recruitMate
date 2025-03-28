<script setup lang="ts">
import { calculateDateDifference } from '~/lib/formatTime'

interface Props {
    item: {
        company: string;
        years?: string | undefined;
        startSince: number;
        endSince: number;
    };
    isLoading?: boolean
}
defineProps<Props>()
</script>

<template>
    <div class="flex flex-col gap-0.5 items-start">
        <SkeletonCompanyInfo v-if="isLoading" />
        <p v-if="!isLoading" class="text-text-primary leading-5 text-captionL">
            {{ item.company || "-" }}
        </p>
        <p v-if="!isLoading" class="text-text-secondary leading-3 text-captionM">
            {{ item?.years ? item?.years : calculateDateDifference(item.startSince, item.endSince) }}
        </p>
    </div>
</template>
