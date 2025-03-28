<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { GlobalModal, GlobalModalEmits } from '~/types/modal'
import { EditorContent } from '@tiptap/vue-3'
import Divider from '../Divider.vue'

const props = defineProps<Props>()
const emit = defineEmits<GlobalModalEmits>()

interface Props extends GlobalModal {
    data: any
    editor: any
    subjectEditor: any
}
const formData = reactive({
    candidate: '',
    subjectLine: '',
    body: '',
})

onMounted(() => {
    const { candidate = '', subjectLine = '', body = '' } = props.data?.data ?? {}
    Object.assign(formData, { candidate, name, subjectLine, body })
})

function onEditButtonClick() {
    if (!formData.body) {
        formData.body = ''
    }
    emit('hide')
}
</script>

<template>
    <div class="dialog__content">
        <div class="dialog__header">
            <CommonGeneralIconTemplate>
                <template #icon>
                    <div class="dialog__icon">
                        <Icon class="dialog__header-icon " name="ri:mail-line" />
                    </div>
                </template>
            </CommonGeneralIconTemplate>
            <div class="dialog__header-container">
                <div class="dialog__header-title">
                    Preview Email
                </div>
                <span class="dialog__description">Preview your campaign before sending</span>
            </div>
        </div>
        <Divider />
        <div class="dialog__body">
            <div class="dialog__field">
                <Label class="dialog__label">Candidate</Label>
                <Select>
                    <SelectTrigger class="dialog__select-trigger">
                        <SelectValue placeholder="Choose a Candidate" />
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

            <div class="dialog__field">
                <Label class="dialog__label">Subject Line</Label>
                <EditorContent
                    v-if="props.subjectEditor"
                    :editor="props.subjectEditor"
                />
            </div>
            <div class="dialog__field">
                <Label class="dialog__label">Body</Label>
                <EditorContent
                    v-if="props.editor"
                    :editor="props.editor"
                />
            </div>
        </div>

        <div class="dialog__footer">
            <Button class="dialog__button-remove" variant="secondary" @click="emit('hide')">
                Cancel
            </Button>
            <Button class="dialog__button-save" size="md" variant="primary" @click="onEditButtonClick">
                Send
            </Button>
        </div>
    </div>
</template>

<style lang="postcss">
.dialog {
  &__content {
    @apply w-full pt-0 py-5 md:pt-5 px-0;
  }

  &__header {
    @apply flex gap-3 mx-5 mb-4 items-center max-w-[404px];
  }

  &__header-container {
    @apply flex flex-col gap-1;
  }

  &__header-title {
    @apply font-medium;
  }

  &__body {
    @apply max-w-full md:max-w-sm px-5 md:mx-5 md:px-0 mb-7 flex flex-col gap-3 mt-2;
  }

  &__description {
    @apply text-captionM text-gray-500;
  }

  &__icon {
    @apply flex items-center justify-center h-10 w-10;
  }

  &__field {
    @apply flex flex-col gap-2;
  }

  &__footer {
    @apply sm:justify-start grid grid-cols-2 gap-2 px-5;
  }

  &__label {
    @apply text-bodyS;
  }

  &__required {
    @apply text-red-500;
  }

  &__user {
    @apply flex gap-2 items-center;
  }

  &__header-icon {
    @apply text-gray-500;
  }

  &__button-remove {
    @apply w-full;
  }

  &__button-save {
    @apply w-full;
  }

  &__preview_email_editor_input__content {
    @apply text-captionL focus:ring focus:ring-background-surface-info-accent break-words whitespace-pre-wrap  text-ellipsis w-full max-w-full overflow-auto rounded-md border border-border-base-divider shadow-xs px-3 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50;

  }

  &__preview_email_editor__content {
    @apply text-captionL focus:ring focus:ring-background-surface-info-accent w-full min-h-40 max-w-full max-h-40 overflow-auto break-words whitespace-pre-wrap  text-ellipsis rounded-md border border-border-base-divider shadow-xs px-3 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50;

  }
}
</style>
