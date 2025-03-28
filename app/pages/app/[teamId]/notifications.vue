<script setup>
const notifications = [{
    timeTitle: 'New',
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
        {
            time: '12:00',
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
</script>

<template>
    <CommonApplicationMainLayout
        description="You will see the developments about our candidates here"
        title="Notifications"
    >
        <template #main>
            <div class="container-div">
                <CommonGeneralLayoutNotificationsTimeLapse :data="notifications" design-type="mobile" />
            </div>
        </template>
    </CommonApplicationMainLayout>
</template>

<style lang="postcss" scoped>
.container-div {
    @apply px-4 lg:px-0
}
</style>
