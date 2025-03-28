<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
    <div class="campaignInfo_detail ">
        <div v-for="n in 3" :key="n" class="flex flex-col gap-3 items-start sm:items-center sm:flex-row">
            <Skeleton class="h-8 w-10" />
            <div class="flex flex-col gap-1">
                <Skeleton class="h-3 w-[70px]" />
                <Skeleton class="h-3 w-[30px]" />
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.campaignInfo_detail {
    @apply w-fit flex justify-between md:justify-start gap-3 items-start min-w-fit sm:min-w-36  md:pl-3 border-border-action-normal  sm:items-center ;
}
</style>
