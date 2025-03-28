<script setup lang="ts">
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

const { rows = 5 } = defineProps<{
    rows?: number
}>()
</script>

<template>
    <div class="flex flex-col gap-1">
        <Skeleton v-for="row in rows" :key="row" class="h-36 w-full" />
    </div>
</template>
