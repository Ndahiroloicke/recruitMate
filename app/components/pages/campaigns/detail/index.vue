<script setup lang="ts">
import CampaignsActions from './Actions.vue'
import CampaignsFilter from './Filter.vue'
import NotFoundComponent from './NotFound.vue'
import CampaignsTable from './table/Container.vue'

interface Props {
    data: any[]
}

const { data } = defineProps<Props>()
const isLoading = ref<boolean>(false)

const selectedRows = reactive<Record<string, boolean>>({})

const value = ref<string>('')
function toggleRowSelection(slug: string) {
    if (selectedRows[slug]) {
        delete selectedRows[slug]
    }
    else {
        selectedRows[slug] = true
    }
    console.log(selectedRows)
}

const isAllSelected = computed(() => {
    return data.length > 0 && data.every(candidate => selectedRows[candidate.slug])
})

function toggleAllSelected() {
    const newState = !isAllSelected.value
    if (!newState) {
        for (const candidate of data) {
            delete selectedRows[candidate.slug]
        }
    }
    else {
        data.forEach((candidate) => {
            selectedRows[candidate.slug] = newState
        })
    }
}

const hasData = computed(() => data.length > 0)
const showNotFound = computed(() => !isLoading.value && data.length === 0)
const showActions = computed(() => !isLoading.value && data.length > 0)
const showFilter = computed(() => data.length > 0)
const showTable = computed(() => !isLoading.value && data.length > 0)
</script>

<template>
    <div class="CampaignsDetailContainer" :class="{ 'border-x': hasData }">
        <NotFoundComponent v-if="showNotFound" />
        <CampaignsActions v-if="showActions" :data="data" :selected-rows="selectedRows" />
        <CampaignsFilter v-if="showFilter" v-model="value" />
        <SkeletonCampaignDetailTable v-if="!showTable" />

        <CampaignsTable
            v-if="showTable" :data="data" :selected-rows="selectedRows"
            :toggle-row-selection="toggleRowSelection" :is-all-selected="isAllSelected"
            :toggle-all-selected="toggleAllSelected"
        />
    </div>
</template>

<style lang="postcss" scoped>
.CampaignsDetailContainer {
    @apply border-border-base-divider;
}
</style>
