<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'

const emit = defineEmits(['next'])

function handleNext() {
    emit('next')
}
</script>

<template>
    <div class="waiting-list">
        <div class="waiting-list__progress">
            <span>Step 3 / 3</span>
        </div>
        <div class="waiting-list__content">
            <div class="waiting-list__texts">
                <h5 class="waiting-list__title">
                    You have been placed on the waiting list
                </h5>
                <span class="waiting-list__description">
                    We will notify you via email when the closed beta is available.
                </span>
            </div>
        </div>
        <Button variant="secondary" @click="handleNext">
            Get in touch
        </Button>
    </div>
</template>

<style lang="postcss" scoped>
.waiting-list {
    @apply flex flex-col gap-5 w-full sm:max-w-[380px] p-9 sm:p-0;

    &__progress {
        @apply flex flex-col text-captionL text-text-secondary font-medium leading-5;
    }

    &__content {
        @apply flex flex-col;
    }

    &__texts {
        @apply flex flex-col gap-2;
    }

    &__title {
        @apply text-h5 leading-9 font-semibold sm:whitespace-normal;
    }

    &__description {
        @apply font-normal text-bodyM leading-6 tracking-normal text-text-secondary;
    }

}
</style>
