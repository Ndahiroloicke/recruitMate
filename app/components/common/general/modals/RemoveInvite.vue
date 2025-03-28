<script setup lang="ts">
import type { GlobalModal, GlobalModalEmits } from '~/types/modal'

interface Props extends GlobalModal {
}

defineOptions({
    inheritAttrs: false,
})

defineProps<Props>()

const emit = defineEmits<GlobalModalEmits>()

const modelValue = defineModel({
    type: Boolean,
    default: false,
})
</script>

<template>
    <div no-padding class="dialog__content">
        <div class="dialog__header">
            Remove Invite ?
        </div>
        <div class="dialog__body">
            <div class="dialog__body-text">
                Please confirm you would like to remove the following from you candidate database:
            </div>
            <div class="dialog__body-list">
                <div class="dialog__body-list-item">
                    <div class="dialog__body-list-dot" /> Fatih Gunes
                </div>
            </div>
        </div>

        <div class="dialog__footer">
            <Button class="dialog__button-save" size="md" variant="secondary" @click="emit('hide')">
                Cancel
            </Button>
            <div as-child>
                <Button class="dialog__button-remove" variant="secondary">
                    Confirm
                </Button>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.dialog {
    &__content {
        @apply  w-full pt-0 py-5 md:pt-5 px-0;
    }

    &__header {
        @apply flex gap-2 mx-5 font-medium text-text-primary text-bodyM mb-4 items-center max-w-[404px];
    }

    &__user {
        @apply flex gap-2 items-center;
    }

    &__avatar-image {
        @apply object-cover h-full w-full;
    }

    &__user-info {
        @apply flex flex-col gap-0.5;
    }

    &__user-name {
        @apply font-medium text-text-primary text-captionL;
    }

    &__user-email {
        @apply text-secondary leading-4 opacity-60 text-captionM;
    }

    &__body {
        @apply mx-5 mb-3;

        &-text {
            @apply text-text-secondary text-captionL;
        }

        &-list {
            @apply text-[#0E121B] text-captionL py-3 font-medium;

            &-item {
                @apply flex gap-2 items-center;
            }

            &-dot {
                @apply w-2 h-2 bg-[#CACFD8] rounded-full;
            }
        }
    }

    &__select-trigger {
        @apply rounded-[10px] shadow-none;
    }

    &__footer {
        @apply sm:justify-start grid grid-cols-2 gap-2 px-5;
    }

    &__button-remove {
        @apply w-full text-destructive !bg-[#E6483D1A] !border-none;
    }

    &__button-save {
        @apply w-full;
    }
}
</style>
