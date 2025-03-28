<script setup lang="ts">
defineProps<{
    time: string
    title: string
    description: string
    variant: 'danger' | 'warning' | 'info'
    designType: 'mobile' | 'desktop'
}>()
</script>

<template>
    <div v-if="designType === 'mobile'" class="alert">
        <Icon v-if="variant === 'info'" class="alert__icon alert__icon--info" name="ri:question-fill" />
        <Icon v-if="variant === 'warning'" class="alert__icon alert__icon--warning" name="ri:error-warning-fill" />
        <Icon v-if="variant === 'danger'" class="alert__icon alert__icon--danger" name="ri:error-warning-fill" />
        <div class="alert__content">
            <div class="alert__header">
                <span class="alert__title">
                    {{ title }}
                </span>
                <span class="alert__time">
                    {{ time }}
                </span>
            </div>
            <p class="alert__description">
                {{ description }}
            </p>
        </div>
    </div>
    <div v-if="designType === 'desktop'" class="desktop-alert">
        <Icon v-if="variant === 'info'" class="desktop-alert__icon desktop-alert__icon--info" name="ri:question-fill" />
        <Icon
            v-if="variant === 'warning'" class="desktop-alert__icon desktop-alert__icon--warning"
            name="ri:error-warning-fill"
        />
        <Icon
            v-if="variant === 'danger'" class="desktop-alert__icon desktop-alert__icon--danger"
            name="ri:error-warning-fill"
        />
        <div class="desktop-alert__content">
            <div class="desktop-alert__header">
                <span class="desktop-alert__title">
                    {{ title }}
                </span>
                <span class="desktop-alert__time">
                    {{ time }}
                </span>
            </div>
            <p class="desktop-alert__description">
                {{ description }}
            </p>
        </div>
    </div>
</template>

<style>
.alert {
    @apply p-4 rounded-[12px] border-[1px] flex w-full border-[#E9EAEC];
}

.alert__icon {
    @apply h-5 w-5 mr-3 mt-[2px];
}

.alert__icon--info {
    @apply text-icon-primary;
}

.alert__icon--warning {
    @apply text-[#F48E2F];
}

.alert__icon--danger {
    @apply text-[#E6483D];
}

.alert__content {
    @apply w-full flex flex-col;
}

.alert__header {
    @apply flex justify-between;
}

.alert__title {
    @apply text-bodyM text-text-primary;
}

.alert__time {
    @apply text-captionM;
}

.alert__description {
    @apply text-text-secondary text-captionL;
}

.desktop-alert {
    @apply border-b pb-3 flex border-[#E9EAEC];
}

.desktop-alert__icon {
    @apply h-4 w-4 mr-3 mt-[2px];
}

.desktop-alert__icon--info {
    @apply text-icon-primary;
}

.desktop-alert__icon--warning {
    @apply text-[#F48E2F];
}

.desktop-alert__icon--danger {
    @apply text-[#E6483D];
}

.desktop-alert__content {
    @apply w-full flex-1;
}

.desktop-alert__header {
    @apply flex justify-between;
}

.desktop-alert__title {
    @apply text-captionM text-text-primary;
}

.desktop-alert__time {
    @apply text-captionS text-text-secondary;
}

.desktop-alert__description {
    @apply text-text-secondary text-captionM;
}
</style>
