<script setup lang="ts">
import { cn } from '@/lib/utils'
import { DialogTitle, type DialogTitleProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})
</script>

<template>
    <DialogTitle
        :class="cn('text-[18px] leading-6 font-medium text-foreground mb-5', props.class)"
        v-bind="delegatedProps"
    >
        <slot />
    </DialogTitle>
</template>
