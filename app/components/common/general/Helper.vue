<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps</* @vue-ignore */ HTMLAttributes & { option?: string }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})
</script>

<template>
    <span
        v-bind="delegatedProps"
        class="text-text-tertiary"
        :class="
            cn(
                'text-captionL font-normal leading-none',
                props.class,
            )
        "
    >
        <slot />
    </span>
</template>
