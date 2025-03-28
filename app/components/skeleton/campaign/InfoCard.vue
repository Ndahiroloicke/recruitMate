<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
    <CommonApplicationCard class="campaignCard">
        <div class="campaignCardContainer">
            <div class="campaignCardHeader">
                <div class="flex flex-col w-full  sm:flex-row gap-3 items-start">
                    <Skeleton class="h-12 w-12 rounded-lg" />
                    <div class="flex flex-col gap-3">
                        <Skeleton class="h-3 w-[100px]" />
                        <Skeleton class="h-4 w-[120px]" />
                        <Skeleton class="h-4 w-[180px] " />
                    </div>
                </div>
                <div class="h-fit w-fit">
                    <Skeleton class="h-6 w-20 rounded-lg" />
                </div>
            </div>

            <div class="campaignInfo_details mt-4">
                <Skeleton class="h-6 w-20 rounded-xl" />
                <div class="campaignInfo_detail ">
                    <div v-for="n in 3" :key="n" class="flex gap-3 flex-col items-start sm:items-center sm:flex-row">
                        <Skeleton class="h-8 w-10" />
                        <div class="flex flex-col gap-1">
                            <Skeleton class="h-4 w-[70px]" />
                            <Skeleton class="h-3 w-[30px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CommonApplicationCard>
</template>

<style lang="postcss" scoped>
.campaignCard{
    @apply !shadow-none border rounded-xl p-4 cursor-pointer;
}
.campaignCardContainer {
    @apply flex flex-col gap-3 ;
}

.campaignCardHeader {
    @apply flex flex-row gap-3 w-full;
}

.campaignInfo_details {
    @apply flex flex-col gap-3 w-full items-start justify-start  md:flex-row md:items-center  ;
}

.campaignInfo_detail {
    @apply w-full flex justify-between md:justify-end gap-3 items-start min-w-fit sm:min-w-36  md:pl-3 border-border-action-normal  sm:items-center ;
}
</style>
