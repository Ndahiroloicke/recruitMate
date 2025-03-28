<script setup lang="ts">
import { cn } from '@/lib/utils'
import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'radix-vue'

import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <TagsInputItem v-bind="forwardedProps" :class="cn('flex h-5 border text-captionS font-medium shadow-xs p-0 border-border-base-divider items-center rounded-md bg-white data-[state=active]:ring-background-surface-info-accent data-[state=active]:ring-2 data-[state=active]:ring-offset-2 ring-offset-background', props.class)">
        <slot />
    </TagsInputItem>
</template>
