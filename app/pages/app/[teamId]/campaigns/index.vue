<script setup lang="ts">
import { useFetch } from '#app'
import PagesCampaignsListContainer from '@/components/pages/campaigns/list/index.vue'
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCampaigns } from '~/store/campaigns'

const router = useRouter()
const route = useRoute()
const store = useCampaigns()

const { data, error, status, refresh } = useFetch('/api/campaign', {
    method: 'GET',
    params: computed(() => ({ teamId: route.params.teamId, direction: store.direction })),
    watch: false,
    lazy: true,
})

const campaigns = ref<any[]>([])

watch([() => route.params.teamId, () => store.direction], () => {
    if (status.value !== 'pending') {
        refresh()
    }
}, { immediate: true })

watchEffect(() => {
    if (status.value === 'success' && data.value?.data) {
        campaigns.value = data.value.data
    }
})

provide('campaignRefresh', refresh)

function handleNewCampaign() {
    router.push(`/app/:teamId/campaigns/create`)
}
</script>

<template>
    <CommonApplicationMainLayout
        class="campaignsPageContent" title="All Campaigns"
        description="View and manage all the campaigns you’ve created!"
    >
        <template #actions>
            <div class="campaignsPageContent_actions">
                <Button variant="secondary" class="campaignsPageContent_newCampaignButton" @click="handleNewCampaign">
                    <Icon name="ri:add-line" class="campaignsPageContent_icon" />
                    New Campaign
                </Button>
            </div>
        </template>

        <template #main>
            <div v-if="error">
                <p class="text-red-500">
                    Error: {{ error }}
                </p>
            </div>

            <div v-else>
                <PagesCampaignsListContainer :key="campaigns.length" :pending="status === 'pending'" :data="campaigns" />
            </div>
        </template>
    </CommonApplicationMainLayout>
</template>

<style lang="postcss" scoped>
.campaignsPageContent {
    &_actions {
        @apply w-full flex gap-2;
    }

    &_filterButton {
        @apply w-fit text-text-secondary font-medium;
    }

    &_newCampaignButton {
        @apply w-full md:w-fit;
    }

    &_icon {
        @apply w-5 h-5 text-black/60;
    }
}
</style>
