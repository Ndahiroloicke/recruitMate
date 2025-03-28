<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        status: {
            type: String,
            required: true,
        },
    },
})
</script>

<template>
    <Badge :color="status === 'draft' ? 'gray' : 'green' " class="campaignStatus">
        {{ status.charAt(0).toUpperCase() + status.slice(1) }}
    </Badge>
</template>

<style lang="postcss" scoped>
.campaignStatus {
    @apply text-bodyS font-medium leading-5 p-2.5 rounded-lg py-1 border-none;
}
</style>
