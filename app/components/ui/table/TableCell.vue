<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <td
        :class="
            cn(
                'p-3 align-middle font-normal  border-b border-border-base-divider [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5',
                props.class,
            )
        "
    >
        <slot />
    </td>
</template>
