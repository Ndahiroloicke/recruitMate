<script setup lang="ts">
import type { Column } from '~/components/common/general/Table.vue'
import { useModal } from '@/composables/useModal'
import TableCancelnvite from '~/components/common/application/TableCancelnvite.vue'
import ChooseRole from '~/components/common/general/modals/ChooseRole.vue'
import RemoveInvite from '~/components/common/general/modals/RemoveInvite.vue'
import CandidateInfo from '~/components/pages/teams/table/CandidateInfo.vue'
import Button from '~/components/ui/button/Button.vue'

const mockTableData: Candidate[] = [{ id: 1, first_name: 'Spark', last_name: 'Contez', email: 'lindsay.walton@example.com', role: 'manager', avatar: '/images/Avatar.svg' }, { id: 2, first_name: 'Spark', last_name: 'Contez', email: 'lindsay.walton@example.com', role: 'manager', avatar: '/images/Avatar.svg' }, { id: 3, first_name: 'Spark', last_name: 'Contez', email: 'lindsay.walton@example.com', role: 'manager', avatar: '/images/Avatar.svg' }]

const isLoading = ref(false)

interface Candidate {
    id: number
    first_name: string
    last_name: string
    email: string
    role: string
    avatar: string
}

const modal = useModal()
function openModal() {
    modal.open(RemoveInvite, {
        name: 'example',
        loading: false,
    })
}

const columns: Column<Candidate>[] = [
    {
        key: 'first_name',
        label: 'Name',
        class: 'w-full flex items-center gap-3',
        row: (item: Candidate) => h(CandidateInfo, { item, isLoading: isLoading.value }),
    },
    {
        key: 'id',
        label: '',
        align: 'right',
        class: 'actions text-end max-w-[180px]',
        row: () => h(TableCancelnvite, { onClick: openModal }),
    },
]
</script>

<template>
    <div>
        <div v-if="mockTableData.length > 0" class="membersLayout">
            <CommonGeneralTable :is-loading="isLoading" class="invites__table" :columns="columns" :data="mockTableData" />
        </div>
        <div v-else>
            <span class="invites__empty-text">No members found</span>
        </div>
    </div>
</template>

<style scoped lang="postcss">
.membersLayout {
    @apply mx-3 sm:mx-auto mt-7 border rounded-[8px] max-w-7xl border-[#E9EAEC] overflow-hidden w-auto;
}

.invites {
    &__table {
        @apply h-full;
    }

    &__empty-text {
        @apply text-text-secondary;
    }
}
</style>
