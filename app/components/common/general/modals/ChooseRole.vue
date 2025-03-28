<script setup lang="ts">
import type { GlobalModal, GlobalModalEmits } from '~/types/modal'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface Props extends GlobalModal {
}

defineOptions({
    inheritAttrs: false,
})

defineProps<Props>()

const emit = defineEmits<GlobalModalEmits>()

const modelValue = defineModel({
    type: Boolean,
    default: false,
})
</script>

<template>
    <div no-padding class="dialog__content">
        <div class="dialog__header">
            <div class="dialog__user">
                <Avatar size="lg" initials="AB">
                    <NuxtImg src="/images/Avatar.svg" class="dialog__avatar-image" alt="Avatar Image" />
                </Avatar>
                <div class="dialog__user-info">
                    <p class="dialog__user-name">
                        Markin Crazy
                    </p>
                    <p class="dialog__user-email">
                        markincrazy@gmail.com
                    </p>
                </div>
            </div>
        </div>
        <div class="dialog__body">
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="m@example.com">
                            Member
                        </SelectItem>
                        <SelectItem value="m@google.com">
                            Manager
                        </SelectItem>
                        <SelectItem value="m@support.com">
                            Admin
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div class="dialog__footer">
            <div as-child>
                <Button class="dialog__button-remove" variant="secondary">
                    Remove Member
                </Button>
            </div>
            <Button class="dialog__button-save" size="md" variant="primary" @click="emit('hide')">
                Save Changes
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.dialog {
    &__content {
        @apply  w-full pt-0 py-5 md:pt-5 px-0;
    }

    &__header {
        @apply flex gap-2 mx-5 mb-4 items-center max-w-[404px];
    }

    &__user {
        @apply flex gap-2 items-center;
    }

    &__avatar-image {
        @apply object-cover h-full w-full;
    }

    &__user-info {
        @apply flex flex-col gap-0.5;
    }

    &__user-name {
        @apply font-medium text-text-primary text-captionL;
    }

    &__user-email {
        @apply text-secondary leading-4 opacity-60 text-captionM;
    }

    &__body {
        @apply mx-5 mb-3;
    }

    &__footer {
        @apply sm:justify-start grid grid-cols-2 gap-2 px-5;
    }

    &__button-remove {
        @apply w-full text-destructive !bg-[#E6483D1A];
    }

    &__button-save {
        @apply w-full;
    }
}
</style>
