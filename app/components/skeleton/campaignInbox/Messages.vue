<script lang="ts" setup>
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
    <div v-for="n in 5" :key="n" class="flex gap-3 w-full">
        <div class="mb-4 flex gap-3">
            <Skeleton class="h-10 w-10 rounded-full" />
        </div>
        <div class="inbox__message-details w-full">
            <div class="inbox__message-meta ">
                <Skeleton class="h-3.5 w-[120px]" />
                <Skeleton class="h-2.5 w-[50px]" />
            </div>
            <Skeleton class="h-3.5  w-full mt-2" />
        </div>
    </div>
</template>

<style scoped lang="postcss">
.inbox__message-details {
    @apply flex flex-col gap-2;
}

.inbox__message-meta {
    @apply flex items-end gap-1;
}
</style>
