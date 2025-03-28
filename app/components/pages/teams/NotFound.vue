<script setup lang="ts">
import { useModal } from '@/composables/useModal'
import teamsModal from '~/components/common/general/modals/teamsModal.vue'

const modal = useModal()

function openInviteModal() {
    modal.open(teamsModal, {
        name: 'mobile-menu',
        loading: false,
        startAt: 1,
    })
}
</script>

<template>
    <div class="recruitive-team-not-found">
        <CommonGeneralNotFound
            title="Let’s Create Your Recruitive Team"
            description="You've just started! Invite your team members to continue"
        >
            <template #image>
                <NuxtImg src="/images/no_data.svg" alt="Not Found Image" class="recruitive-team-not-found__image" />
            </template>
            <template #buttons>
                <Button variant="secondary" class="teams-dashboard__invite-button" @click="openInviteModal">
                    <Icon name="ri:user-add-line" />
                    Invite
                </Button>
            </template>
        </CommonGeneralNotFound>
    </div>
</template>

<style>
.recruitive-team-not-found {
    @apply w-full flex flex-col items-center justify-center gap-4;
}

.recruitive-team-not-found__image {
    @apply h-[260px];
}

.recruitive-team-not-found__button {
    @apply !rounded-xl !p-2.5 !shadow-none w-full lg:w-auto;
}

.recruitive-team-not-found__button-icon {
    @apply mx-1;
}
</style>
