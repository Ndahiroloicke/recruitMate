<script lang="ts" setup>
import { useTeams } from '~/store/teams'

interface Notification {
    timeTitle: string
    cards: {
        time: string
        title: string
        description: string
        variant: 'info' | 'warning' | 'danger'
    }[]
}

const notifications: Notification[] = [{
    timeTitle: 'New',
    cards: [
        {
            time: '09:00',
            title: 'New Candidate',
            description: 'New candidate has been added to the system',
            variant: 'info',
        },
        {
            time: '09:00',
            title: 'New Candidate',
            description: 'New candidate has been added to the system',
            variant: 'info',
        },
        {
            time: '09:00',
            title: 'New Candidate',
            description: 'New candidate has been added to the system',
            variant: 'info',
        },
        {
            time: '10:00',
            title: 'New Candidate',
            description: 'New candidate has been added to the system',
            variant: 'warning',
        },
        {
            time: '11:00',
            title: 'New Candidate',
            description: 'New candidate has been added to the system',
            variant: 'danger',
        },
        {
            time: '12:00',
            title: 'New Candidate',
            description: 'New candidate has been added to the system',
            variant: 'info',
        },
    ],
}, {
    timeTitle: 'Yesterday',
    cards: [
        {
            time: '09:00',
            title: 'New Candidate',
            description: 'New candidate has been added to the system',
            variant: 'info',
        },
        {
            time: '10:00',
            title: 'New Candidate',
            description: 'New candidate has been added to the system',
            variant: 'info',
        },
        {
            time: '11:00',
            title: 'New Candidate',
            description: 'New candidate has been added to the system',
            variant: 'info',
        },
        {
            time: '12:00',
            title: 'New Candidate',
            description: 'New candidate has been added to the system',
            variant: 'info',
        },
    ],
}]

const router = useRouter()
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="ghost" size="icon" class="header__action-button">
                <Icon name="ri:notification-2-line" class="header__icon" />
            </Button>
        </PopoverTrigger>
        <PopoverContent align="end" class="header__popover-content">
            <div class="notifications-panel">
                <div class="notifications-panel__header">
                    <span class="notifications-panel__title">Notifications</span>
                    <span class="notifications-panel__mark-all">
                        Mark All As Read
                    </span>
                </div>
                <ScrollArea class="notifications-panel__scroll-area">
                    <CommonGeneralLayoutNotificationsTimeLapse :data="notifications" design-type="desktop" />
                </ScrollArea>
                <div class="notifications-panel__footer">
                    <Button size="xs" variant="link" class="notifications-panel__manage" @click="router.push(`/app/:teamId/settings/notification`)">
                        <Icon name="ri:settings-5-line" />
                        Manage Notification
                    </Button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
</template>

<style>
.header {
    &__popover-content {
        @apply !p-0 max-h-[300px] mb-6;
    }
}

.notifications-panel {
    @apply relative;
}

.notifications-panel__header {
    @apply flex justify-between border-b-[1px] px-4 py-2 w-full bg-white top-0 border-[#DEE0E3];
}

.notifications-panel__title {
    @apply text-text-primary text-captionL font-medium;
}

.notifications-panel__mark-all {
    @apply text-[#6381ff] cursor-pointer text-captionM flex items-center;
}

.notifications-panel__scroll-area {
    @apply px-4 h-56;
}

.notifications-panel__footer {
    @apply text-text-secondary text-captionS flex border-t-[1px] border-[#DEE0E3] px-2 py-1;
}

.notifications-panel__manage {
    @apply cursor-pointer flex items-center gap-1 text-captionS hover:no-underline w-auto ml-auto !text-text-secondary !p-0;
}
</style>
