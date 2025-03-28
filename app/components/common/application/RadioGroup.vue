<script setup lang="ts" generic="T">
import type { RadioGroupRootProps } from 'radix-vue'

interface Props extends RadioGroupRootProps {
    data?: ({
        key: string
        icon?: string
        title: string
        description?: string
    } & T)[]
}

const { data, ...props } = defineProps<Props>()

const slots = defineSlots()

const modelValue = defineModel<string>({
    default: '',
})
</script>

<template>
    <RadioGroup v-bind="props" v-model="modelValue">
        <Label v-for="item in data" :key="item.title" class="radio-group__label" :class="{ 'radio-group__label--selected': modelValue === item.key }">
            <template v-if="!slots.content">
                <CommonGeneralIconTemplate v-if="item?.icon" class="flex-shrink-0">
                    <template #icon>
                        <Icon :name="item.icon" class="radio-group__icon" />
                    </template>
                </CommonGeneralIconTemplate>

                <div class="radio-group__content">
                    <span class="radio-group__title">{{ item.title }}</span>
                    <span class="radio-group__description">{{ item.description }}</span>
                </div>
            </template>
            <slot v-else :item="item" name="content" />
            <RadioGroupItem :id="item.key" class="radio-group__item" :value="item.key" />
        </Label>
    </RadioGroup>
</template>

<style lang="postcss" scoped>
.radio-group {
    &__label {
        @apply cursor-pointer flex border border-border-base-divider p-4 gap-2 rounded-xl shadow-xs;
    }

    &__label--selected {
        @apply outline outline-2 outline-background-badge-blue-accent shadow-md;

        .radio-group__icon {
            @apply text-text-primary;
        }
    }

    &__content {
        @apply flex flex-col gap-1;
    }

    &__icon {
        @apply text-text-secondary size-4;
    }

    &__title {
        @apply text-captionL text-text-primary;
    }

    &__description {
        @apply text-captionM text-text-tertiary;
    }

    &__item {
        @apply ml-auto;
    }
}
</style>
