<script setup lang="ts">
import type { GlobalModal, GlobalModalEmits } from '~/types/modal'

interface Props extends GlobalModal {
    deleteFn: () => void | Promise<void>
}
defineOptions({ inheritAttrs: false })

const props = defineProps<Props>()
const emit = defineEmits<GlobalModalEmits>()

function onDeleteButtonClick() {
    props.deleteFn()
    emit('hide')
}
const modelValue = defineModel({
    type: Boolean,
    default: false,
})
</script>

<template>
    <div class="delete-email-tempalte">
        <div class="delete-email-tempalte__header">
            <div class="delete-email-tempalte__title">
                Delete Email Template
            </div>
            <div class="delete-email-tempalte__description">
                Are you sure you want to delete this email template?
            </div>
        </div>

        <div>
            <div class="delete-email-tempalte__button" as-child>
                <Button type="button" variant="secondary" @click="emit('hide')">
                    Cancel
                </Button>
                <Button
                    type="button"
                    variant="destructiveTertiary"
                    @click="onDeleteButtonClick"
                >
                    Delete
                </Button>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.delete-email-tempalte {
  @apply sm:max-w-md p-8;

  &__header {
    @apply mb-8 !text-start;
  }

  &__title {
    @apply text-bodyL font-medium;
  }

  &__description {
    @apply text-captionM !text-text-sub-600;
  }

  &__button {
    @apply flex gap-2 w-full;

    button {
      @apply w-full;
    }
  }
}
</style>
