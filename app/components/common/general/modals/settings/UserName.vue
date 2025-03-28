<script setup lang="ts">
import type { GlobalModal } from '~/types/modal'
import { defineProps } from 'vue'
import Label from '~/components/ui/label/Label.vue'

interface Props extends GlobalModal {
    data: any
}
defineOptions({ inheritAttrs: false })

const props = defineProps<Props>()

console.log(props.data)
</script>

<template>
    <div class="username">
        <div class="username__header">
            <div class="username__title">
                User Name
            </div>
            <div class="username__description">
                The official user name of your.
            </div>
        </div>
        <div class="username__body">
            <div class="username__field">
                <Label for="user-name" class="username__label">
                    User Name
                </Label>
                <Input
                    id="user-name"
                    :default-value="props.data"
                    read-only
                />
            </div>
        </div>
        <div class="username__button-container">
            <Button class="username__button" type="button" variant="primary">
                Save Changes
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.username {
    @apply p-6;

    &__header {
        @apply mb-3 !text-start;
    }

    &__title {
        @apply text-bodyL font-medium;
    }

    &__description {
        @apply text-captionM !text-text-sub-600;
    }

    &__body {
        @apply flex items-center mt-6;
    }

    &__field {
        @apply flex flex-col w-full gap-2.5;
    }

    &__label {
        @apply text-captionL font-medium;
    }

    &__button-container {
        @apply mt-4;
    }

    &__button {
        @apply w-full;
    }
}
</style>
