<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'
import { EditorContent } from '@tiptap/vue-3'
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { TEMPLATE_TAGS } from '~/constants/email'
import { editorValidationSchema } from '~/lib/validation/campaignCreate'
import { emailTemplateSchema } from '~/lib/validation/emailTemplate'
import { useCampaignCreate } from '~/store/campaigns/create'

const editor = inject('editor') as ShallowRef<Editor>
const subjectEditor = inject('subjectEditor') as ShallowRef<Editor>
const { setFieldValue } = useForm()
const campaignCreate = useCampaignCreate()

const mode = ref<'edit' | 'preview'>('edit')
const templateId = ref<string>(campaignCreate.templateId?.toString() || '')
const tags = ref<string[]>(['Marketing', 'Sales'])
const title = ref('Marketing Specialist Outreach Template')
const description = ref('Edit your template, define variables, and review in preview mode.')
const editedTags = ref([...tags.value])
const editedTitle = ref(title.value)
const editedDesc = ref(description.value)

const isEditing = ref<null | 'tags' | 'title' | 'description'>(null)
const isTouched = ref(false)

const validationErrors = ref<Record<string, string[]>>({})

const frameworks = [
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'development', label: 'Development' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Ember.js', value: 'ember' },
]

const open = ref(false)
const searchTerm = ref('')
const filteredFrameworks = computed(() =>
    frameworks.filter(
        fw => fw.label.toLowerCase().includes(searchTerm.value.toLowerCase())
            && !editedTags.value.includes(fw.label),
    ),
)

watch(editedTitle, () => validateField('title'))
watch(editedDesc, () => validateField('description'))
watch(editedTags, () => validateField('tags'))

function toggleMode() {
    mode.value = mode.value === 'edit' ? 'preview' : 'edit'
}

function toggleEdit(field: 'tags' | 'title' | 'description') {
    isEditing.value = isEditing.value === field ? null : field
    if (isEditing.value === 'tags') {
        editedTags.value = [...tags.value]
    }
    else if (isEditing.value === 'title') {
        editedTitle.value = title.value
    }
    else if (isEditing.value === 'description') {
        editedDesc.value = description.value
    }
}

function saveField(field: 'tags' | 'title' | 'description') {
    validateField(field)
    if ((validationErrors.value[field] ?? []).length)
        return

    switch (field) {
        case 'tags': tags.value = [...editedTags.value]
            break
        case 'title': title.value = editedTitle.value
            break
        case 'description': description.value = editedDesc.value
            break
    }
    isEditing.value = null
}

function cancelEdit() {
    isEditing.value = null
    editedTags.value = [...tags.value]
    editedTitle.value = title.value
    editedDesc.value = description.value
}

function handleBack() {
    campaignCreate.stepIndex = 3
    campaignCreate.subStep = 1
    campaignCreate.templateId = null
}

function goReadyTemplate(id: number) {
    campaignCreate.subStep = 1
    campaignCreate.templateId = null
    setFieldValue('readyTemplateId', id)
    campaignCreate.selectTemplateId = id
}

function validateField(fieldName: keyof typeof editorValidationSchema.shape) {
    const formData = {
        tags: editedTags.value,
        title: editedTitle.value,
        description: editedDesc.value,
        subjectEditor: subjectEditor.value,
        editor: editor.value,
    }

    try {
        z.object({ [fieldName]: editorValidationSchema.shape[fieldName] })
            .parse({ [fieldName]: formData[fieldName] })

        validationErrors.value[fieldName] = []
    }
    catch (err) {
        isTouched.value = true
        if (err instanceof z.ZodError) {
            validationErrors.value[fieldName] = err.flatten().fieldErrors[fieldName] || []
        }
    }
}

const isFormValid = computed(() =>
    Object.values(validationErrors.value).every(errorArray => !errorArray.length),
)

async function handleSubmit() {
    const formData = {
        tags: editedTags.value,
        title: editedTitle.value,
        description: editedDesc.value,
        email_subject: JSON.stringify(subjectEditor.value?.getJSON()),
        email_body: JSON.stringify(editor.value?.getJSON()),
    }

    try {
        emailTemplateSchema.parse(formData)

        const apiUrl = templateId.value
            ? `/api/campaign/email/template/${templateId.value}`
            : '/api/campaign/email/template'

        const { data: response, status, error } = await useFetch(apiUrl as '/api/campaign/email/template/:id' | '/api/campaign/email/template', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })

        if (status.value === 'success' && response.value) {
            const createdId = response.value?.data?.id
            if (createdId) {
                goReadyTemplate(createdId)
            }
        }
        else {
            console.error('API error:', error.value || 'Unexpected error')
        }
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            validationErrors.value = Object.fromEntries(
                Object.entries(err.flatten().fieldErrors).filter(([_, v]) => v !== undefined),
            ) as Record<string, string[]>
        }
        else {
            console.error('Unexpected error:', err)
        }
    }
}

onMounted(async () => {
    if (templateId.value) {
        const { data: res, status, error } = await useFetch(`/api/campaign/email/template/${templateId.value}`, {
            method: 'GET',
        })

        if (status.value === 'success' && res.value) {
            try {
                const apiData = res.value.data
                tags.value = Array.isArray(apiData?.tags) ? apiData.tags.filter(tag => typeof tag === 'string') : []
                title.value = apiData?.title || ''
                description.value = apiData?.description || ''

                const subjectJson = apiData?.email_subject
                const bodyJson = apiData?.email_body

                if (subjectJson && subjectEditor.value) {
                    subjectEditor.value.commands.setContent(JSON.parse(subjectJson))
                }
                if (bodyJson && editor.value) {
                    editor.value.commands.setContent(JSON.parse(bodyJson))
                }
            }
            catch (e) {
                console.error('Error processing template data:', e)
            }
        }
        else {
            console.error('Error fetching template:', error.value || `Status: ${status.value}`)
        }
    }

    await nextTick()
    validateField('subjectEditor')
    validateField('editor')
    isTouched.value = false
})
</script>

<template>
    <div class="editor">
        <div class="editor__container">
            <div class="editor__header">
                <div class="editor__metadata">
                    <div class="editor__button-container">
                        <Button variant="tertiary" class="mr-auto mb-4" @click="handleBack">
                            <Icon name="ri:arrow-left-s-line" class="size-5" />
                            Back
                        </Button>
                        <div class="editor__actions">
                            <Button variant="tertiary" @click="toggleMode">
                                <Icon
                                    :name="mode === 'edit' ? 'ri:eye-line' : 'ri:pencil-line'"
                                    class="editor__edit-icon"
                                />
                                {{ mode === 'edit' ? 'Preview' : 'Edit' }}
                            </Button>
                            <Button :disabled="!isFormValid" @click="handleSubmit">
                                <Icon name="ri:check-line" class="editor__edit-icon" />
                                Save
                            </Button>
                        </div>
                    </div>
                    <div class="editor__tags">
                        <template v-if="isEditing !== 'tags'">
                            <Badge
                                v-for="tag in tags" :key="tag" :color="(TEMPLATE_TAGS as any)[tag] || 'gray'"
                                size="md" shape="pill"
                            >
                                {{ tag }}
                            </Badge>
                            <Badge
                                color="gray" stroke="none" size="sm" class="editor__action-button"
                                @click="toggleEdit('tags')"
                            >
                                <Icon name="ri:pencil-line" class="editor__edit-icon" />
                            </Badge>
                        </template>
                        <template v-else>
                            <TagsInput v-model="editedTags" class="px-0 gap-0 py-1 w-full">
                                <div class="flex gap-2 w-full flex-wrap items-center px-3">
                                    <TagsInputItem v-for="item in editedTags" :key="item" :value="item">
                                        <TagsInputItemText />
                                        <TagsInputItemDelete />
                                    </TagsInputItem>
                                    <ComboboxRoot
                                        v-model="editedTags" v-model:open="open" v-model:search-term="searchTerm"
                                        :class="editedTags.length > 0 ? 'max-w-[100px]' : 'w-full'"
                                    >
                                        <ComboboxAnchor as-child>
                                            <ComboboxInput placeholder="Tags..." as-child>
                                                <TagsInputInput
                                                    :class="editedTags.length > 0 ? '' : 'w-full'"
                                                />
                                            </ComboboxInput>
                                        </ComboboxAnchor>

                                        <ComboboxPortal>
                                            <ComboboxContent>
                                                <CommandList
                                                    position="popper" class="w-[--radix-popper-anchor-width] rounded-md mt-2 border
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
                                                            :key="framework.value" :value="framework.label" @select.prevent="evt => {
                                                                const val = evt.detail?.value
                                                                if (typeof val === 'string') editedTags.push(val)
                                                                if (!filteredFrameworks.length) open = false
                                                            }"
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

                            <p v-if="validationErrors.tags" class="error">
                                {{ validationErrors.tags[0] }}
                            </p>
                            <Button
                                size="sm" :disabled="(validationErrors.tags?.length || 0) > 0"
                                @click="saveField('tags')"
                            >
                                Save
                            </Button>
                            <Button size="sm" variant="tertiary" @click="cancelEdit">
                                Cancel
                            </Button>
                        </template>
                    </div>

                    <div class="editor__title-group">
                        <template v-if="isEditing !== 'title'">
                            <span class="editor__title">{{ title }}</span>
                            <Badge
                                color="gray" stroke="none" size="sm" class="editor__action-button"
                                @click="toggleEdit('title')"
                            >
                                <Icon name="ri:pencil-line" class="editor__edit-icon" />
                            </Badge>
                        </template>
                        <template v-else>
                            <Input
                                v-model="editedTitle" :error-message="validationErrors.title?.[0]"
                                @input="validateField('title')"
                            />
                            <Button
                                size="sm" :disabled="(validationErrors.title?.length || 0) > 0"
                                @click="saveField('title')"
                            >
                                Save
                            </Button>
                            <Button size="sm" variant="tertiary" @click="cancelEdit">
                                Cancel
                            </Button>
                        </template>
                    </div>

                    <div class="editor__description-group">
                        <template v-if="isEditing !== 'description'">
                            <span class="editor__description">{{ description }}</span>
                            <Badge
                                color="gray" stroke="none" size="sm" class="editor__action-button"
                                @click="toggleEdit('description')"
                            >
                                <Icon name="ri:pencil-line" class="editor__edit-icon" />
                            </Badge>
                        </template>
                        <template v-else>
                            <Input
                                v-model="editedDesc" :error-message="validationErrors.description?.[0]"
                                @input="validateField('description')"
                            />
                            <Button
                                size="sm" :disabled="(validationErrors.description?.length ?? 0) > 0"
                                @click="saveField('description')"
                            >
                                Save
                            </Button>
                            <Button size="sm" variant="tertiary" @click="cancelEdit">
                                Cancel
                            </Button>
                        </template>
                    </div>
                </div>
            </div>

            <CommonGeneralDivider />

            <template v-if="mode === 'edit'">
                <div class="editor__group">
                    <Label class="editor__label">Subject</Label>
                    <template v-if="templateId && !subjectEditor?.getText()">
                        <Skeleton class="w-full h-8" />
                    </template>
                    <EditorContent v-else :editor="subjectEditor" @keyup="validateField('subjectEditor')" />
                    <span v-if="isTouched && validationErrors.subjectEditor?.[0]" class="error_message">
                        {{ validationErrors.subjectEditor?.[0] }}
                    </span>
                </div>
                <div class="editor__group">
                    <Label class="editor__label">Body</Label>
                    <template v-if="templateId && !editor?.getText()">
                        <Skeleton class="w-full h-80" />
                    </template>
                    <EditorContent v-else :editor="editor" @keyup="validateField('editor')" />
                    <span v-if="isTouched && validationErrors.editor?.[0]" class="error_message">
                        {{ validationErrors.editor?.[0] }}
                    </span>
                </div>

                <div class="editor__toolbar">
                    <CommonApplicationEditorToolbar class="editor__toolbar-item" />
                    <Button variant="black" class="editor__toolbar-button">
                        Create Using AI
                    </Button>
                </div>
            </template>

            <template v-else>
                <div class="preview">
                    <div class="preview__subject">
                        <Label class="editor__label">Subject</Label>
                        <div class="preview__content" v-html="subjectEditor.getHTML() || '<p>No content</p>'" />
                    </div>
                    <div class="preview__body">
                        <Label class="editor__label">Body</Label>
                        <div class="preview__content" v-html="editor.getHTML() || '<p>No content</p>'" />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="postcss">
.editor {
    @apply p-6 flex flex-col border w-full border-border-base-divider rounded-xl mt-4;

    .error_message {
        @apply text-text-red-accent text-captionM;
    }

    &__container {
        @apply flex justify-between flex-col gap-4;
    }

    &__group {
        @apply flex flex-col gap-2;
    }

    &__label {
        @apply text-captionL;
    }

    &__content {
        @apply text-captionL focus:ring focus:ring-background-surface-info-accent w-full min-h-80 max-w-full overflow-auto rounded-md border border-border-base-divider shadow-xs px-3 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50;

        h1 {
            @apply text-h1;
        }

        h2 {
            @apply text-h2;
        }

        h3 {
            @apply text-h3;
        }

        h4 {
            @apply text-h4;
        }

        h5 {
            @apply text-h5;
        }

        h6 {
            @apply text-h6;
        }
    }

    &__toolbar {
        @apply flex gap-4 items-center w-full justify-between;
    }

    &__toolbar-item {
        @apply mt-5;
    }

    &__toolbar-button {
        @apply mt-5;
    }

    &__header {
        @apply flex w-full;
    }

    &__metadata {
        @apply flex flex-col gap-2 w-full;
    }

    &__button-container {
        @apply flex items-center gap-4;
    }

    &__tags {
        @apply flex items-start gap-2;
    }

    &__title-group {
        @apply flex items-start gap-2;
    }

    &__title {
        @apply text-h6 font-semibold;
    }

    &__description-group {
        @apply flex items-start gap-2;
    }

    &__description {
        @apply text-bodyS font-normal text-text-secondary;
    }

    &__actions {
        @apply flex items-center gap-2;
    }

    &__edit-icon {
        @apply size-4;
    }

    &__action-button {
        @apply cursor-pointer select-none;
    }
}

.editor-input__content {
    @apply text-captionL focus:ring focus:ring-background-surface-info-accent w-full max-w-full overflow-auto rounded-md border border-border-base-divider shadow-xs px-3 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50;
}

.preview {
    @apply flex flex-col gap-6 w-full;

    &__subject {
        @apply flex flex-col gap-2 w-full;
    }

    &__body {
        @apply flex flex-col gap-2 w-full;
    }

    &__content {
        @apply p-4 bg-background-surface-neutral rounded-lg prose prose-sm w-full;
    }
}

.error {
    @apply text-red-500 mt-1;
}
</style>
