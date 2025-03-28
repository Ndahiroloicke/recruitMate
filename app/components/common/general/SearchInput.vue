<script lang="ts" setup>
defineProps<{
    placeholder?: string
}>()
</script>

<template>
    <div class="search">
        <Input
            class="search__input"
            type="text"
            :placeholder="placeholder || 'Search'"
        />
        <span class="search__icon">
            <Icon class="search__icon-inner" name="ri:search-line" />
        </span>
    </div>
</template>

<style lang="postcss" scoped>
.search {
    @apply relative w-full items-center;
}

.search__input {
    @apply shadow-none pl-7 w-full;
}

.search__icon {
    @apply absolute start-0 inset-y-0 flex items-center justify-center px-2;
}

.search__icon-inner {
    @apply text-text-secondary;
}
</style>
