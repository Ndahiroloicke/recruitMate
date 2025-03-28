<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'

interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: HTMLAttributes['class']
    loading?: boolean
}

const { as = 'button', ...props } = defineProps<Props>()
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :disabled="props.loading"
        :class="cn(buttonVariants({ variant, size }), props.class)"
    >
        <span class="flex items-center justify-center gap-2 w-full">
            <Icon v-if="props.loading" name="svg-spinners:270-ring" />
            <slot />
        </span>
    </Primitive>
</template>
