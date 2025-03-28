<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { type BadgeVariants, badgeVariants } from '.'

const props = defineProps<{
    size?: BadgeVariants['size']
    color?: BadgeVariants['color']
    shape?: BadgeVariants['shape']
    stroke?: BadgeVariants['stroke']
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div :class="cn(badgeVariants({ size, color, shape, stroke }), props.class)">
        <slot />
    </div>
</template>
