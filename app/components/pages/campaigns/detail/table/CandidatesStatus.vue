<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { computed, ref, watch } from 'vue'
import { CampaignStatus, CampaignStatusColor, CampaignStatusHexColor, CampaignStatusTranslation } from '~/types/campaign/status'

const props = defineProps<{
    campaigns: number[]
    selected: number
}>()

const emit = defineEmits(['update:campaigns'])

const selectedCampaign = ref<number | null>(props.selected || null)

watch(() => props.selected, (newSelected) => {
    selectedCampaign.value = newSelected
})

function toggleSelection(status: number) {
    selectedCampaign.value = status
    emit('update:campaigns', status)
}

const campaignOptions = computed(() => {
    return Object.keys(CampaignStatus)
        .filter(key => Number.isNaN(Number(key)))
        .map(key => ({
            key,
            status: CampaignStatus[key as keyof typeof CampaignStatus],
            translation: CampaignStatusTranslation[key as keyof typeof CampaignStatusTranslation],
            color: CampaignStatusColor[key as keyof typeof CampaignStatusColor],
            hexColor: CampaignStatusHexColor[key as keyof typeof CampaignStatusHexColor],
        }))
})

const findCampaignOptions = computed(() => {
    return campaignOptions.value.find(option => option.status === selectedCampaign.value)
})
</script>

<template>
    <DropdownMenu class="candidatesStatus_dropDown">
        <DropdownMenuTrigger as-child>
            <Badge color="blue" class="candidatesStatus_dropDown_selectBadge" :class="findCampaignOptions?.color">
                {{ findCampaignOptions ? findCampaignOptions.translation : 'Select Campaign' }}
                <Icon name="ri:arrow-down-s-line" class="w-5 h-5 ml-1" :style="{ color: findCampaignOptions?.hexColor }" />
            </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="candidatesStatus_dropDown_content">
            <DropdownMenuGroup class="candidatesStatus_dropDown_group">
                <div
                    v-for="option in campaignOptions" :key="option.status" class="candidatesStatus_dropDown_group_item"
                    @click="toggleSelection(option.status)"
                >
                    <Icon name="icon-park-outline:dot" :style="{ color: option.hexColor }" />
                    <span class="w-full min-w-44">{{ option.translation }}</span>
                    <Icon
                        v-if="selectedCampaign === option.status" name="ri:check-fill"
                        class="candidatesStatus_dropDown_group_checkIcon"
                    />
                </div>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style lang="postcss" scoped>
.candidatesStatus_dropDown {
    &_selectBadge {
        @apply !rounded-md border-none !shadow-none px-1.5 py-0.5 select-none cursor-pointer text-nowrap
    }

    &_content {
        @apply w-56 max-h-[260px] overflow-y-auto rounded-xl;
    }

    &_group {
        @apply flex flex-col gap-1 min-w-56;

        &_item {
            @apply flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer;
        }

        &_checkIcon {
            @apply w-5 h-5;
        }
    }
}
</style>
