<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-icons/vue'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

interface ExtendedCheckboxRootProps extends CheckboxRootProps {
    labelPosition?: 'left' | 'right'
    label?: string
    caption?: string
}
const props = defineProps<ExtendedCheckboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const checkboxValue = defineModel('checked', {
    default: false,
})
</script>

<template>
    <div class="flex items-start">
        <div
            :class="cn('flex flex-col', {
                'order-1 ml-2': props.labelPosition === 'right',
                'order-0 mr-2': props.labelPosition === 'left',
            })"
        >
            <span
                v-if="props.label"
                class="text-text-primary text-captionM leading-5 tracking-tighter font-medium"
            >
                {{ props.label }}
            </span>
            <span
                v-if="props.caption"
                class="!text-[#0F132499]/60 text-captionS leading-6 tracking-tighter font-normal"
            >
                {{ props.caption }}
            </span>
        </div>

        <CheckboxRoot
            v-bind="forwarded" v-model="checkboxValue" :disabled="props.disabled" :class="cn(
                'peer h-5 w-5 shrink-0 rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-background-surface-info-accent data-[state=checked]:hover:bg-border-action-info-hover data-[state=unchecked]:bg-white hover:data-[state=unchecked]:focus:shadow-[0_0_0_2px_rgba(120,150,255,0.5)]',
                {
                    '!border-border-base-divider !bg-border-base-divider pointer-events-none': props.disabled,
                    'border-border-action-normal': !props.disabled && !checkboxValue,
                },
            )"
        >
            <CheckboxIndicator
                :class="cn('flex h-full w-full items-center justify-center text-current transition-opacity', {
                    'opacity-50': props.disabled && checkboxValue,
                    'opacity-100': checkboxValue,
                })"
            >
                <slot>
                    <CheckIcon class="h-4 w-4 text-white" />
                </slot>
            </CheckboxIndicator>
        </CheckboxRoot>
    </div>
</template>
