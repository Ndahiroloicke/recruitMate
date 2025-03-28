<script setup lang="ts">
import { defineProps } from 'vue'
import DropDownInput from '~/components/ui/dropdown-input/DropdownInput.vue'
import Label from '~/components/ui/label/Label.vue'

interface Props {
    options: Array<{ label: string, value: string }>
    value: string
}

defineProps<Props>()
</script>

<template>
    <div class="phonenumber">
        <div class="phonenumber__header">
            <div class="phonenumber__title">
                Phone Number
            </div>
            <div class="phonenumber__description">
                The official phone number for billing and contact requests.
            </div>
        </div>
        <div class="phonenumber__body">
            <div class="phonenumber__field">
                <Label for="phone-number" class="phonenumber__label">
                    Phone Number
                </Label>
                <DropDownInput
                    id="phone-number"
                    :options="options"
                    :value="value"
                    class="phonenumber__input"
                />
            </div>
        </div>
        <div class="phonenumber__button-container">
            <Button class="phonenumber__button" type="button" variant="primary">
                Save Changes
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.phonenumber {
    @apply p-6;

    &__header {
        @apply mb-3 !text-start;
    }

    &__title {
        @apply text-bodyL font-medium;
    }
    &____input{
        @apply !bg-white
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
