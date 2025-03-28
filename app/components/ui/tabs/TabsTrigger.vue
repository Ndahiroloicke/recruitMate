<script setup lang="ts">
import { cn } from '@/lib/utils'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes, inject } from 'vue'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()
const variant = inject<'underline' | 'default'>('tabs-variant', 'default')

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props
    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <TabsTrigger v-bind="forwardedProps" :class="cn(
        'inline-flex items-center  justify-center whitespace-nowrap rounded-[10px] text-captionL font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background  data-[state=active]:border data-[state=active]:text-foreground data-[state=active]:shadow-xs',
        variant === 'underline' ? 'relative px-0 h-[56px] !border-0' : 'px-3 py-1',
        props.class,
    )">
        <span class="truncate">
            <slot />
        </span>

        <span v-if="variant === 'underline'" class="tab-indicator" />
    </TabsTrigger>
</template>

<style lang="postcss" scoped>
.tab-indicator {
    @apply absolute bottom-0 left-0 w-full h-[2px] bg-text-blue-accent scale-x-0 transition-all;
}

[data-state='active'] .tab-indicator {
    @apply scale-x-100;
}
</style>
