<script setup>
import CandidateImportModal from '@/components/common/general/modals/Import.vue'
import CandidatesTableContainer from '@/components/pages/candidates/index.vue'
import CampaignsDetail from '@/components/skeleton/campaign/Detail.vue'
import Detail from '~/components/common/application/infoCard/detail.vue'
import { useTeams } from '~/store/teams'

const isLoading = ref(false)
const modal = useModal()

const campaignDetail = ref({
    detail: {
        unread: {
            count: 156,
            days: 'Last 7 days',
        },
        replied: {
            count: 89,
            days: 'Last 30 days',
        },
        awaitingFeedback: {
            count: 67,
            days: 'Last 14 days',
        },
    },
})

const avatars = [
    {
        src: '/images/Avatar.svg',
        alt: 'Team Member 1',
        initials: 'TM',
    },
    {
        src: '/images/Avatar.svg',
        alt: 'Team Member 2',
        initials: 'JD',
    },
    {
        src: '/images/Avatar.svg',
        alt: 'Team Member 3',
        initials: 'RS',
    },
]

const candidatesMockData = [
    {
        campaigns: [1, 2],
        company: 'Apple Inc.',
        first_name: 'John',
        last_name: 'Doe',
        id: 1,
        position: 'Multidisciplinary Designer',
        startSince: 1618137600,
        endSince: 1735413605,
        slug: 'john-doe',
        avatar: '/images/Avatar.svg',
    },
    {
        campaigns: [1, 2, 3],
        company: 'Google',
        first_name: 'Jane',
        last_name: 'Smith',
        id: 2,
        position: 'Marketing Specialist',
        startSince: 1612137600,
        endSince: 1735413605,
        slug: 'jane-smith',
        avatar: '/images/Avatar.svg',
    },
    {
        campaigns: [1, 3],
        company: 'Meta',
        first_name: 'Robert',
        last_name: 'Johnson',
        id: 3,
        position: 'Product Designer',
        startSince: 1612137600,
        endSince: 1735413605,
        slug: 'robert-johnson',
        avatar: '/images/Avatar.svg',
    },
]

function openImportModal() {
    modal.open(CandidateImportModal, {
        name: 'candidate-import',
        loading: false,
    })
}

function handleEdit() {
    console.log('Edit clicked')
}
</script>

<template>
    <div class="campaigns-detail">
        <CommonApplicationMainLayout
            title="Campaign Details"
            :is-loading="isLoading"
            :is-show-back-button="true"
            back-router="/app/:teamId/teams-settings"
            description="View and manage your campaign details"
        >
            <template #headerContent>
                <div class="campaigns-detail__header-content">
                    <CommonApplicationAvatarGroup
                        size="sm"
                        :avatars="avatars"
                        class="campaigns-detail__avatar-group"
                    />
                    <Badge variant="success" class="campaigns-detail__status-badge">
                        Running
                    </Badge>
                </div>
            </template>
            <template #actions>
                <div class="campaigns-detail__actions">
                    <Button
                        variant="secondary"
                        class="campaigns-detail__button"
                        @click="handleEdit"
                    >
                        <Icon name="ri:edit-line" class="campaigns-detail__icon" />
                        Edit
                    </Button>
                    <Button
                        variant="secondary"
                        class="campaigns-detail__button"
                        @click="openImportModal"
                    >
                        <Icon name="ri:upload-cloud-2-line" class="campaigns-detail__icon" />
                        Import
                    </Button>
                </div>
            </template>
            <template #underLayout>
                <div v-if="!isLoading" class="campaigns-detail__content">
                    <Detail :detail="campaignDetail.detail" />
                </div>
                <div v-else class="campaigns-detail__content">
                    <CampaignsDetail />
                </div>
            </template>
            <template #main>
                <div class="campaigns-detail__table">
                    <CandidatesTableContainer
                        :is-loading="isLoading"
                        :data="candidatesMockData"
                    />
                </div>
            </template>
        </CommonApplicationMainLayout>
    </div>
</template>

<style scoped lang="postcss">
.campaigns-detail {
    @apply min-h-screen;

    &__actions {
        @apply flex gap-2;
    }

    &__button {
        @apply shadow-none flex items-center gap-2;
    }

    &__icon {
        @apply w-5 h-5 text-black/60;
    }

    &__content {
        @apply w-full flex -translate-x-2 pt-5 justify-start;
    }

    &__table {
        @apply w-full;
    }

    &__header-content {
        @apply flex items-center gap-3;
    }

    &__avatar-group {
        @apply -ml-1;
    }

    &__status-badge {
        @apply px-2 py-1 text-captionM font-medium;
    }
}
</style>
