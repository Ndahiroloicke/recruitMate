<script setup lang="ts">
import Label from '~/components/ui/label/Label.vue'
</script>

<template>
    <div class="balance">
        <div class="balance__header">
            <div class="balance__title">
                Balance
            </div>
            <div class="balance__description">
                Get alerts if your balance drops below the number you set.
            </div>
        </div>
        <div class="balance__body">
            <div class="balance__field">
                <Label for="balance" class="balance__label">
                    Balance
                </Label>
                <Input
                    id="balance"
                    default-value="$1,000.00"
                    read-only
                />
            </div>
        </div>
        <div class="balance__button-container">
            <Button class="balance__button" type="button" variant="primary">
                Save Changes
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.balance {
    @apply  p-6;

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
