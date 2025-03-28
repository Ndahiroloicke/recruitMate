<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'radix-vue'

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(), {
    as: 'a',
})
</script>

<template>
    <Primitive
        :as="as" :as-child="asChild"
        :class="cn('transition-colors text-text-sub-600 font-medium text-captionM  hover:text-foreground', props.class)"
    >
        <slot />
    </Primitive>
</template>
