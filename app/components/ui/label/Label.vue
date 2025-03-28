<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Label, type LabelProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'], option?: string }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})
</script>

<template>
    <Label
        v-bind="delegatedProps"
        :class="
            cn(
                'text-captionL text-text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                props.class,
            )
        "
    >
        <slot />
        <span v-if="option" class="text-text-tertiary ml-2">
            {{ option }}
        </span>
    </Label>
</template>
