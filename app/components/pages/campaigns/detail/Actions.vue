<script setup lang="ts">
import { computed, ref } from 'vue'
import DeleteDialog from '../Dialog.vue'
import CampaignsDropDownMenu from './CandidatesStatusDropDown.vue'

const props = defineProps<{
    data: any[]
    selectedRows: any
}>()

const modal = useModal()
function openModal() {
    const selectedItems = Object.keys(props.selectedRows)
        .filter(slug => props.selectedRows[slug])
        .map(slug => ({
            slug,
            name: props.selectedRows[slug]?.name || '',
            last_name: props.selectedRows[slug]?.last_name || '',
        }))

    console.log('Selected Items:', selectedItems)

    modal.open(DeleteDialog, {
        name: 'DeleteDialog',
        loading: false,
        selectedItems,
        description: 'Please confirm you would like to remove the following from you candidate database:',
        title: 'Remove candidates?',
        onConfirm: () => {
            modal.hide('hide')
        },
    })
}

const campaignsFilter = computed(() => {
    if (!props.selectedRows || typeof props.selectedRows !== 'object')
        return []

    const selectedSlugs = Object.keys(props.selectedRows).filter(slug => props.selectedRows[slug])
    return selectedSlugs.reduce((acc, slug) => {
        const campaigns = props.data.find(item => item.slug === slug)
        if (campaigns && campaigns.campaigns) {
            campaigns.campaigns.forEach((campaign: any) => {
                if (!acc.includes(campaign)) {
                    acc.push(campaign)
                }
            })
        }
        return acc
    }, [] as number[])
})

const selectedCampaigns = ref<number[]>([])

const selectedCampaignsComputed = computed({
    get: () => selectedCampaigns.value.filter(campaign => campaignsFilter.value.includes(campaign)),
    set: (value: number[]) => {
        selectedCampaigns.value = value
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
        v-if="Object.keys(props.selectedRows).some(slug => props.selectedRows[slug])"
        class="actions px-4 py-2.5 flex items-center justify-end w-full gap-4 border-background-badge-gray border-b"
    >
        <Button
            variant="tertiary"
            class="button min-w-[131px] !bg-background-surface-destructive-accent/10 !text-background-badge-red-accent !rounded-[10px] !shadow-none"
            @click="openModal"
        >
            <div class="flex items-center gap-1">
                <Icon name="ri:user-unfollow-line" class="w-5 h-5" />
                <p>
                    Delete Row
                </p>
            </div>
        </Button>
        <CampaignsDropDownMenu
            :campaigns="campaignsFilter" :selected-campaigns="selectedCampaigns"
            @toggle-campaign="toggleCampaignSelection"
        />
    </div>
</template>
