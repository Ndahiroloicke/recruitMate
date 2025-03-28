<template>
    <div v-for="n in 4" :key="n" class="importCandidates__skeleton">
        <Skeleton class="importCandidates__avatar" />
        <div class="importCandidates__content">
            <div class="flex gap-3 items-end">
                <Skeleton class="importCandidates__title" />
                <Skeleton class="importCandidates__title-sub" />
            </div>

            <Skeleton class="importCandidates__description" />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.importCandidates__skeleton{
    @apply flex gap-2 items-center border shadow-xs p-4 rounded-xl w-full
}
.importCandidates__avatar {
    @apply rounded-xl w-10 h-10;
}

.importCandidates__content {
    @apply flex flex-col gap-1 w-full;
}

.importCandidates__title {
    @apply w-32 h-4;
}

.importCandidates__title-sub {
    @apply w-20 h-2;
}

.importCandidates__description {
    @apply w-full h-3;
}
</style>
