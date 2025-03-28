<script setup lang="ts">
import { cn } from '@/lib/utils'
import { TagsInputRoot, type TagsInputRootEmits, type TagsInputRootProps, useForwardPropsEmits } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<TagsInputRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<TagsInputRootEmits>()

const delegatedProps = computed(() => {
    const { class: _, disabled, ...delegated } = props

    return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
    <TagsInputRoot v-bind="forwarded" :class="cn('flex rounded-xl border-[1.5px] py-1  flex-wrap gap-2  items-center  border-border-action-normal bg-white  text-captionL focus-visible:outline-none focus:outline-none focus-visible:ring-1 focus:shadow-[0_0_0_2px_rgba(120,150,255,0.5) hover:border-border-action-hover', props.class)">
        <slot />
    </TagsInputRoot>
</template>
