<script setup lang="ts">
import Divider from '~/components/common/general/Divider.vue'
import BalanceDialog from '~/components/common/general/modals/settings/Balance.vue'
import Switch from '~/components/ui/switch/Switch.vue'

const modal = useModal()

function openModal(component: any) {
    modal.open(component)
}
</script>

<template>
    <div class="settings-notification">
        <div class="settings-notification__item">
            <div class="settings-notification__col">
                <span class="settings-notification__title">General Notifications</span>
                <span class="settings-notification__description">
                    Notifications about transactions, balance and exclusive offers.
                </span>
            </div>
            <div class="settings-notification__col settings-notification__col--actions">
                <Switch
                    label-position="right"
                    label="Transaction Alerts"
                    caption="Receive notifications for every transaction."
                    label-class="text-captionL "
                    caption-class="!text-captionM text-text-sub-600"
                />
                <div>
                    <Switch
                        label-position="right"
                        label="Low Balance Alert"
                        caption="Receive a warning if your balance falls below $1,000.00."
                        label-class="text-captionL"
                        caption-class="!text-captionM text-text-sub-600"
                    />
                    <Button size="sm" variant="link" class="settings-notification__button ml-[45px]" @click="openModal(BalanceDialog)">
                        <span>Edit</span>
                        <Icon name="ri:arrow-right-s-line" />
                    </Button>
                </div>
                <Switch
                    label-position="right"
                    label="Exclusive Offers"
                    caption="Get exclusive access to promotions, discounts, and more."
                    label-class="text-captionL"
                    caption-class="!text-captionM text-text-sub-600"
                />
            </div>
        </div>
        <Divider />

        <div class="settings-notification__item">
            <div class="settings-notification__col">
                <span class="settings-notification__title">Notification Method</span>
                <span class="settings-notification__description">
                    Choose how you prefer to receive notifications.
                </span>
            </div>
            <div class="settings-notification__col settings-notification__col--actions">
                <Switch
                    label-position="right"
                    label="Email Notifications"
                    caption="Receive notifications via email."
                    label-class="text-captionL"
                    caption-class="!text-captionM text-text-sub-600"
                />
                <Switch
                    label-position="right"
                    label="Push Notifications"
                    caption="Get real-time updates and alerts directly on your device."
                    label-class="text-captionL"
                    caption-class="!text-captionM text-text-sub-600"
                />
                <Switch
                    label-position="right"
                    label="SMS Notifications"
                    caption="Receive notifications via SMS."
                    label-class="text-captionL"
                    caption-class="!text-captionM text-text-sub-600"
                />
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.settings-notification {
    @apply grid grid-cols-1 px-6 sm:px-4;

    &__item {
        @apply grid grid-cols-1 md:grid-cols-2 py-5 max-md:gap-6;
    }

    &__col {
        @apply flex flex-col max-w-[350px] gap-1;

        &--actions {
            @apply gap-5;
        }
    }

    &__title {
        @apply text-captionL font-medium;
    }

    &__description {
        @apply text-captionM font-normal text-text-secondary;
    }

    &__button {
        @apply !text-left inline-flex max-w-max !p-0 !text-text-blue-accent;
    }
}
</style>
