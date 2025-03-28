<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { NumberFieldInput } from 'radix-vue'

const props = defineProps<{
    class?: HTMLAttributes['class']
    disabled?: boolean
}>()
</script>

<template>
    <NumberFieldInput
        data-slot="input"
        :class="cn('flex text-center h-9 w-full rounded-xl border-[1.5px] border-border-action-normal bg-white px-3 py-1 text-captionL shadow-md transition-colors file:border-0 file:bg-transparent file:text-captionL focus:outline-none file:font-medium placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-1 focus:shadow-[0_0_0_2px_rgba(120,150,255,0.5)]', [disabled ? 'cursor-not-allowed shadow-none border-background-action-disabled' : 'hover:border-border-action-hover'], props.class)" :disabled="disabled"
    />
</template>
