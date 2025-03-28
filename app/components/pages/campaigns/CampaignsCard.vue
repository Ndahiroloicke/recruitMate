<script setup lang="ts">
import { useTeams } from '~/store/teams'

const _props = defineProps<{
    teamName: string
    teamLogo?: any
    description?: string
    avatars: Array<{
        src?: string
        alt?: string
        initials?: string
        img?: string
    }>
    teamId: number
}>()
</script>

<template>
    <NuxtLink to="/app/:teamId/teams-settings/campaigns" class="team-card">
        <div class="team-card__container">
            <NuxtImg :src="teamLogo" class="team-card__image" />
            <div class="team-card__meta">
                <span class="team-card__details">
                    {{ teamName }}
                </span>
                <span class="team-card__description">
                    {{ description }}
                </span>
            </div>

            <Icon class="team-card__icon" name="ri:arrow-drop-right-line" />
        </div>
    </NuxtLink>
</template>

<style lang="postcss" scoped>
.team-card {
    @apply block cursor-pointer;
}

.team-card__container {
    @apply border rounded-[10px] flex items-center gap-3 p-4;
}

.team-card__image {
    @apply h-10 w-10 rounded-[10px];
}

.team-card__details {
    @apply flex flex-col justify-start font-medium text-bodyM;
}

.team-card__icon {
    @apply w-6 h-6 text-[#0D112666] ml-auto;
}
.team-card__description{
    @apply text-captionM text-text-secondary
}
.team-card__meta{
    @apply flex flex-col
}
</style>
