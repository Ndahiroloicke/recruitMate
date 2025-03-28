<script setup lang="ts">
import type { Column } from '~/components/common/general/Table.vue'
import type { Candidate } from '~/types'
import { useModal } from '@/composables/useModal'
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import TableEditButton from '~/components/common/application/TableEditButton.vue'
import ChooseRole from '~/components/common/general/modals/ChooseRole.vue'
import CandidateInfo from '~/components/pages/teams/table/CandidateInfo.vue'
import { useMembers } from '~/store/members'

const route = useRoute()
const teamId = computed(() => route.params.teamId as string)
const membersStore = useMembers()

const { members, status } = storeToRefs(membersStore)

const isLoading = computed(() => status.value === 'loading').value

watch(teamId, (newTeamId) => {
    if (newTeamId) {
        membersStore.fetchMembers(newTeamId)
    }
})

onMounted(() => {
    if (teamId.value) {
        membersStore.fetchMembers(teamId.value)
    }
})

const modal = useModal()
function openModal() {
    modal.open(ChooseRole, {
        name: 'example',
        loading: false,
    })
}

const columns: Column<Candidate>[] = [
    {
        key: 'first_name',
        label: 'Name',
        class: 'w-full flex items-center gap-3',
        row: (item: Candidate) => h(CandidateInfo, { item, isLoading }),
    },
    {
        key: 'role',
        label: 'Role',
        class: 'max-w-sm text-text-secondary',
        align: 'right',
    },
    {
        key: 'id',
        label: '',
        align: 'right',
        class: 'actions text-end max-w-[180px]',
        row: () => h(TableEditButton, { onClick: openModal }),
    },
]
</script>

<template>
    <div>
        <div v-if="!members.length && status === 'success'" class="members__empty">
            <PagesTeamsNotFound />
        </div>

        <div v-else class="membersLayout">
            <CommonGeneralTable
                :is-loading="isLoading"
                class="members__table"
                :columns="columns"
                :data="members"
            />
        </div>
    </div>
</template>

<style scoped lang="postcss">
.membersLayout {
    @apply mx-3 lg:mx-auto mt-7 border rounded-[8px] max-w-7xl border-[#E9EAEC] overflow-hidden w-auto;
}

.members {
    &__table {
        @apply h-full;
    }

    &__empty {
        @apply my-4;
    }
}

.error-message {
    @apply p-4 my-4 text-red-600 bg-red-50 rounded-lg;
}
</style>
