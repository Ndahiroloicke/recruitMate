<script setup lang="ts">
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'
</script>

<template>
    <div class="team-card__container">
        <Skeleton class="team-card__image" />
        <span class="team-card__details">
            <Skeleton class="team-card__skeletonTitle" />
            <SkeletonAvatarGroup />
        </span>
        <Icon class="team-card__icon" name="ri:arrow-drop-right-line" />
    </div>
</template>

<style lang="postcss" scoped>
.team-card {
    @apply block cursor-pointer;
}

.team-card__skeletonTitle {
    @apply w-28 h-3 mb-1;
}

.team-card__container {
    @apply border rounded-[10px] flex items-center gap-3 p-4;
}

.team-card__image {
    @apply h-10 w-10 rounded-[10px];
}

.team-card__details {
    @apply flex flex-col justify-start;
}

.team-card__icon {
    @apply w-6 h-6 text-[#0D112666] ml-auto;
}
</style>
