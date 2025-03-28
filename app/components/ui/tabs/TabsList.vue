<script setup lang="ts">
import { cn } from '@/lib/utils'
import { TabsList, type TabsListProps } from 'radix-vue'
import { computed, type HTMLAttributes, inject } from 'vue'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()
const variant = inject<'underline' | 'default'>('tabs-variant', 'default')

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props
    return delegated
})
</script>

<template>
    <TabsList
        v-bind="delegatedProps"
        :class="cn(
            'inline-flex items-center rounded-lg text-muted-foreground',
            variant === 'underline' ? 'p-0 flex gap-6 justify-start' : 'p-1 justify-center bg-muted',
            props.class,
        )"
    >
        <slot />
    </TabsList>
</template>
