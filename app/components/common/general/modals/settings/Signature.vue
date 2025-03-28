<script setup lang="ts">
import type { GlobalModalEmits } from '~/types/modal'
import { defineProps } from 'vue'
import Label from '~/components/ui/label/Label.vue'
import Textarea from '~/components/ui/textarea/Textarea.vue'

interface Props {
    data: string
}

defineProps<Props>()
</script>

<template>
    <div class="signature">
        <div class="signature__header">
            <div class="signature__title">
                Signature
            </div>
            <div class="signature__description">
                The official email signature for billing and contact requests.
            </div>
        </div>
        <div class="signature__body">
            <div class="signature__field">
                <Label for="email-signature" class="signature__label">
                    Email Signature
                </Label>
                <Textarea
                    id="email-signature"
                    :default-value="data"
                    read-only
                />
            </div>
        </div>
        <div class="signature__button-container">
            <Button class="signature__button" type="button" variant="primary">
                Save Changes
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.signature {
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
