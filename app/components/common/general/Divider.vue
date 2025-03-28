<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
    class?: string
}

const { ...props } = defineProps<Props>()
</script>

<template>
    <div :class="cn('h-[1px] w-full bg-gray-200', props.class)" />
</template>
