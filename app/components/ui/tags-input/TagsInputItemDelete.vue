<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Cross2Icon } from '@radix-icons/vue'
import { TagsInputItemDelete, type TagsInputItemDeleteProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<TagsInputItemDeleteProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <TagsInputItemDelete v-bind="forwardedProps" :class="cn('flex text-text-secondary hover:text-text-primary rounded bg-transparent mr-1', props.class)">
        <slot>
            <Cross2Icon class="w-3 h-3" />
        </slot>
    </TagsInputItemDelete>
</template>
