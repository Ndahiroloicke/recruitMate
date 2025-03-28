<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { computed, ref } from 'vue'
import { useCampaigns } from '~/store/campaigns'
import Dialog from '../Dialog.vue'

const props = defineProps<{
    class?: string
}>()

const campaignRefresh = inject('campaignRefresh')
const modal = useModal()

const isOpen = ref(false)
const selectedStatus = ref<string | undefined>(undefined)
const campaignsStore = useCampaigns()

const campaignOptions = computed(() => {
    const filteredStatuses = [
        'Running',
        'Draft',
    ]
    return filteredStatuses.map(status => ({
        status,
        translation: status,
    }))
})

function toggleSelection(status: any) {
    selectedStatus.value = selectedStatus.value === status ? null : status
}

async function handleUpdate() {
    try {
        const ids = campaignsStore.selectedRows.map(row => row.id)

        const { status, error } = await useFetch('/api/campaign/bulk', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids, status: selectedStatus.value.toLowerCase() }),
        })

        if (status.value === 'success') {
            await campaignRefresh()
            isOpen.value = false // Close the dropdown after successful update
        }
        else {
            console.error('Error deleting campaigns:', error.value || 'Unknown error')
        }
    }
    catch (err) {
        console.error('Unexpected error:', err)
    }
}

function openUpdateModal() {
    modal.open(Dialog, {
        name: 'UpdateDialog',
        loading: false,
        selectedItems: campaignsStore.selectedRows,
        description: 'Please confirm you would like to update the following from your campaigns database:',
        title: 'Update campaigns?',
        onConfirm: () => handleUpdate(),
    })
}
</script>

<template>
    <DropdownMenu v-model:open="isOpen">
        <DropdownMenuTrigger as-child>
            <Button class="rounded-xl !shadow-none" :class="[props.class]" variant="secondary">
                <div class="flex items-center gap-1">
                    Status
                    <Icon name="ri:arrow-down-s-line" class="w-5 h-5 text-text-secondary/60" />
                </div>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="max-h-64 overflow-y-auto rounded-xl" align="end">
            <DropdownMenuGroup class="flex flex-col gap-1">
                <div
                    v-for="option in campaignOptions" :key="option.status"
                    class="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer" :class="[
                        selectedStatus === option.status ? 'bg-background-overlay-active-normal' : 'bg-white',
                    ]" @click="toggleSelection(option.status)"
                >
                    <Checkbox :checked="selectedStatus === option.status" />
                    <span class="text-captionM">{{ option.translation }}</span>
                </div>
                <div class="w-full">
                    <Button
                        variant="secondary"
                        class="md:w-fit"
                        size="sm"
                        :disabled="!campaignsStore.selectedRows.length || !selectedStatus"
                        @click="openUpdateModal"
                    >
                        <div class="flex w-24 justify-center items-center gap-1">
                            <Icon name="ri:check-fill" class="w-5 h-5" />
                            <p>
                                Apply
                            </p>
                        </div>
                    </Button>
                </div>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
