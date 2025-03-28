<script lang="ts" setup>
import { Skeleton } from '@/components/ui/skeleton'

const modelValue = defineModel({
    default: false,
})
</script>

<template>
    <div class="candidate-info">
        <div class="candidate-info__details">
            <div>
                <Skeleton class="h-3 w-[100px]" />
                <Skeleton class="h-3 w-[120px] mt-1" />
            </div>
            <div>
                <Skeleton class="h-3 w-[100px]" />
                <Skeleton class="h-3 w-[120px] mt-1" />
            </div>
            <div>
                <Skeleton class="h-3 w-[100px]" />
                <div class="candidate-info__skills mt-1">
                    <Skeleton v-for="n in 4" :key="n" class="h-5 w-[60px]" />
                </div>
            </div>
            <div>
                <Skeleton class="h-3 w-[100px]" />
                <Skeleton class="h-3  w-full mt-1" />
            </div>
            <div>
                <Skeleton class="h-3 w-[100px]" />
                <Skeleton class="h-3  w-full mt-1" />
            </div>
            <div>
                <Skeleton class="h-3 w-[100px]" />
                <Skeleton class="h-3  w-full mt-1" />
            </div>
            <div>
                <Skeleton class="h-3 w-[100px]" />
                <ul class="candidate-info__experience mt-1">
                    <li v-for="n in 3" :key="n" class="candidate-info__experience__item">
                        <Skeleton class="h-3 w-full" />
                    </li>
                </ul>
            </div>
        </div>

        <div class="candidate-info__close">
            <Button variant="secondary" size="xs" class="candidate-info__close__btn" @click="modelValue = false">
                <Icon name="ri:close-fill" />
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.candidate-info {
    @apply w-full px-4 pt-6 bg-white flex items-start justify-start relative;

    &__details {
        @apply flex flex-col gap-3;
    }

    &__skills {
        @apply flex flex-wrap gap-2 mt-1;
    }

    &__experience {
        @apply list-disc pl-5 mt-1;

        &__item {
            @apply text-captionM text-text-secondary;
        }
    }

    &__close {
        @apply absolute top-5 right-2;

        &__btn {
            @apply text-text-sub-600 rounded-full;
        }
    }
}
</style>
