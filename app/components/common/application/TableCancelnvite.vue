<script setup lang="ts">
const props = defineProps<{
    onClick: () => void
}>()

function onClick() {
    props.onClick()
}
</script>

<template>
    <Button variant="link" class="table-cancel-invite" @click="onClick">
        Cancel Invite <Icon class="table-cancel-invite__icon" name="ri:close-line" />
    </Button>
</template>

<style lang="postcss">
.table-cancel-invite {
    @apply !text-[#E6483D];

    &__icon {
        @apply -translate-x-1 translate-y-0;
    }
}
</style>
