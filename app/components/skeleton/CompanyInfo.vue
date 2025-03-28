<template>
    <div class="company-info company-info--loading">
        <Skeleton class="company-info__item company-info__item--small" />
        <Skeleton class="company-info__item company-info__item--large" />
    </div>
</template>

<style scoped lang="postcss">
.company-info {
    @apply flex justify-end flex-col gap-0.5 items-end;

    &__item {
        @apply h-3;

        &--small {
            @apply w-16;
        }

        &--large {
            @apply w-20;
        }
    }
}
</style>
