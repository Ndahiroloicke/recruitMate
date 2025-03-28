<template>
    <div class="icon-container">
        <slot name="icon" />
    </div>
</template>

<style lang="postcss" scoped>
.icon-container {
    @apply rounded-full w-10 h-10 flex justify-center items-center border;
}
</style>
