<script setup lang="ts">
import teamsModal from '~/components/common/general/modals/teamsModal.vue'

const isLoading = ref(false)
const modal = useModal()

function openModal() {
    modal.open(teamsModal, {
        name: 'example',
        loading: false,
    })
}

const { data: response, status } = useFetch('/api/teams', {
    method: 'GET',
})

const teamsData = computed(() => response.value?.data?.map((team: any) => ({
    id: team.id,
    team_id: team.team_id,
    created_at: team.created_at,
    description: team.description,
    logo: team.logo,
    name: team.name,
    is_default: team.is_default,
    owner_id: team.owner_id,
    permissions_id: team.permissions_id,
})) || [])
</script>

<template>
    <div class="teams-page">
        <CommonApplicationMainLayout title="All Teams" :is-loading="isLoading" description="View and manage all the campaigns you’ve created!">
            <template #actions>
                <Button class="teams-page__create-button" variant="secondary" @click="openModal">
                    <span class="teams-page__create-button-icon">+</span>
                    Create Team
                </Button>
            </template>
            <template #main>
                <div
                    v-if="status === 'success' && teamsData.length > 0"
                    class="teams-page__content teams-page__content--non-empty"
                >
                    <div v-for="item in teamsData" :key="item.team_id" class="teams-page__content teams-page__content--non-empty--card">
                        <PagesCampaignsCard
                            :team-id="item.team_id"
                            :team-name="item.name"
                            :description="item.description"
                            :avatars="[{ alt: item.name, initials: item.name, src: item.logo, img: item.logo }]"
                            :team-logo="item.logo"
                            class="teams-page__card"
                        />
                    </div>
                </div>
                <div v-else-if="status === 'success'" class="teams-page__content teams-page__content--empty">
                    <PagesTeamsNotFound class="teams-page__not-found" />
                </div>
                <div v-else class="teams-page__loading">
                    Loading...
                </div>
            </template>
        </CommonApplicationMainLayout>
    </div>
</template>

<style lang="postcss" scoped>
.teams-page {
    @apply min-h-screen;
}

.teams-page__create-button {
    @apply rounded-xl p-2.5 shadow-none w-full lg:w-auto;
}

.teams-page__create-button-icon {
    @apply mx-1;
}

.teams-page__content {
    @apply max-w-7xl mx-auto w-full flex flex-col gap-4 p-0 px-3 sm:px-0;
}

.teams-page__content--non-empty {
    @apply mt-7;
}

.teams-page__content--non-empty--card {
    @apply flex flex-col gap-4;
}

.teams-page__content--empty {
    @apply mt-20 pb-24;
}

.teams-page__card {
    @apply w-full;
}

.teams-page__not-found {
    @apply text-center;
}

.teams-page__loading {
    @apply text-center mt-20;
}
</style>
