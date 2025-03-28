<script setup lang="ts">
const router = useRouter()
</script>

<template>
    <CommonGeneralBackground class="policy">
        <Button class="mr-auto group" variant="secondary" @click="router.push(`/onboarding`)">
            <Icon name="ri:arrow-left-line" class="size-5 text-text-secondary group-hover:text-text-primary" />
        </Button>
        <NuxtPage class="content" />
    </CommonGeneralBackground>
</template>

<style lang="postcss" scoped>
.policy {
    @apply max-w-4xl px-4 mx-auto py-12 flex flex-col gap-4;

    .content {
        @apply w-full max-w-4xl;
    }
}
</style>
