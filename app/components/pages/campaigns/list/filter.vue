<script setup lang="ts">
import { useCampaigns } from '~/store/campaigns'
import { useTeams } from '~/store/teams'
import CampaignsActions from './Actions.vue'
import FilterDropDown from './FilterDropDown.vue'

defineProps<{
    selectedRows?: Record<string, boolean>
    data: any[]
}>()

const modelValue = defineModel({
    default: '',
})

const input = useTemplateRef<any>('searchInput')
const { focused } = useFocus(input, { initialValue: false })

const router = useRouter()
const campaignsStore = useCampaigns()

function handleKeydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        focused.value = true
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
})

function handleCampaignsUpdate(selectedCampaigns: any) {
    console.log('Seçili Kampanyalar:', selectedCampaigns)
}

function handleSendMail() {
    router.push(`/app/:teamId/inbox`)
}

function handleEditClick() {
    campaignsStore.isEdited = !campaignsStore.isEdited
    if (!campaignsStore.isEdited) {
        campaignsStore.clearSelection()
    }
}
</script>

<template>
    <div class="sm:mb-6 mt-3" :class="{ 'flex mb-2 flex-col  sm:gap-6': campaignsStore.isEdited }">
        <div class="campaignsListFilter">
            <div class="campaignsListFilter_search">
                <Icon name="ri:search-line" class="campaignsListFilter_icon" />
                <Input
                    ref="searchInput" v-model="modelValue" placeholder="Search for campaign"
                    class="!rounded-none !border-none !text-text-primary !placeholder-text-text-tertiary h-[22px] px-0 focus:ring-2 focus:ring-transparent !text-captionL !shadow-none !focus:shadow-none !outline-none !focus:outline-none flex-1;"
                />
            </div>
            <div class="flex gap-3">
                <Button
                    :variant="campaignsStore.isEdited ? 'tertiary' : 'secondary'"
                    class="campaignsListFilter_secondaryButton" @click="handleEditClick"
                >
                    <Icon
                        :name="campaignsStore.isEdited ? 'material-symbols:close-rounded' : 'ri:edit-2-line'"
                        class="campaignsListFilter_seconadryIcon"
                    />
                    <span class="campaignsListFilter_editButtonText">
                        {{ campaignsStore.isEdited ? 'Cancel Edit' : 'Edit' }}
                    </span>
                </Button>

                <FilterDropDown @update:campaigns="handleCampaignsUpdate" />

                <Button
                    v-if="!campaignsStore.isEdited" variant="black" class="campaignsListFilter_sendMailButton"
                    @click="handleSendMail"
                >
                    <Icon name="ri:mail-check-line" class="campaignsListFilter_blackIcon" />
                    Send Mail
                    <Icon name="ri:arrow-right-line" class="w-5 h-5" />
                </Button>
            </div>
        </div>
        <div v-if="campaignsStore.isEdited">
            <CampaignsActions :data="data" :selected-rows="selectedRows" />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.campaignsListFilter {
    @apply flex items-center gap-3 sm:gap-12 justify-between;

    &_search {
        @apply flex gap-2 items-center px-3 py-2 text-text-tertiary border border-border-action-normal rounded-xl w-full;
    }

    &_editButtonText {
        @apply hidden sm:block
    }

    &_blackIcon {
        @apply w-5 h-5;
    }

    &_seconadryIcon {
        @apply w-5 h-5 text-black/60;
    }

    &_secondaryButton {
        @apply min-h-10 min-w-fit sm:min-w-[118.5px];
    }

    &_sendMailButton {
        @apply min-h-10 min-w-[118.5px] hidden sm:block;
    }
}
</style>
