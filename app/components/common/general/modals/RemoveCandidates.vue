<script setup lang="ts">
import type { ICandidateResponse } from '~/types/candidates/reponse'
import type { GlobalModalEmits } from '~/types/modal'
import { useFetch } from '#app'

interface Props {
    selectedRows: ICandidateResponse[]
    refreshTable: () => void
}

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<Props>()
const emit = defineEmits<GlobalModalEmits>()

const modelValue = defineModel({
    type: Boolean,
    default: false,
})

const { execute, error } = useFetch('/api/candidates/bulk', {
    method: 'DELETE',
    body: computed(() => ({
        ids: props.selectedRows.map(candidate => candidate.id),
    })),
    headers: { 'Content-Type': 'application/json' },
    immediate: false,
})

async function handleConfirm() {
    await execute()
    if (!error.value) {
        props.refreshTable()
        emit('hide')
    }
    else {
        console.error('Error deleting candidates:', error.value)
    }
}
</script>

<template>
    <div class="remove_candidates">
        <div class="remove_candidates__header">
            <div class="remove_candidates__title">
                Remove candidates?
            </div>
            <div class="remove_candidates__description">
                Please confirm you would like to remove the following from your candidate database:
            </div>
        </div>
        <div class="remove_candidates__body">
            <div class="remove_candidates__field">
                <div v-if="selectedRows.length" class="mt-2.5 mb-2.5">
                    <ol v-for="item in selectedRows" :key="item.id" class="mt-1">
                        <li class="flex items-center gap-2">
                            <Icon
                                name="icon-park-outline:dot"
                                class="!w-[16px] !h-[16px] text-background-badge-red-accent bg-border-action-disabled"
                            />
                            <p class="font-medium text-bodyS text-slate-950">
                                <span v-if="item.first_name.length > 0">
                                    {{ item.first_name }} {{ item.last_name }}
                                </span>
                            </p>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="remove_candidates__button-container">
            <Button type="button" variant="secondary" class="remove_candidates__button" @click="emit('hide')">
                Cancel
            </Button>
            <Button
                class="remove_candidates__button"
                type="button"
                variant="destructiveTertiary"
                @click="handleConfirm"
            >
                <span>Confirm</span>
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.remove_candidates {
    @apply p-6;

    &__header {
        @apply mb-3 !text-start;
    }

    &__title {
        @apply text-bodyL font-medium;
    }

    &__description {
        @apply text-captionM !text-text-sub-600;
    }

    &__body {
        @apply flex items-center mt-6;
    }

    &__field {
        @apply flex flex-col w-full gap-2.5;
    }

    &__label {
        @apply text-captionL font-medium;
    }

    &__button-container {
        @apply flex-col md:flex-row mt-4 flex gap-2;
    }

    &__button {
        @apply w-full;
    }
}
</style>
