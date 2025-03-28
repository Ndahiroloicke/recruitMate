<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCampaigns } from '~/store/campaigns'
import { useTeams } from '~/store/teams'

defineProps<{
    isAllSelected: boolean
    toggleAllSelected: () => void
    toggleRowSelection: (id: string) => void
    data: any[]
}>()

const campaignsStore = useCampaigns()
const router = useRouter()

function handleClickCard(item: any) {
    if (campaignsStore.isEdited) {
        campaignsStore.addSelectedRow(item)
    }
    else {
        router.push(`/app/:teamId/campaigns/${item.id}`)
    }
}
</script>

<template>
    <div class="campaignsListTableContainer">
        <div v-for="item in data" :key="item.id">
            <CommonApplicationInfoCard :handle-click="handleClickCard" :item="item" />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.campaignsListTableContainer {
    @apply w-full flex flex-col gap-4 mt-6
}
</style>
