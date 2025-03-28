<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'radix-vue'
import { TabsRoot, useForwardPropsEmits } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<TabsRootProps & { variant?: 'underline' | 'default' }>()
const emits = defineEmits<TabsRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const variant = computed(() => props.variant || 'default')
provide<'underline' | 'default'>('tabs-variant', variant.value)
</script>

<template>
    <TabsRoot v-bind="forwarded">
        <slot />
    </TabsRoot>
</template>
