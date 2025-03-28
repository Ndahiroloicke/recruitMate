<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
    <div class="sidebar__content">
        <div
            v-for="n in 10"
            :key="n"
            class="sidebar__content__item"
        >
            <div class="sidebar__content__avatar">
                <Skeleton class="h-10 w-10 rounded-full" />
            </div>

            <div class="sidebar__content__info space-y-2">
                <Skeleton class="h-4 w-[50px]" />
                <Skeleton class="h-4 w-[180px]" />
            </div>

            <Skeleton class="sidebar__content__badge h-6 w-10" />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.sidebar__content {
  @apply mt-4 overflow-y-auto flex-1;
}

.sidebar__content__item {
  @apply flex items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer relative border-t pr-4;
}

.sidebar__content__avatar {
  @apply ml-1;
}

.sidebar__content__info {
  @apply flex-1;
}

.sidebar__content__badge {
  @apply ml-auto rounded-full;
}
</style>
