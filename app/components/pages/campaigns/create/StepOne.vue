<script setup lang="ts">
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { computed, ref } from 'vue'

const editedTags = ref<string[]>([])
const searchTerm = ref<string>('')
const open = ref<boolean>(false)

const frameworks = ref([
    { label: 'Vue.js', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Ember.js', value: 'ember' },
])

const filteredFrameworks = computed(() => {
    if (!searchTerm.value.trim())
        return frameworks.value
    return frameworks.value.filter(framework =>
        framework.label.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )
})

function addTag(tag: string) {
    if (tag) {
        if (!editedTags.value.includes(tag)) {
            editedTags.value.push(tag)
            searchTerm.value = ''
            open.value = false

            const index = frameworks.value.findIndex(f => f.label === tag)
            if (index !== -1) {
                frameworks.value.splice(index, 1)
            }
        }
        else {
            console.log(`"${tag}" zaten mevcut.`)
        }
    }
}

function removeTag(tag: string) {
    const framework = { label: tag, value: tag.toLowerCase() }
    frameworks.value.push(framework)
}
</script>

<template>
    <div class="step-one">
        <FormField v-slot="{ componentField }" name="companyAvatar">
            <CommonApplicationAvatarUpdate default-image="/images/Company.svg" v-bind="componentField">
                <template #content>
                    <span class="step-one__upload-label">Upload Image</span>
                    <span class="step-one__image-hint">Min 400x400px, PNG or JPEG</span>
                </template>
            </CommonApplicationAvatarUpdate>
        </FormField>

        <FormField v-slot="{ componentField, errors }" name="tags">
            <FormItem>
                <FormLabel required>
                    Tags
                </FormLabel>
                <FormControl>
                    <TagsInput v-bind="componentField" v-model="editedTags" class="px-0 py-1 gap-0 w-full ">
                        <div class="flex gap-2 w-full flex-wrap items-center px-3">
                            <TagsInputItem v-for="item in editedTags" :key="item" :value="item">
                                <TagsInputItemText>{{ item }}</TagsInputItemText>
                                <TagsInputItemDelete @click="removeTag(item)" />
                            </TagsInputItem>
                            <ComboboxRoot
                                v-model:open="open"
                                v-model:search-term="searchTerm"
                                :class="editedTags.length > 0 ? 'max-w-[100px]' : 'w-full'"
                            >
                                <ComboboxAnchor as-child>
                                    <ComboboxInput
                                        as-child
                                        @keydown.enter.prevent="addTag(searchTerm)" @blur="addTag(searchTerm)"
                                    >
                                        <TagsInputInput :class="editedTags.length > 0 ? '' : 'w-full'" />
                                    </ComboboxInput>
                                </ComboboxAnchor>

                                <ComboboxPortal>
                                    <ComboboxContent>
                                        <CommandList
                                            position="popper"
                                            class="w-[--radix-popper-anchor-width] rounded-md mt-2 border
                bg-popover text-popover-foreground shadow-md outline-none
                data-[state=open]:animate-in data-[state=closed]:animate-out
                data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
                data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
                data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
                data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                                        >
                                            <CommandEmpty>No tags found</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem
                                                    v-for="framework in filteredFrameworks"
                                                    :key="framework.value"
                                                    :value="framework.label"
                                                    @select.prevent="addTag(framework.label)"
                                                >
                                                    {{ framework.label }}
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </ComboboxContent>
                                </ComboboxPortal>
                            </ComboboxRoot>
                        </div>
                    </TagsInput>
                </FormControl>
                <FormMessage v-if="errors">
                    {{ errors }}
                </FormMessage>
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="hiringCompany">
            <FormItem>
                <FormLabel required>
                    Hiring Company
                </FormLabel>
                <FormControl>
                    <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="campaignName">
            <FormItem>
                <FormLabel required>
                    Campaign Name
                </FormLabel>
                <FormControl>
                    <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="campaignDescription">
            <FormItem>
                <FormLabel required>
                    Campaign Description
                </FormLabel>
                <FormControl>
                    <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
    </div>
</template>

<style lang="postcss" scoped>
.step-one {
    @apply flex flex-col gap-6;
    &__upload-label {
        @apply text-primary;
    }

    &__image-hint {
        @apply text-text-secondary text-captionM mb-2;
    }

}
</style>
