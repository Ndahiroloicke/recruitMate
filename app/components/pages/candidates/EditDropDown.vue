<script setup lang="ts">
import { useFetch } from '#app'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
    campaigns: number[]
    candidateIds: number[]
    refreshTable: () => void
    class?: any
}>()

const { data: campaignData } = await useFetch('/api/campaign', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})

const selectedCampaigns = ref<number[]>([...props.campaigns])
const tempSelectedCampaigns = ref<number[]>([...selectedCampaigns.value])

function toggleSelection(status: number) {
    if (tempSelectedCampaigns.value.includes(status)) {
        tempSelectedCampaigns.value = tempSelectedCampaigns.value.filter(c => c !== status)
    }
    else {
        tempSelectedCampaigns.value.push(status)
    }
}

async function updateCampaigns() {
    const { error, refresh } = await useFetch('/api/candidates/bulk', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ids: props.candidateIds.map(id => id),
            campaign_ids: selectedCampaigns.value,
        }),
    })

    if (!error.value) {
        refresh()
        props.refreshTable()
    }
    else {
        console.error(error.value)
    }
}

function applySelection() {
    selectedCampaigns.value = [...tempSelectedCampaigns.value]
    updateCampaigns()
}

function cancelSelection() {
    tempSelectedCampaigns.value = [...selectedCampaigns.value]
}

const campaignOptions = computed(() => {
    if (!campaignData.value || !Array.isArray(campaignData.value.data))
        return []

    return campaignData.value.data.map((campaign: { id: number, name: string }) => ({
        key: campaign.id,
        status: campaign.id,
        translation: campaign.name,
    }))
})
</script>

<template>
    <DropdownMenu class="rounded-[10px]">
        <DropdownMenuTrigger as-child>
            <Button variant="secondary" :class="[props.class]" class="min-w-[153px] !rounded-[10px] !shadow-none">
                <div class="flex items-center gap-1">
                    <p>Edit Campaign</p>
                    <Icon name="ri:arrow-down-s-line" class="w-5 h-5 text-text-secondary/60" />
                </div>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-auto overflow-y-auto p-2">
            <DropdownMenuGroup class="flex flex-col gap-1">
                <div
                    v-for="option in campaignOptions"
                    :key="option.status"
                    class="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer"
                    :class="[
                        tempSelectedCampaigns.includes(option.status) ? 'bg-background-overlay-active-normal' : 'bg-white',
                    ]"
                    @click="toggleSelection(option.status)"
                >
                    <Checkbox :checked="tempSelectedCampaigns.includes(option.status)" />
                    <span class="text-captionM">{{ option.translation }}</span>
                </div>
            </DropdownMenuGroup>
            <div class=" gap-2 mt-2 pt-2 border-t">
                <Button size="xs" variant="primary" class="w-full" @click="applySelection">
                    Apply
                </Button>
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
