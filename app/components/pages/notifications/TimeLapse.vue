<script setup lang="ts">
interface TimeLapseProps {
    data: {
        timeTitle: string
        cards: {
            time: string
            title: string
            description: string
            variant: 'danger' | 'warning' | 'info'
        }[]
    }[]
}

defineProps<TimeLapseProps>()
</script>

<template>
    <div class="notifications">
        <div v-for="(item, index) in data" :key="index" class="notifications__section">
            <h1 class="notifications__time-title">
                {{ item.timeTitle }}
            </h1>
            <div class="notifications__cards">
                <div v-for="(card, cardIndex) in item.cards" :key="cardIndex" class="notifications__card">
                    <PagesNotificationsCard
                        :description="card.description" :variant="card.variant" :title="card.title"
                        :time="card.time"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.notifications {
    @apply flex flex-col w-full;
}

.notifications__section {
    @apply w-full;
}

.notifications__time-title {
    @apply py-4 text-text-secondary;
}

.notifications__cards {
    @apply flex flex-col gap-3;
}

.notifications__card {
    @apply w-full;
}
</style>
