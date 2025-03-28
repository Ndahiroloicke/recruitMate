<script setup lang="ts">
import Divider from '~/components/common/general/Divider.vue'
import TeamDescription from '~/components/common/general/modals/settings/TeamDescription.vue'
import TeamName from '~/components/common/general/modals/settings/TeamName.vue'

const modal = useModal()

function openModal(component: any) {
    modal.open(component)
}
</script>

<template>
    <div class="settings-general clamp">
        <div class="settings-general__item">
            <div class="settings-general__col">
                <span class="settings-general__title">Upload Logo</span>
                <span class="settings-general__description">
                    Min 400x400px, PNG or JPEG formats.
                </span>
            </div>
            <div>
                <CommonApplicationAvatarUpdate
                    class="settings-general__action"
                    :is-show-update-button="true"
                    default-image="/images/Avatar.svg"
                />
            </div>
        </div>
        <Divider />
        <div class="settings-general__item">
            <div class="settings-general__col">
                <span class="settings-general__title">Name</span>
                <span class="settings-general__description">
                    The official legal name of your company.
                </span>
            </div>
            <div class="settings-general__col">
                <span class="text-captionL font-normal leading-5 tracking-[-0.1]">
                    Binessto, Inc.
                </span>
                <Button size="sm" variant="link" class="settings-general__button" @click="openModal(TeamName)">
                    <span>Edit</span>
                    <Icon name="ri:arrow-right-s-line" />
                </Button>
            </div>
        </div>
        <Divider />

        <div class="settings-general__item">
            <div class="settings-general__col">
                <span class="settings-general__title">Description</span>
                <span class="settings-general__description">
                    Description of your team.
                </span>
            </div>
            <div class="settings-general__col">
                <span class="text-captionL font-normal leading-5 tracking-[-0.1]">
                    This is a team for testing.
                </span>
                <Button size="sm" variant="link" class="settings-general__button" @click="openModal(TeamDescription)">
                    <span>Edit</span>
                    <Icon name="ri:arrow-right-s-line" />
                </Button>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.settings-general {
    @apply grid grid-cols-1 px-6 sm:px-4;

    &__item {
        @apply grid grid-cols-1 md:grid-cols-2 items-center py-5 max-md:gap-6;
    }

    &__col {
        @apply flex flex-col max-w-[350px] gap-1;
    }

    &__title {
        @apply text-captionL font-medium;
    }

    &__description {
        @apply text-captionM font-normal text-text-sub-600;
    }

    &__button {
        @apply !text-left inline-flex max-w-max !p-0 !text-text-blue-accent;
    }
    &__action{
        @apply flex items-center
    }
}
</style>
