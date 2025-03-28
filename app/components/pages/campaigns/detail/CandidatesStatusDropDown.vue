<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { computed, ref } from 'vue'
import {
    CampaignStatus,
    CampaignStatusTranslation,
} from '~/types/campaign/status'

const props = defineProps<{
    campaigns: number[]
}>()

const emit = defineEmits(['update:campaigns'])

const selectedCampaigns = ref<number[]>([...props.campaigns])

function toggleSelection(status: number) {
    if (selectedCampaigns.value.includes(status)) {
        selectedCampaigns.value = selectedCampaigns.value.filter(c => c !== status)
    }
    else {
        selectedCampaigns.value.push(status)
    }
}

const campaignOptions = computed(() => {
    return Object.keys(CampaignStatus)
        .filter(key => isNaN(Number(key)))
        .map(key => ({
            key,
            status: CampaignStatus[key as keyof typeof CampaignStatus],
            translation: CampaignStatusTranslation[key as keyof typeof CampaignStatusTranslation],
        }))
})
</script>

<template>
    <DropdownMenu class="rounded-[10px]">
        <DropdownMenuTrigger as-child>
            <Button variant="secondary" class="min-w-[153px] !rounded-[10px] !shadow-none">
                <div class="flex items-center gap-1">
                    <p>Edit Campaign</p>
                    <Icon name="ri:arrow-down-s-line" class="w-5 h-5 text-text-secondary/60" />
                </div>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56 max-h-[260px] overflow-y-auto">
            <DropdownMenuGroup class="flex flex-col gap-1">
                <div
                    v-for="option in campaignOptions" :key="option.status"
                    class="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer" :class="[
                        selectedCampaigns.includes(option.status) ? 'bg-background-overlay-active-normal' : 'bg-white',
                    ]" @click="toggleSelection(option.status)"
                >
                    <Checkbox :checked="selectedCampaigns.includes(option.status)" />
                    <span class="text-captionM">{{ option.translation }}</span>
                </div>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
