<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
    align?: 'left' | 'center' | 'right'
}>()
</script>

<template>
    <tr
        :class="cn(
            'border-b-none transition-colors [&_td]:hover:bg-background-surface-neutral data-[state=selected]:bg-muted',
            {
                'text-left': align === 'left',
                'text-center': align === 'center',
                'text-right': align === 'right',
            },
            props.class,
        )"
    >
        <slot />
    </tr>
</template>
