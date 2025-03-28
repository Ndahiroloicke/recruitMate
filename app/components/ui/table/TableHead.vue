<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <th :class="cn('h-10 px-3 py-2 text-left align-middle bg-background-surface-neutral text-[14px] font-normal text-text-secondary/60 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5', props.class)">
        <slot />
    </th>
</template>
