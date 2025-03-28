<script setup lang="ts">
const props = defineProps<{
    onClick: () => void
}>()

function onClick() {
    props.onClick()
}
</script>

<template>
    <Button variant="link" class="!text-background-accent-blue-accent" @click="onClick">
        Edit <Icon name="ri:arrow-right-line" />
    </Button>
</template>
