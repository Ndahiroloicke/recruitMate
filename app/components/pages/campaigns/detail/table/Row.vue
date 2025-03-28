<script setup lang="ts">
import { calculateDateDifference } from '~/lib/formatTime'
import { useTeams } from '~/store/teams'
import CandidatesStatusDropDown from './CandidatesStatus.vue'

interface Props {
    data: any[]
    selectedRows: any
}

const props = defineProps<Props>()
const emit = defineEmits(['toggleRowSelection'])

const router = useRouter()

function handleRowSelection(slug: string) {
    emit('toggleRowSelection', slug)
}

function handleViewInbox(_slug: string) {
    router.push(`/app/:teamId/inbox`)
}

const campaignsFilter = computed(() => {
    if (!props.selectedRows || typeof props.selectedRows !== 'object')
        return []

    const selectedSlugs = Object.keys(props.selectedRows).filter(slug => props.selectedRows[slug])
    return selectedSlugs.reduce((acc, slug) => {
        const candidate = props.data.find(item => item.slug === slug)
        if (candidate && candidate.campaigns) {
            candidate.campaigns.forEach((campaign: any) => {
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
    <TableBody class="campaignsTable">
        <TableRow
            v-for="item in props.data" :key="item.slug"
            :class="{ 'bg-background-accent-blue': props.selectedRows[item.slug] }"
        >
            <TableCell class="flex items-center gap-3">
                <Checkbox :checked="props.selectedRows[item.slug]" @update:checked="handleRowSelection(item.slug)" />
                <div class="campaignsTable_talentInfo">
                    <Avatar size="lg" :src="item.avatar" />
                    <div class="flex flex-col gap-0.5">
                        <p class="campaignsTable_fullName">
                            <span v-if="item.name.length > 0">
                                {{ item.name }}
                            </span>
                            <span v-if="item.last_name.length > 0">
                                {{ item.last_name }}
                            </span>
                        </p>
                        <p class="campaignsTable_position">
                            {{ item.position }}
                        </p>
                    </div>
                </div>
            </TableCell>
            <TableCell class="campaignsTable_mobileHidden">
                <div class="campaignsTable_candidateStatus">
                    <div v-for="status in item.candidates" :key="status">
                        <CandidatesStatusDropDown
                            :campaigns="campaignsFilter" :selected="status"
                            @toggle-campaign="toggleCampaignSelection"
                        />
                    </div>
                </div>
            </TableCell>
            <TableCell class="campaignsTable_mobileHidden">
                <div class="campaignsTable_companyAndSince">
                    <p class="campaignsTable_company">
                        {{ item.company }}
                    </p>
                    <p class="campaignsTable_since">
                        {{ calculateDateDifference(item.startSince, item.endSince) }}
                    </p>
                </div>
            </TableCell>
            <TableCell>
                <div class="campaignsTable_detail" @click="handleViewInbox(item.slug)">
                    View Inbox
                    <Icon name="ri:arrow-right-line" class="campaignsTable_detailIcon" />
                </div>
            </TableCell>
        </TableRow>
    </TableBody>
</template>

<style lang="postcss" scoped>
.campaignsTable {
    @apply max-w-[100%];

    &_talentInfo {
        @apply max-w-[432px] flex items-center gap-3;
    }

    &_fullName {
        @apply font-medium text-text-primary text-captionL;
    }

    &_position {
        @apply text-secondary leading-4 opacity-60 text-captionM;
    }

    &_detail {
        @apply max-w-[220px] flex items-center w-full gap-[0.125rem] justify-end select-none cursor-pointer text-text-secondary font-medium text-captionM leading-5;
    }

    &_detailIcon {
        @apply w-5 h-5;
    }

    &_candidateStatus {
        @apply flex flex-row flex-wrap justify-end gap-3 max-w-48 min-w-full;
    }

    &_since {
        @apply text-text-secondary leading-3 text-captionM;
    }

    &_company {
        @apply text-text-primary leading-5 text-captionL;
    }

    &_companyAndSince {
        @apply flex flex-col gap-0.5 items-end max-w-[180px] text-end;
    }

    &_mobileHidden {
        @apply hidden sm:table-cell;
    }

    @media (max-width: 800px) {
        &_talentInfo {
            @apply max-w-full;
        }

        &_detail {
            @apply max-w-full;
        }
    }
}
</style>
