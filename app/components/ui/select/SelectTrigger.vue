<script setup lang="ts">
import { cn } from '@/lib/utils'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <SelectTrigger
        v-bind="forwardedProps" :class="cn(
            'flex h-9 w-full items-center  rounded-[10px]  justify-between whitespace-nowrap  border border-input bg-transparent px-3 py-2 text-bodyS  ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus:shadow-[0_0_0_2px_rgba(120,150,255,0.5)] disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start',
            props.class,
        )"
    >
        <slot />
        <SelectIcon as-child>
            <Icon name="ri:arrow-down-s-line" class="w-5 h-5" />
        </SelectIcon>
    </SelectTrigger>
</template>
