<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'

const modelValue = defineModel({
    default: false,
})
</script>

<template>
    <Sheet v-model:open="modelValue">
        <SheetContent class="candidate-sheet">
            <SheetHeader class="candidate-sheet__header">
                <div class="candidate-sheet__content">
                    <div class="candidate-sheet__details">
                        <div>
                            <Skeleton class="h-4 w-[100px]" />
                            <Skeleton class="h-3.5 w-[200px] mt-2" />
                        </div>
                        <div>
                            <Skeleton class="h-4 w-[100px]" />
                            <Skeleton class="h-3.5 w-[200px] mt-2" />
                        </div>
                        <div>
                            <Skeleton class="h-4 w-[100px]" />
                            <div class="candidate-sheet__skills mt-2">
                                <Skeleton v-for="n in 4" :key="n" class="h-3.5 w-[60px]" />
                            </div>
                        </div>
                        <div>
                            <Skeleton class="h-4 w-[150px]" />
                            <Skeleton class="h-3.5 w-full mt-2" />
                        </div>
                        <div>
                            <Skeleton class="h-4 w-[150px]" />
                            <Skeleton class="h-3.5 w-[220px] mt-2" />
                        </div>
                        <div>
                            <Skeleton class="h-4 w-[150px]" />
                            <Skeleton class="h-3.5 w-full mt-2" />
                        </div>
                        <div>
                            <Skeleton class="h-4 w-[150px]" />
                            <ul class="candidate-sheet__experience mt-2">
                                <li v-for="n in 3" :key="n" class="candidate-sheet__value">
                                    <Skeleton class="h-3.5 w-full" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</template>

<style scoped lang="postcss">
.candidate-sheet {
    @apply w-full px-4 bg-white flex flex-col;

    &__header {
        @apply pb-4;
    }

    &__content {
        @apply flex items-start justify-start;
    }

    &__details {
        @apply flex flex-col gap-3;
    }

    &__label {
        @apply text-bodyM font-medium;
    }

    &__value {
        @apply text-captionL text-text-secondary;
    }

    &__skills {
        @apply flex flex-wrap gap-2 mt-2;
    }

    &__experience {
        @apply list-disc pl-5;
    }
}
</style>
