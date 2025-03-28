<script setup lang="ts">
import type { ICandidateResponse } from '~/types/candidates/reponse'
import DeleteDialog from '~/components/common/general/modals/RemoveCandidates.vue'
import CandidatesDropDownMenu from './EditDropDown.vue'

const props = defineProps<{
    data: ICandidateResponse[]
    refreshTable: () => void
}>()

const modal = useModal()

const selectedRows = defineModel<number[]>({
    default: [],
})

const selectedCandidateIds = computed(() => {
    return selectedRows.value.map(index => props.data[index]?.id).filter(id => id !== undefined)
})

function openModal() {
    modal.open(DeleteDialog, {
        name: 'DeleteDialog',
        loading: false,
        selectedRows: props.data.filter((_candidate, index) => selectedRows.value.includes(index)),
        refreshTable: () => {
            props.refreshTable()
            selectedRows.value = []
        },
    })
}

const campaignsFilter = computed(() => {
    if (!selectedRows.value || typeof selectedRows.value !== 'object')
        return []

    const selectedSlugs = props.data.filter((_candidate, index) => selectedRows.value.includes(index)).map(candidate => candidate.id)

    return selectedSlugs.reduce((acc, id) => {
        const candidate = props.data.find(item => item.id === id)
        if (candidate && candidate.campaigns) {
            candidate.campaigns.forEach((campaign: number) => {
                if (!acc.includes(campaign)) {
                    acc.push(campaign)
                }
            })
        }
        return acc
    }, [] as number[])
})

const selectedCampaignsComputed = computed({
    get: () => selectedRows.value.filter(campaign => campaignsFilter.value.includes(campaign)),
    set: (value: number[]) => {
        selectedRows.value = value
    },
})

function toggleCampaignSelection(campaign: number) {
    if (selectedCampaignsComputed.value.includes(campaign))
        return selectedCampaignsComputed.value = selectedCampaignsComputed.value.filter(c => c !== campaign)

    selectedCampaignsComputed.value.push(campaign)
}
</script>

<template>
    <div
        v-if="selectedRows?.length"
        class="actions px-4 py-2.5 flex items-center justify-end w-full gap-4 border-background-badge-gray border-b"
    >
        <Button
            variant="destructiveTertiary"
            class=" !w-full md:!w-fit "
            @click="openModal"
        >
            <div class="flex items-center gap-1">
                <Icon name="ri:user-unfollow-line" class="w-5 h-5" />
                <p>
                    Delete Row
                </p>
            </div>
        </Button>
        <CandidatesDropDownMenu
            class="!w-full md:!w-fit"
            :campaigns="campaignsFilter"
            :selected-campaigns="selectedCandidateIds"
            :candidate-ids="selectedCandidateIds"
            :refresh-table="refreshTable"
            @toggle-campaign="toggleCampaignSelection"
        />
    </div>
</template>
