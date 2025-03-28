<script setup lang="ts">
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import * as z from 'zod'
import Divider from '~/components/common/general/Divider.vue'
import { calculateDateDifference } from '~/lib/formatTime'
import type { IDefaultResponse } from '~/types/response'

const props = defineProps<{
    item: IDefaultResponse
}>()

const updateAvatar = useTemplateRef('updateAvatar')

const formSchema = toTypedSchema(z.object({
    company: z.string(),
    startSince: z.number().optional(),
    endSince: z.number().optional(),
    avatar: z.string(),
    fullName: z.string(),
    position: z.string(),
}))

const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
        company: props.item.company,
        startSince: props.item.startSince,
        endSince: props.item.endSince,
        avatar: props.item.avatar,
        fullName: props.item.first_name + ' ' + props.item.last_name,
        position: props.item.position,
    },
})

const editButton = ref(false)

function handleEditButton() {
    editButton.value = !editButton.value
    resetForm()
};

function handleCancel() {
    updateAvatar.value?.onCancel()
    resetForm()
    editButton.value = false
}

const onSubmit = handleSubmit((values) => {
    delete values.startSince
    delete values.endSince
    console.log(values, 'Submitted values')
})

function handleOpenSheet() {
    editButton.value = false
    resetForm()
}
</script>

<template>
    <Sheet @click="handleCancel">
        <SheetTrigger as-child :onclick="handleOpenSheet">
            <div
                class="flex items-center gap-[6px] text-text-secondary hover:opacity-70 cursor-pointer transition-all duration-100 ease-in-out max-w-fit ml-auto"
            >
                <p class="font-medium text-captionL">
                    View
                </p>
                <Icon name="ri:arrow-right-line" class="w-4 h-4" />
            </div>
        </SheetTrigger>

        <SheetContent class="min-w-[400px]">
            <form class="w-full h-screen flex flex-col justify-between" @submit="onSubmit">
                <SheetHeader class="!px-0">
                    <SheetTitle class="!px-5">
                        Candidate Information
                    </SheetTitle>
                    <SheetDescription>
                        <div class="bg-background-surface-neutral px-5 py-1.5 candidatesSheetCompanyLabel">
                            GENERAL
                        </div>

                        <div class="px-5 py-5">
                            <CommonApplicationAvatarUpdate
                                ref="updateAvatar" :is-show-update-button="editButton"
                            >
                                <template #content>
                                    <p class="candidatesSheetCompanyDetail">
                                        {{ !editButton ? item.first_name : 'Upload Image' }}
                                    </p>
                                    <p class="candidatesSheetCompanyLabel">
                                        {{ !editButton ? item.position : 'Min 400x400px, PNG or JPEG' }}
                                    </p>
                                </template>
                            </CommonApplicationAvatarUpdate>
                        </div>

                        <div class="bg-background-surface-neutral px-5 py-1.5 candidatesSheetCompanyLabel">
                            COMPANY INFORMATION
                        </div>

                        <div class="flex px-5 flex-col">
                            <div class="mt-5">
                                <div :class="cn('candidatesSheetCompanyLabel', { 'text-text-primary': editButton })">
                                    FULL NAME
                                </div>

                                <FormField v-slot="{ componentField }" name="fullName">
                                    <FormControl>
                                        <template v-if="editButton">
                                            <Input
                                                class="candidatesInput" type="text" placeholder="Full Name"
                                                v-bind="componentField"
                                            />
                                        </template>
                                        <template v-else>
                                            <p class="candidatesSheetCompanyDetail">
                                                {{ item.first_name + ' ' + item.last_name }}
                                            </p>
                                        </template>
                                    </FormControl>
                                </FormField>
                            </div>

                            <Divider v-if="!editButton" class="h-[1px] mt-[13.5px] bg-gray-200" />

                            <div class="mb-5 mt-[13.5px]">
                                <div :class="cn('candidatesSheetCompanyLabel', { 'text-text-primary': editButton })">
                                    TITLE <span v-if="editButton" class="text-red-500 text-bodyS">*</span>
                                </div>
                                <FormField v-slot="{ componentField }" name="position">
                                    <FormControl>
                                        <template v-if="editButton">
                                            <Input
                                                class="candidatesInput" type="text" placeholder="Title"
                                                v-bind="componentField"
                                            />
                                        </template>
                                        <template v-else>
                                            <p class="candidatesSheetCompanyDetail">
                                                {{ item.position }}
                                            </p>
                                        </template>
                                    </FormControl>
                                </FormField>
                            </div>
                        </div>

                        <div class="bg-background-surface-neutral px-5 py-1.5 candidatesSheetCompanyLabel">
                            INFORMATION
                        </div>

                        <div class="flex px-5 flex-col">
                            <div class="mt-5">
                                <div :class="cn('candidatesSheetCompanyLabel', { 'text-text-primary': editButton })">
                                    COMPANY
                                </div>
                                <FormField v-slot="{ componentField }" name="company">
                                    <FormControl>
                                        <template v-if="editButton">
                                            <Input
                                                class="candidatesInput" type="text" placeholder="Company"
                                                v-bind="componentField"
                                            />
                                        </template>
                                        <template v-else>
                                            <p class="candidatesSheetCompanyDetail">
                                                {{ item.company }}
                                            </p>
                                        </template>
                                    </FormControl>
                                </FormField>
                            </div>

                            <Divider v-if="!editButton" class="h-[1px] mt-[13.5px] bg-gray-200" />

                            <div class="mb-5 mt-[13.5px]">
                                <div :class="cn('candidatesSheetCompanyLabel', { 'text-text-primary': editButton })">
                                    SINCE
                                </div>
                                <FormField v-slot="{ componentField }" name="since">
                                    <FormControl>
                                        <template v-if="editButton">
                                            <CommonApplicationDate
                                                :start-since="item.startSince" :end-since="item.endSince" v-bind="componentField"
                                            />
                                        </template>
                                        <template v-else>
                                            <p class="candidatesSheetCompanyDetail">
                                                {{
                                                    calculateDateDifference(item.startSince, item.endSince) }}
                                            </p>
                                        </template>
                                    </FormControl>
                                </FormField>
                            </div>
                        </div>
                    </SheetDescription>
                </SheetHeader>

                <SheetFooter>
                    <Button
                        v-if="!editButton" type="button" variant="secondary" class="w-full"
                        @click="handleEditButton"
                    >
                        Edit
                    </Button>

                    <div v-else class="flex items-center gap-4 w-full">
                        <Button type="button" variant="secondary" class="w-full" @click="handleCancel">
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" class="w-full">
                            Apply Changes
                        </Button>
                    </div>
                </SheetFooter>
            </form>
        </SheetContent>
    </Sheet>
</template>

<style lang="postcss" scoped>
.candidatesSheetCompanyLabel {
    @apply text-captionM leading-4 mb-2;
}

.candidatesSheetCompanyDetail {
    @apply font-medium text-bodyS leading-5 text-slate-950;
}

.candidatesInput {
    @apply shadow-none h-[40px] text-bodyS leading-5 text-text-primary;
}
</style>
