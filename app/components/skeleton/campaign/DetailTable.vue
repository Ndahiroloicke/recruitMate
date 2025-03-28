<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
    <div v-for="n in 3" :key="n" class="candidate-row flex items-center justify-between px-4 py-2 gap-4 md:gap-0 ">
        <div class="flex items-center gap-3 w-[60%]">
            <Skeleton class="h-10 w-10 rounded-full" />
            <div class="flex flex-col">
                <Skeleton class="h-4 w-[140px]" />
                <Skeleton class="h-3 w-[110px] mt-1" />
            </div>
        </div>

        <div class="hidden sm:flex w-[30%]">
            <Skeleton class="h-5 w-[150px] rounded-lg" />
        </div>

        <div class="hidden sm:flex w-[20%] justify-end flex-col items-end  ">
            <Skeleton class="h-4 w-[100px]" />
            <Skeleton class="h-3 w-[80px] mt-1" />
        </div>

        <div class="w-[20%] flex justify-end ">
            <Skeleton class="h-4 w-[80px]" />
        </div>
    </div>
</template>

<style scoped>
.candidate-row {
    @apply bg-white shadow-sm ;
}
</style>
