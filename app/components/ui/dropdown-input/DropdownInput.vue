<script lang="ts" setup>
import { useFocus } from '@vueuse/core'
import PhoneInput from 'base-vue-phone-input'

const open = ref(false)
const phoneInput = ref<HTMLInputElement | null>(null)
const { focused: _focused } = useFocus(phoneInput)

function handleSelect(option: any, updateInputValue: (value: string) => void) {
    updateInputValue(option.iso2)
    open.value = false
    nextTick(() => {
        if (phoneInput.value?.focus) {
            phoneInput.value.focus()
        }
    })
}
</script>

<template>
    <PhoneInput
        no-use-browser-locale
        fetch-country
        class="dropdowninput"
        country-locale="en-EN"
        :ignored-countries="['AC']"
    >
        <template #selector="{ inputValue, updateInputValue, countries }">
            <Popover v-model:open="open">
                <PopoverTrigger>
                    <div class="dropdowninput__selector">
                        <span class="dropdowninput__value">{{ inputValue }}</span>
                        <Icon size="14px" class="dropdowninput__icon" name="ri:arrow-down-s-line" />
                    </div>
                </PopoverTrigger>
                <PopoverContent class="dropdowninput__content">
                    <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandList>
                            <CommandGroup>
                                <CommandItem
                                    v-for="option in countries"
                                    :key="option.iso2"
                                    :value="option.name"
                                    class="dropdowninput__item"
                                    @select="() => handleSelect(option, updateInputValue)"
                                >
                                    <FlagComponent :country="option?.iso2" />
                                    <span class="dropdowninput__country">{{ option.name }}</span>
                                    <span class="dropdowninput__dialcode">{{ option.dialCode }}</span>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </template>

        <template #input="{ inputValue, updateInputValue, placeholder }">
            <input
                ref="phoneInput"
                class="dropdowninput__input"
                type="text"
                :model-value="inputValue"
                :placeholder="placeholder"
                @input="updateInputValue"
            >
        </template>
    </PhoneInput>
</template>

<style lang="postcss" scoped>
.dropdowninput {
    @apply flex items-center border-[1.5px] rounded-xl bg-white px-3 py-1 text-captionL shadow-md transition-colors focus:shadow-[0_0_0_2px_rgba(120,150,255,0.5)] focus:outline-none;

    &__selector {
        @apply flex items-center gap-1 p-1;
    }

    &__value {
        @apply text-captionL font-medium;
    }

    &__icon {
        @apply text-icon-dark-tertiary;
    }

    &__content {
        @apply w-[300px] p-0;
    }

    &__item {
        @apply gap-2;
    }

    &__country, &__dialcode {
        @apply text-bodyS;
    }

    &__input {
        @apply flex-1 px-3 py-1 !border-0 !rounded-none focus:ring-0 focus:outline-none hover:bg-transparent active:bg-transparent outline-none shadow-none bg-white;
    }
}
</style>
