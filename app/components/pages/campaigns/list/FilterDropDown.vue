<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { computed } from 'vue'
import { useCampaigns } from '~/store/campaigns'

const store = useCampaigns()

const currentDirection = computed(() => store.direction)

function toggleDirection() {
    store.setDirection(currentDirection.value === 'asc' ? 'desc' : 'asc')
}
</script>

<template>
    <Button
        variant="secondary"
        class="filterDropDown_sortButton"
        @click="toggleDirection"
    >
        <Icon
            :name="currentDirection === 'asc' ? 'ri:sort-asc' : 'ri:sort-desc'"
            class="filterDropDown_seconadryIcon"
        />
    </Button>
</template>

<style lang="postcss" scoped>
.filterDropDown {
    &_seconadryIcon {
        @apply w-5 h-5 text-black/60;
    }

    &_sortButtonText {
        @apply hidden sm:block;
    }

    &_sortButton {
        @apply min-h-10  min-w-fit ;
    }
}
</style>
