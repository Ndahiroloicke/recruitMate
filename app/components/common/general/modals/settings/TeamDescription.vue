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
    <div class="team_description">
        <div class="team_description__header">
            <div class="team_description__title">
                Team Description
            </div>
            <div class="team_description__description">
                The description of your team.
            </div>
        </div>
        <div class="team_description__body">
            <div class="team_description__field">
                <Label for="team-description" class="team_description__label">
                    Description
                </Label>
                <Input
                    id="team-description"
                    :default-value="props.data"
                    read-only
                />
            </div>
        </div>
        <div class="team_description__button-container">
            <Button class="team_description__button" type="button" variant="primary">
                Save Changes
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.team_description {
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
