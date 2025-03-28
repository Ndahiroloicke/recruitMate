<script setup lang="ts">
import type { GlobalModalEmits } from '~/types/modal'

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<{
    title: string
    description: string
    selectedItems: Array<{ slug: string, name?: string, last_name?: string }>
    onConfirm: () => void
}>()
const emit = defineEmits<GlobalModalEmits>()
console.log(props.selectedItems[0]?.name)
const modelValue = defineModel({
    type: Boolean,
    default: false,
})

function handleConfirm() {
    props.onConfirm()
    emit('hide')
}
</script>

<template>
    <div v-if="modelValue" class="confirmation-modal">
        <div class="confirmation-modal__header">
            <h2 class="confirmation-modal__title">
                {{ props.title }}
            </h2>
            <p class="confirmation-modal__description">
                {{ props.description }}
            </p>
        </div>

        <div v-if="props.selectedItems.length > 0" class="confirmation-modal__body">
            <ul>
                <li v-for="item in props.selectedItems" :key="item.slug" class="confirmation-modal__item">
                    <span class="confirmation-modal__bullet">•</span>
                    <span class="confirmation-modal__text">
                        <span v-if="!!item.name">{{ item.name }}</span>
                        <span v-if="!!item.last_name">{{ item.last_name }}</span>
                    </span>
                </li>
            </ul>
        </div>

        <div class="confirmation-modal__actions">
            <Button variant="secondary" type="button" class="confirmation-modal__cancel-btn" @click="emit('hide')">
                Cancel
            </Button>
            <Button variant="destructiveTertiary" type="button" class="confirmation-modal__confirm-btn" @click="handleConfirm">
                Confirm
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.confirmation-modal {
    @apply p-6;

    &__header {
        @apply mb-4 text-start;
    }

    &__title {
        @apply text-bodyL font-medium ;
    }

    &__description {
        @apply text-captionM text-gray-600;
    }

    &__body {
        @apply mt-4;
    }

    &__item {
        @apply flex items-center gap-2 text-gray-800;
    }

    &__bullet {
        @apply text-gray-500;
    }

    &__text {
        @apply font-medium text-captionM text-black;
    }

    &__actions {
        @apply flex justify-end mt-6 gap-4;
    }

    &__cancel-btn {
        @apply   w-full;
    }

    &__confirm-btn {
        @apply    w-full ;
    }
}
</style>
