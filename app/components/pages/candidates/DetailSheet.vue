<script setup lang="ts">
import { useFetch } from '#app'
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
import { computed, ref, watchEffect } from 'vue'
import * as z from 'zod'
import Divider from '~/components/common/general/Divider.vue'

const props = defineProps<{ id: number }>()

const { data: candidate, refresh } = await useFetch(`/api/candidates/${props.id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    immediate: false,
})

const formSchema = toTypedSchema(
    z.object({
        email: z.string().email(),
        first_name: z.string(),
        last_name: z.string(),
        phone: z.string().nullable(),
        resume: z.string().nullable(),
        resume_content: z.unknown().nullable(),
    }),
)

const formValues = ref({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    resume: '' as string | null,
})

const parsedResumeContent = computed(() => {
    try {
        return typeof candidate.value?.data?.resume_content === 'string'
            ? JSON.parse(candidate.value.data.resume_content)
            : {}
    }
    catch (error) {
        console.error('Resume content JSON parse error:', error)
        return {}
    }
})

const { resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: { ...formValues.value },
})

watchEffect(() => {
    if (candidate.value?.data) {
        formValues.value = {
            email: candidate.value.data.email ?? '',
            first_name: candidate.value.data.first_name ?? '',
            last_name: candidate.value.data.last_name ?? '',
            phone: candidate.value.data.phone ?? '',
            resume: candidate.value.data.resume ?? null,
        }
    }
})

const editButton = ref(false)

function handleEditButton() {
    editButton.value = !editButton.value
}

function handleCancel() {
    resetForm()
    editButton.value = false
}

async function onSubmit() {
    const { data: response, error } = await useFetch(`/api/candidates/${props.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues.value),
    })

    if (!error.value) {
        console.log('Update successful:', response.value)
        editButton.value = false
        refresh()
    }
    else {
        console.error('Update failed:', error.value)
    }
}
</script>

<template>
    <Sheet @click="handleCancel">
        <SheetTrigger as-child>
            <div
                class="flex items-center gap-[6px] text-text-secondary hover:opacity-70 cursor-pointer transition-all duration-100 ease-in-out max-w-fit ml-auto"
                @click="refresh"
            >
                <p class="font-medium text-captionL">
                    View
                </p>
                <Icon name="ri:arrow-right-line" class="w-4 h-4" />
            </div>
        </SheetTrigger>

        <SheetContent class="min-w-[400px]">
            <form class="w-full h-screen flex flex-col justify-between" @submit.prevent="onSubmit">
                <SheetHeader class="!px-0">
                    <SheetTitle class="!px-5">
                        Candidate Information
                    </SheetTitle>
                    <SheetDescription>
                        <div class="bg-background-surface-neutral px-5 py-1.5 candidatesSheetCompanyLabel">
                            GENERAL
                        </div>

                        <div class="px-5 py-5">
                            <CommonApplicationAvatarUpdate :is-show-update-button="editButton">
                                <template #content>
                                    <p class="candidatesSheetCompanyDetail">
                                        <span v-if="!editButton">
                                            <span v-if="candidate?.data?.first_name && candidate.data.first_name.length > 0">
                                                {{ candidate?.data?.first_name }}
                                            </span>
                                            <span v-if="candidate?.data?.last_name && candidate.data.last_name.length > 0">
                                                {{ candidate?.data?.last_name }}
                                            </span>
                                        </span>

                                        <span v-else>Upload Image</span>
                                    </p>
                                </template>
                            </CommonApplicationAvatarUpdate>
                        </div>

                        <div class="bg-background-surface-neutral px-5 py-1.5 candidatesSheetCompanyLabel">
                            INFORMATION
                        </div>

                        <div class="flex px-5 flex-col">
                            <div class="mt-5 ">
                                <div :class="cn('candidatesSheetCompanyLabel', { 'text-text-primary': editButton })">
                                    FULL NAME
                                </div>
                                <div class="flex gap-2">
                                    <FormField v-slot="{ field }" name="first_name">
                                        <FormControl>
                                            <template v-if="editButton">
                                                <Input v-bind="field" v-model="formValues.first_name" class="candidatesInput" type="text" placeholder="First Name" />
                                            </template>
                                            <template v-else>
                                                <p class="candidatesSheetCompanyDetail">
                                                    <span v-if="candidate?.data?.first_name">
                                                        {{ candidate?.data?.first_name }}
                                                    </span>
                                                </p>
                                            </template>
                                        </FormControl>
                                    </FormField>

                                    <FormField name="last_name">
                                        <FormControl>
                                            <template v-if="editButton">
                                                <Input v-model="formValues.last_name" class="candidatesInput" type="text" placeholder="Last Name" />
                                            </template>
                                            <template v-else>
                                                <p class="candidatesSheetCompanyDetail">
                                                    <span v-if="candidate?.data?.last_name">
                                                        {{ candidate?.data?.last_name }}
                                                    </span>
                                                </p>
                                            </template>
                                        </FormControl>
                                    </FormField>
                                </div>
                            </div>

                            <Divider v-if="!editButton" class="h-[1px] mt-[13.5px] bg-gray-200" />

                            <div class="mt-5">
                                <div :class="cn('candidatesSheetCompanyLabel', { 'text-text-primary': editButton })">
                                    EMAIL
                                </div>

                                <FormField name="email">
                                    <FormControl>
                                        <template v-if="editButton">
                                            <Input v-model="formValues.email" class="candidatesInput" type="text" placeholder="Email" />
                                        </template>
                                        <template v-else>
                                            <p class="candidatesSheetCompanyDetail">
                                                <span v-if="candidate?.data?.email">
                                                    {{ candidate?.data?.email }}
                                                </span>
                                            </p>
                                        </template>
                                    </FormControl>
                                </FormField>
                            </div>
                            <Divider v-if="!editButton" class="h-[1px] mt-[13.5px] bg-gray-200" />

                            <div class="mt-5">
                                <div :class="cn('candidatesSheetCompanyLabel', { 'text-text-primary': editButton })">
                                    Phone Number
                                </div>

                                <FormField name="phone">
                                    <FormControl>
                                        <template v-if="editButton">
                                            <Input v-model="formValues.phone" class="candidatesInput" type="text" placeholder="Phone Number" />
                                        </template>
                                        <template v-else>
                                            <p class="candidatesSheetCompanyDetail">
                                                <span v-if="candidate?.data?.phone">
                                                    {{ candidate?.data?.phone }}
                                                </span>
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
                                <p class="candidatesSheetCompanyDetail">
                                    {{ parsedResumeContent?.workExperience?.[0]?.jobTitle || '-' }}
                                </p>
                            </div>
                        </div>

                        <div class="bg-background-surface-neutral px-5 py-1.5 candidatesSheetCompanyLabel">
                            COMPANY INFORMATION
                        </div>
                        <div class="flex px-5 flex-col">
                            <div class="mt-5">
                                <div :class="cn('candidatesSheetCompanyLabel', { 'text-text-primary': editButton })">
                                    COMPANY
                                </div>
                                <p class="candidatesSheetCompanyDetail">
                                    {{ parsedResumeContent?.workExperience?.[0]?.company || '-' }}
                                </p>
                            </div>
                        </div>
                    </SheetDescription>
                </SheetHeader>

                <SheetFooter>
                    <Button v-if="!editButton" type="button" variant="secondary" class="w-full" @click="handleEditButton">
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
    @apply font-medium flex gap-1 text-bodyS leading-5 text-slate-950;
    span{
        @apply flex gap-2
    }
}

.candidatesInput {
    @apply shadow-none h-[40px] text-bodyS leading-5 text-text-primary;
}
</style>
