<script lang="tsx">

</script>

<template>
    <div class="avatarGroup">
        <div class="avatarGroup_item">
            <Skeleton class="avatarGroup_skeleton" />
        </div>
        <div class="avatarGroup_item">
            <Skeleton class="avatarGroup_skeleton" />
        </div>
        <div class="avatarGroup_item">
            <Skeleton class="avatarGroup_skeleton" />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.avatarGroup {
    @apply flex -space-x-2;

    &_item {
        @apply flex -space-x-4 overflow-hidden border-2 border-white rounded-full;
    }

    &_skeleton {
        @apply w-5 h-5 rounded-full;
    }
}
</style>
