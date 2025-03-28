<script setup lang="ts">
import backgroundSvg from '@/assets/background.svg'
</script>

<template>
    <div class="background">
        <img :src="backgroundSvg" alt="background" class="image">
        <slot />
    </div>
</template>

<style lang="postcss" scoped>
.background {
    @apply w-full bg-no-repeat bg-center bg-cover relative;
    height: calc(100vh - 65px);
    min-height: calc(100vh - 65px);
}
.image {
    @apply fixed inset-0 w-full h-full object-cover z-[-1];
}
</style>
