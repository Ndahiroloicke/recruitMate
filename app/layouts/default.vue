<template>
    <div class="layout">
        <CommonGeneralLayoutHeader />

        <div class="layout__content">
            <slot />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.layout {
    @apply h-full flex flex-col w-full overflow-hidden;

    &__content {
        @apply flex-1 overflow-y-auto;
    }
}
</style>
