<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
    SwitchRoot,
    type SwitchRootEmits,
    type SwitchRootProps,
    SwitchThumb,
    useForwardPropsEmits,
} from 'radix-vue'
import { computed, type HTMLAttributes, ref } from 'vue'

const props = defineProps<
    SwitchRootProps & {
        class?: HTMLAttributes['class']
        label?: string
        labelPosition?: 'left' | 'right'
        caption?: string
        captionClass?: HTMLAttributes['class']
        labelClass?: HTMLAttributes['class']
    }
>()

const emits = defineEmits<SwitchRootEmits>()

const switchValue = ref<boolean>(false)

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props
    return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

function toggleSwitch() {
    if (!props.disabled) {
        switchValue.value = !switchValue.value
        emits('update:checked', switchValue.value)
    }
}
</script>

<template>
    <div class="flex items-start">
        <div
            :class="cn('flex flex-col cursor-pointer', {
                'order-1 ml-2': props.labelPosition === 'right',
                'order-0 mr-2': props.labelPosition === 'left',
            })"
            @click="toggleSwitch"
        >
            <span
                v-if="props.label"
                :class="cn('text-text-primary text-bodyM leading-5 tracking-tighter font-medium', props.labelClass)"
            >
                {{ props.label }}
            </span>
            <span
                v-if="props.caption"
                :class="cn('text-[#0F132499]/60 text-bodyM leading-6 tracking-tighter font-normal', props.captionClass)"
            >
                {{ props.caption }}
            </span>
        </div>

        <SwitchRoot
            v-bind="forwarded"
            :checked="switchValue"
            :class="cn(
                'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:pointer-events-none data-[state=checked]:bg-background-surface-info-accent data-[state=checked]:hover:bg-border-action-info-hover hover:data-[state=unchecked]:bg-text-tertiary focus-visible:shadow-[0_0_0_2px_rgba(120,150,255,0.5)]',
                {
                    'bg-border-base-divider': props.disabled && !switchValue,
                    'bg-border-action-hover': !props.disabled && !switchValue,
                },
            )"
            @update:checked="(val) => switchValue = val"
        >
            <SwitchThumb
                :class="cn('pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0', {
                    'bg-border-base-neutral-subtle': props.disabled && !switchValue,
                })"
            >
                <slot name="thumb" />
            </SwitchThumb>
        </SwitchRoot>
    </div>
</template>
