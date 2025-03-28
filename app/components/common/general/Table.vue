<script setup lang="ts" generic="T">
import { computed } from 'vue'
import { Table as UITable } from '~/components/ui/table'

export interface Column<T> {
    key: keyof T
    label: string
    class?: string
    align?: string
    hiddenOn?: 'sm' | 'md' | 'lg' | 'xl'
    row?: (item: T) => string | VNode
}

interface Props<T> {
    columns: Column<T>[]
    data: T[]
    caption?: string
    selectable?: boolean
    isLoading?: boolean
}

const props = defineProps<Props<T>>()

const activeSelections = defineModel<number[]>({
    default: () => [],
})

const isAllSelected = computed({
    get: () => activeSelections.value.length > 0 && activeSelections.value.length === props.data.length,
    set: (value: boolean) => {
        activeSelections.value = value ? props.data.map((_, i) => i) : []
    },
})
</script>

<template>
    <UITable>
        <TableCaption v-if="caption">
            {{ caption }}
        </TableCaption>

        <TableHeader class="border-b">
            <TableRow>
                <TableHead v-if="selectable" class="w-[50px]">
                    <Checkbox v-model:checked="isAllSelected" />
                </TableHead>

                <TableHead
                    v-for="column in columns" :key="column.key.toString()"
                    :class="[column.class, column.hiddenOn ? `responsive ${column.hiddenOn}` : '']"
                >
                    {{ column.label }}
                </TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            <TableRow v-for="(item, index) in props.data" :key="index" :class="{ 'bg-background-accent-blue hover:bg-background-accent-blue': activeSelections.includes(index) }">
                <TableCell v-if="selectable" class="w-[50px]">
                    <Checkbox
                        :checked="activeSelections.includes(index)" @update:checked="value => {
                            if (value) {
                                activeSelections.push(index)
                            }
                            else {
                                const i = activeSelections.indexOf(index)
                                if (i > -1) {
                                    activeSelections.splice(i, 1)
                                }
                            }
                        }"
                    />
                </TableCell>

                <TableCell
                    v-for="column in columns" :key="column.key.toString()"
                    :class="[column.class, column.hiddenOn ? `responsive ${column.hiddenOn}` : '']"
                >
                    <template v-if="column.row">
                        <component :is="column.row(item)" />
                    </template>
                    <template v-else>
                        <SkeletonTableCell v-if="isLoading" />
                        <span v-else>{{ item[column.key] || '-' }}</span>
                    </template>
                </TableCell>
            </TableRow>
        </TableBody>
    </UITable>
</template>

<style lang="postcss" scoped>
.responsive {
    @apply table-cell;

    &.sm {
        @apply hidden sm:table-cell;
    }

    &.md {
        @apply hidden md:table-cell;
    }

    &.lg {
        @apply hidden lg:table-cell;
    }

    &.xl {
        @apply hidden xl:table-cell;
    }
}
</style>
