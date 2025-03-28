<script setup lang="ts">
interface TimeLapseProps {
    designType: 'mobile' | 'desktop'
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
    <div class="notifications h-full">
        <div v-for="(item, index) in data" v-if="data" :key="index" class="notifications__section">
            <div class="flex items-center justify-between ">
                <h1 class="notifications__time-title">
                    {{ item.timeTitle }}
                </h1>
                <div class="notification__count">
                    {{ item.cards.length }}
                </div>
            </div>

            <div class="notifications__cards">
                <div v-for="(card, cardIndex) in item.cards" :key="cardIndex" class="notifications__card">
                    <CommonGeneralLayoutNotificationsCard
                        :design-type="designType" :description="card.description"
                        :variant="card.variant" :title="card.title" :time="card.time"
                    />
                </div>
            </div>
        </div>

        <div v-if="!data" class="no-notification">
            <Icon class="no-notification__icon" name="ri:notification-off-fill" />
            No Notification Found
        </div>
    </div>
</template>

<style scoped lang="postcss">
.no-notification {
    @apply flex flex-col text-captionM justify-center gap-2 items-center h-[224px] text-text-secondary;

    &__icon {
        @apply h-10 w-10;
    }
}

.notification__count {
    @apply text-captionM text-text-secondary;
}

.notifications {
    @apply flex flex-col w-full pb-5;
}

.notifications__section {
    @apply w-full;
}

.notifications__time-title {
    @apply py-4 text-text-secondary text-captionM;
}

.notifications__cards {
    @apply flex flex-col gap-3;
}

.notifications__card {
    @apply w-full;
}
</style>
