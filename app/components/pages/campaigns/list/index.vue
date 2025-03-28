<script setup lang="ts">
import CampaignsListTableFilter from './filter.vue'
import CampaignsNoData from './NotFound.vue'
import CampaignsListTableContainer from './table.vue'

interface Props {
    data: any[]
    pending: boolean
}

const { data } = defineProps<Props>()

const selectedRows = reactive<Record<string, boolean>>({})
const isActivedEdit = ref<boolean>(false)

const value = ref<string>('')

function toggleRowSelection(slug: string) {
    console.log(selectedRows)
    if (selectedRows[slug]) {
        delete selectedRows[slug]
    }
    else {
        selectedRows[slug] = true
    }
}

const isAllSelected = computed(() => {
    return data.every(candidate => selectedRows[candidate.slug])
})

function toggleAllSelected() {
    const newState = !isAllSelected.value
    console.log(selectedRows)
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
</script>

<template>
    <div class="my-6 px-6 sm:px-0">
        <CampaignsListTableFilter v-if="data?.length > 0 " ref="isActivedEdit" v-model:model-value="value" :data="data" />
        <SkeletonCampaignInfoCard v-if="pending" />
        <CampaignsNoData v-if="data.length === 0 && !pending" />
        <CampaignsListTableContainer
            v-if="!pending && data?.length > 0" :is-editing="isActivedEdit" :data="data" :selected-rows="selectedRows"
            :toggle-row-selection="toggleRowSelection" :is-all-selected="isAllSelected"
            :toggle-all-selected="toggleAllSelected"
        />
    </div>
</template>
