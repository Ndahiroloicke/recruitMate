<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
    class?: HTMLAttributes['class']
    defaultValue?: string | number
    modelValue?: string | number
    disabled?: boolean
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
    <textarea
        v-model="modelValue"
        :class="cn('flex min-h-[60px]  w-full text-captionL shadow-md rounded-xl border border-border-action-normal bg-white py-2.5 p-3 text-bodyS shadow-sm placeholder:text-text-tertiary focus:shadow-[0_0_0_2px_rgba(120,150,255,0.5)]  focus-visible:outline-none disabled:cursor-not-allowed', [disabled ? 'cursor-not-allowed shadow-none border-background-action-disabled' : 'hover:border-border-action-hover'], props.class)"
        :disabled="disabled" :tabindex="disabled ? -1 : 0"
    />
</template>
