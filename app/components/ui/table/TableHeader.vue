<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <thead :class="cn('bg-background-surface-neutral [&_tr]:border-b-none', props.class)">
        <slot />
    </thead>
</template>
