<script lang="ts" setup>
interface Props {
    disabled?: boolean
}

const { disabled = false } = defineProps<Props>()
const route = useRoute()
</script>

<template>
    <NuxtLink :to="disabled ? route.path : '/app'" class="header__logo-link">
        <img class="header__logo" src="/images/logo.svg" alt="RecruitMate">
    </NuxtLink>
</template>

<style lang="postcss" scoped>
.logo {
    @apply flex h-full flex-shrink-0 items-center;

    img {
        @apply block h-8 w-auto;
    }
}
</style>
