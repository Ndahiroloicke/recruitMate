<script setup lang="ts">
import type { GlobalModalEmits } from '~/types/modal'
import type { IDefaultResponse } from '~/types/response';

interface Props {
    selectedRows: IDefaultResponse[]
}

defineOptions({
    inheritAttrs: false,
})

defineProps<Props>()

const emit = defineEmits<GlobalModalEmits>()

function handleConfirm() {
    emit('hide')
}
</script>

<template>
    <div class="deleteaccount">
        <div class="deleteaccount__header">
            <div class="deleteaccount__title">
                Delete Accounts
            </div>
            <div class="deleteaccount__description">
                Please confirm you would like to remove the following from your candidate database:
            </div>
        </div>
        <div class="deleteaccount__footer">
            <Button type="button" variant="secondary" class="deleteaccount__button deleteaccount__button--cancel">
                Cancel
            </Button>
            <Button
                type="button" variant="destructiveTertiary" class="deleteaccount__button deleteaccount__button--confirm"
                @click="handleConfirm"
            >
                Confirm
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.deleteaccount {
    @apply  p-6;

    &__header {
        @apply mb-3 !text-start;
    }

    &__title {
        @apply text-bodyL font-medium;
    }

    &__description {
        @apply text-captionM !text-text-sub-600;
    }

    &__footer {
        @apply flex justify-end mt-6 gap-2;
    }

    &__button {
        @apply !w-full !rounded-[12px] !shadow-none;

        &--cancel {
            @apply !w-full !rounded-[12px] !shadow-none;
        }

        &--confirm {
            @apply !w-full;
        }
    }
}
</style>
