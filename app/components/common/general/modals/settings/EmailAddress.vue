<script setup lang="ts">
import type { GlobalModal } from '~/types/modal'
import { defineProps } from 'vue'
import Label from '~/components/ui/label/Label.vue'

interface Props extends GlobalModal {
    data: any
}
defineOptions({ inheritAttrs: false })
const props = defineProps<Props>()
</script>

<template>
    <div class="emailaddress">
        <div class="emailaddress__header">
            <div class="emailaddress__title">
                Email Address
            </div>
            <div class="emailaddress__description">
                The official email address for billings and contact requests.
            </div>
        </div>
        <div class="emailaddress__body">
            <div class="emailaddress__field">
                <Label for="email-address" class="emailaddress__label">
                    Email Address
                </Label>
                <Input
                    id="email-address"
                    :default-value="props.data"
                    read-only
                />
            </div>
        </div>
        <div class="emailaddress__button-container">
            <Button class="emailaddress__button" type="button" variant="primary">
                Save Changes
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.emailaddress {
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
