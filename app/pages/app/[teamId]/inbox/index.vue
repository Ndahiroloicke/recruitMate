<script setup lang="ts">

</script>

<template>
    <div class="notfound">
        <CommonGeneralNotFound
            class="notfound__content"
            title="Select a candidate to start chatting"
            description="You have no messages at the moment. Start a new conversation to see messages here."
        >
            <template #image>
                <NuxtImg
                    class="notfound__content__image"
                    src="/images/notfound_default_image.svg"
                    alt="Not Found Image"
                />
            </template>
        </CommonGeneralNotFound>
    </div>
</template>

<style lang="postcss" scoped>
.notfound {
    @apply flex items-center justify-center mx-auto;

    &__content {
        @apply h-[50vh];

        &__image {
            @apply w-[550px];
        }
    }
}
</style>
