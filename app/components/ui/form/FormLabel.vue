<script lang="ts" setup>
import type { LabelProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useFormField } from './useFormField'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'], required?: boolean }>()

const { error, formItemId } = useFormField()
</script>

<template>
    <Label
        :class="cn(
            error && 'text-destructive',
            props.class,
        )"
        class="text-captionL after:content-[attr(data-required)] after:text-background-accent-red-accent"
        :for="formItemId"
        :required="props.required"
        :data-required="props.required ? '*' : undefined"
    >
        <slot />
    </Label>
</template>
