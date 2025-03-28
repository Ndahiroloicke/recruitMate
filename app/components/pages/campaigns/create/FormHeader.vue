<script setup lang="ts">
import type { Step } from '~/store/campaigns/create'

interface Props {
    steps: Step[]
    stepIndex: number
}

defineProps<Props>()
</script>

<template>
    <div class="form-header">
        <CommonGeneralIconTemplate class="mx-auto">
            <template #icon>
                <Icon :name="steps[stepIndex - 1]?.icon || ''" class="text-primary size-4" />
            </template>
        </CommonGeneralIconTemplate>
        <span class="form-header__title">
            {{ steps[stepIndex - 1]?.title }}
        </span>
        <span class="form-header__description">
            {{ steps[stepIndex - 1]?.description }}
        </span>
    </div>
</template>

<style lang="postcss" scoped>
.form-header {
    @apply w-full flex flex-col gap-2 py-4 border-b border-border-base-divider text-center;

    &__title {
        @apply text-bodyM text-text-primary;
    }

    &__description {
        @apply text-captionM text-text-sub-600;
    }
}
</style>
