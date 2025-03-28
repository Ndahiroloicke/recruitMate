<script setup lang="ts">
import { useCampaigns } from '~/store/campaigns'
import Dialog from '../Dialog.vue'
import StatusDropDown from './StatusDropDown.vue'

const modal = useModal()
const campaignsStore = useCampaigns()

const campaignRefresh = inject('campaignRefresh')

async function handleDelete() {
    try {
        const ids = campaignsStore.selectedRows.map(row => row.id)

        const { status, error } = await useFetch('/api/campaign/bulk', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids }),
        })

        if (status.value === 'success') {
            await campaignRefresh()
        }
        else {
            console.error('Error deleting campaigns:', error.value || 'Unknown error')
        }
    }
    catch (err) {
        console.error('Unexpected error:', err)
    }
}

function openDeleteModal() {
    modal.open(Dialog, {
        name: 'DeleteDialog',
        loading: false,
        selectedItems: campaignsStore.selectedRows,
        description: 'Please confirm you would like to remove the following from your campaigns database:',
        title: 'Remove campaigns?',
        onConfirm: () => handleDelete(),
    })
}
</script>

<template>
    <div class="actions flex justify-end items-center w-full gap-4 mt-4 mb-4 sm:mb-0 sm:mt-0">
        <Button
            variant="destructiveTertiary"
            class="w-full md:w-fit"
            :disabled="campaignsStore.selectedRows.length === 0"
            @click="openDeleteModal"
        >
            <div class="flex items-center gap-1">
                <Icon name="ri:user-unfollow-line" class="w-5 h-5" />
                <p>
                    Delete Row
                </p>
            </div>
        </Button>
        <StatusDropDown class="!w-full md:!w-fit" :selected-campaigns="campaignsStore.selectedRows" />
    </div>
</template>
