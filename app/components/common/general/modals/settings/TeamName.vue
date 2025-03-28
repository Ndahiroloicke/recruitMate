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
    <div class="team_name">
        <div class="team_name__header">
            <div class="team_name__title">
                Team Name
            </div>
            <div class="team_name__description">
                The name of your team.
            </div>
        </div>
        <div class="team_name__body">
            <div class="team_name__field">
                <Label for="team-name" class="team_name__label">
                    Name
                </Label>
                <Input
                    id="team-name"
                    :default-value="props.data"
                    read-only
                />
            </div>
        </div>
        <div class="team_name__button-container">
            <Button class="team_name__button" type="button" variant="primary">
                Save Changes
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.team_name {
    @apply p-6;

    &__header {
        @apply mb-4 !text-start;
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
