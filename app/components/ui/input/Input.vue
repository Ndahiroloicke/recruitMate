<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
    defaultValue?: string | number
    modelValue?: string | number
    class?: HTMLAttributes['class']
    disabled?: boolean
    errorMessage?: string

}>()

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
})
</script>

<template>
    <!-- <div class="w-full"> -->
    <input
        v-model="modelValue" :class="cn('flex h-9 w-full rounded-xl border-[1.5px] border-border-action-normal bg-white px-3 py-1 text-captionL  transition-colors file:border-0 file:bg-transparent file:text-captionL focus:outline-none file:font-medium placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-1 focus:shadow-[0_0_0_2px_rgba(120,150,255,0.5)]', [disabled ? 'cursor-not-allowed shadow-none border-background-action-disabled' : 'hover:border-border-action-hover'], props.class)" :disabled="disabled"
    >
    <!-- <span v-if="props.errorMessage" class="text-text-red-accent text-captionM">
            {{ props.errorMessage }}
        </span> -->
    <!-- </div> -->
</template>
