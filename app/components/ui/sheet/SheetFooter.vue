<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
    <div
        :class="
            cn(
                'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2 border-t p-5 h-screen bottom-0 z-50 w-full h-[80px]',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
