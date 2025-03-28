<script setup lang="ts">
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-icons/vue'
import {
    RadioGroupIndicator,
    RadioGroupItem,
    type RadioGroupItemProps,
    useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <RadioGroupItem
        v-bind="forwardedProps"
        :class="
            cn(
                'aspect-square shadow-xs h-4 w-4 rounded-full border data-[active=true]:border-2 data-[active=true]:border-background-badge-blue-accent shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                props.class,
            )
        "
    >
        <RadioGroupIndicator class="flex items-center justify-center">
            <span class="h-2 w-2 rounded-full bg-background-badge-blue-accent" />
        </RadioGroupIndicator>
    </RadioGroupItem>
</template>
