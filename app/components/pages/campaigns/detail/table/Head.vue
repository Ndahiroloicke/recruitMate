<script setup lang="ts">
const props = defineProps({
    isAllSelected: Boolean,
})
defineEmits(['toggleAllSelected'])
</script>

<template>
    <TableHeader>
        <TableRow>
            <TableHead class="talentName">
                <Checkbox :checked="props.isAllSelected" @update:checked="$emit('toggleAllSelected')" />
                Talent Name
            </TableHead>
            <TableHead class="candidate">
                Candidate Status
            </TableHead>
            <TableHead class="companyAndSince">
                Company
            </TableHead>
            <TableHead class="view" />
        </TableRow>
    </TableHeader>
</template>

<style lang="postcss" scoped>
.candidate {
    @apply text-end max-w-[180px] hidden sm:table-cell;
}

.companyAndSince {
    @apply text-end max-w-[180px] hidden sm:table-cell;
}

.talentName {
    @apply max-w-[432px] flex items-center gap-3;
}

.view {
    @apply text-end max-w-[180px] sm:max-w-fit;
}
</style>
