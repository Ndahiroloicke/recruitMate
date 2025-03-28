<script setup lang="ts">
import CampaignsTableHead from './Head.vue'
import CampaignsTableRow from './Row.vue'

defineProps<{
    isAllSelected: boolean
    toggleAllSelected: () => void
    toggleRowSelection: (slug: string) => void
    data: any[]
    selectedRows: any
}>()
</script>

<template>
    <Table>
        <CampaignsTableHead :is-all-selected="isAllSelected" @toggle-all-selected="toggleAllSelected" />
        <CampaignsTableRow :data="data" :selected-rows="selectedRows" @toggle-row-selection="toggleRowSelection" />
    </Table>
</template>

<style lang="postcss" scoped>
.button {
    @apply !shadow-none !rounded-[12px]
}

@media (max-width: 640px) {
    .button {
        @apply w-full;
    }
}
</style>
