<template>
    <div v-for="n in 4" :key="n" class="template-skeleton">
        <div class="template-skeleton__content">
            <div class="template-skeleton__tags">
                <Skeleton class="template-skeleton__tags-item" />
                <Skeleton class="template-skeleton__tags-item" />
            </div>
            <Skeleton class="template-skeleton__subject" />
            <Skeleton class="template-skeleton__body" />
        </div>
        <Skeleton class="template-skeleton__select-button" />
    </div>
</template>

<style lang="postcss" scoped>
.template-skeleton {
    @apply rounded-2xl border border-border-base-alpha bg-white shadow-xs flex flex-col p-6 justify-between items-start gap-5 flex-1 min-h-[14.5rem];

    &__content {
        @apply flex flex-col w-full gap-3;
    }

    &__tags {
        @apply flex gap-2;

        &-item {
            @apply h-6 w-16 rounded-full;
        }
    }

    &__subject {
        @apply h-5 w-3/4 rounded-md;
    }

    &__body {
        @apply h-4 w-full rounded-md;
    }

    &__select-button {
        @apply w-full h-10 rounded-xl;
    }
}
</style>
