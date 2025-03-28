<script lang="ts" setup>
import { useModal } from '@/composables/useModal'
import { storeToRefs } from 'pinia'
import TeamsModal from '~/components/common/general/modals/teamsModal.vue'
import { useMembers } from '~/store/members'
import { useTeams } from '~/store/teams'

const modal = useModal()
const route = useRoute()
const router = useRouter()
const isEmpty = ref(false)

const membersStore = useMembers()
const { members, status } = storeToRefs(membersStore)

const isLoading = computed(() => status.value === 'loading').value

const routePaths = {
    members: `/app/:teamId/teams-settings/members`,
    invites: `/app/:teamId/teams-settings/members/invites`,
}

const settingTab = computed({
    get() {
        return route.fullPath.includes('invites') ? 'invites' : 'members'
    },
    set(value) {
        router.push(routePaths[value])
    },
})

function openInviteModal() {
    modal.open(TeamsModal, {
        name: 'mobile-menu',
        loading: false,
        startAt: 1,
    })
}
</script>

<template>
    <div>
        <div class="teams-dashboard__header">
            <Tabs v-model="settingTab" variant="default" class="teams-dashboard__tabs">
                <TabsList class="teams-dashboard__tabs-list">
                    <TabsTrigger class="teams-dashboard__tab-trigger" value="members">
                        <div class="teams-dashboard__tab-content">
                            Members
                            <div v-if="!isLoading" class="teams-dashboard__tab-badge">
                                {{ members.length }}
                            </div>
                            <div v-else>
                                <Skeleton class="teams-dashboard__skeleton" />
                            </div>
                        </div>
                    </TabsTrigger>

                    <TabsTrigger class="teams-dashboard__tab-trigger" value="invites">
                        <div class="teams-dashboard__tab-content">
                            Invites
                            <div v-if="!isLoading" class="teams-dashboard__tab-badge">
                                6
                            </div>
                            <div v-else>
                                <Skeleton class="teams-dashboard__skeleton" />
                            </div>
                        </div>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <Button
                v-if="!isEmpty"
                variant="secondary"
                class="teams-dashboard__invite-button"
                @click="openInviteModal"
            >
                <Icon name="ri:user-add-line" />
                Invite
            </Button>
        </div>

        <NuxtPage />
    </div>
</template>

<style scoped lang="postcss">
.membersLayout {
    @apply mx-3 sm:mx-auto mt-7 border rounded-[8px] max-w-7xl border-[#E9EAEC] overflow-hidden w-auto;
}

.teams-dashboard {
    &__header {
        @apply flex flex-col sm:flex-row justify-between items-end gap-3 max-w-7xl mx-auto px-3 xl:px-0;
    }

    &__tabs {
        @apply w-full mt-4 sm:px-0 rounded-[12px] max-w-7xl mx-auto;
    }

    &__tabs-list {
        @apply w-full;
    }

    &__tab-trigger {
        @apply w-full;
    }

    &__tab-content {
        @apply flex items-center gap-2;
    }

    &__tab-badge {
        @apply bg-[#0A0F290A] px-2 rounded-[8px];
    }

    &__tabs-content {
        @apply w-full;
    }

    &__invite-button {
        @apply w-full flex-1 py-2 sm:py-4 sm:flex-shrink-0;
    }

    &__skeleton {
        @apply h-6 w-6;
    }
}
</style>
