<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
    class?: string
}

const { ...props } = defineProps<Props>()
</script>

<template>
    <div :class="cn('bg-white shadow-md rounded-lg p-6', props.class)">
        <slot />
    </div>
</template>
