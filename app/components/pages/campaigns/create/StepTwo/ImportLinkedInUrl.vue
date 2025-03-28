<template>
    <div class="importLinkedInUrl">
        <FormField v-slot="{ componentField }" name="importLinkedInUrl">
            <FormItem class="importLinkedInUrl__item">
                <FormLabel class="importLinkedInUrl__label">
                    Linkedin URL
                </FormLabel>
                <FormControl class="importLinkedInUrl__control">
                    <div class="importLinkedInUrl__input-container">
                        <div class="importLinkedInUrl__icon-container">
                            <Icon name="ri:linkedin-line" class="importLinkedInUrl__icon" />
                        </div>

                        <TagsInput v-model="componentField.modelValue" class="importLinkedInUrl__tags-input" @update:model-value="componentField['onUpdate:modelValue']">
                            <TagsInputItem v-for="item in componentField.modelValue" :key="item" :value="item">
                                <TagsInputItemText />
                                <TagsInputItemDelete />
                            </TagsInputItem>

                            <TagsInputInput placeholder="username..." />
                        </TagsInput>
                    </div>
                </FormControl>
                <FormMessage class="importLinkedInUrl__message" />
            </FormItem>
        </FormField>
    </div>
</template>

<style lang="postcss" scoped>
.importLinkedInUrl {
    &__item {
        @apply mb-4;
    }

    &__label {
        @apply mb-2;
    }

    &__control {
        @apply w-full flex items-stretch;
    }

    &__input-container {
        @apply flex w-full items-stretch;
    }

    &__icon-container {
        @apply flex items-center justify-center border shadow-xs bg-background-surface-neutral border-border-base-divider rounded-l-lg px-4;
    }

    &__icon {
        @apply p-2 size-3;
    }

    &__tags-input {
        @apply rounded-l-none border-l-0 w-full;
    }

    &__message {
        @apply mt-2 text-red-600;
    }
}
</style>
