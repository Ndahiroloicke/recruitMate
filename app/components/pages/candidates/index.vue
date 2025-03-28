<script setup lang="ts">
import type { Column } from '~/components/common/general/Table.vue'
import type { ICandidateResponse } from '~/types/candidates/reponse'
import CandidatesActions from './actions.vue'
import CandidateTableSheet from './DetailSheet.vue'
import CandidatesFilter from './filter.vue'
import CandidateInfo from './table/CandidateInfo.vue'
import CompanyInfo from './table/CompanyInfo.vue'

const { data: response, error, pending, refresh } = await useFetch('/api/candidates', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})

const campaignDetailResponse = ref<ICandidateResponse[]>([])
watchEffect(() => {
    if (!response.value?.data) {
        campaignDetailResponse.value = []
        return
    }

    campaignDetailResponse.value = response.value.data.map((item: any) => ({
        id: item.id,
        first_name: item.first_name ?? '',
        last_name: item.last_name ?? '',
        position: item.position ?? '',
        companyInfo: {
            company: item.companyInfo?.company ?? '-',
            years: item.companyInfo?.years ?? '-',
        },
        avatar: item.avatar ?? '',
        startSince: item.startSince ?? 0,
        endSince: item.endSince ?? 0,
        campaigns: item.campaigns ?? [],
    }))
})

const value = ref<string>('')
const selectedCandidates = ref<number[]>([])
function refreshTable() {
    refresh()
    selectedCandidates.value = []
}

const columns: Column<ICandidateResponse>[] = [
    {
        key: 'first_name',
        label: 'Talent Name',
        class: 'w-[40%]',
        row: item => h(CandidateInfo, { item, isLoading: false }),
    },
    {
        key: 'campaigns',
        label: '',
        class: 'w-[20%]',
        hiddenOn: 'sm',
        row: () => 'test',
    },
    {
        key: 'companyInfo',
        label: 'Company',
        class: 'w-[30%] ',
        hiddenOn: 'sm',
        row: item => h(CompanyInfo, { item: { ...item?.companyInfo, startSince: item?.startSince, endSince: item?.endSince }, isLoading: false }),
    },
    {
        key: 'id',
        label: '',
        class: 'w-[10%]',
        align: 'right',
        row: item => h(CandidateTableSheet, { id: item.id }),
    },
]
</script>

<template>
    <PagesCampaignsDetailNotFound v-if=" campaignDetailResponse?.length === 0" />
    <div v-else class="border-border-base-divider border-x">
        <CandidatesActions v-model="selectedCandidates" :data="campaignDetailResponse" :refresh-table="refreshTable" />
        <CandidatesFilter v-model="value" />

        <div v-if="error">
            <p class="text-red-500">
                Error: {{ error }}
            </p>
        </div>

        <CommonGeneralTable
            v-else-if="!pending && (campaignDetailResponse?.length ?? 0) > 0" v-model="selectedCandidates"
            :columns="columns" :data="campaignDetailResponse" selectable
        />
    </div>
</template>
