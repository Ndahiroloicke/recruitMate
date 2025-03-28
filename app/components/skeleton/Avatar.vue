<script setup lang="ts">
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

const props = defineProps<{
    size: 'sm' | 'base' | 'lg' | 'xl'
}>()
</script>

<template>
    <Skeleton :class="props.size" />
</template>

<style lang="postcss" scoped>
.sm {
    @apply h-6 w-6 rounded-full text-captionL;
}
.base {
    @apply h-8 w-8 rounded-full text-bodyS;
}
.lg {
    @apply h-10 w-10 rounded-full text-bodyM;
}
.xl {
    @apply h-12 w-12 rounded-full text-bodyL;
}
</style>
