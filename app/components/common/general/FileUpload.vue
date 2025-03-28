<script setup lang="ts">
import FileUploadSheets from './FileUploadSheets.vue'

interface FileUploadProps {
    formats: string[]
    multiple?: boolean
    maxFileSize: number
    labelText: string
    description?: string
    data?: any
    filesStatus?: {
        fileName: string
        status: 'success' | 'uploading' | 'failed'
        errorMessage?: string
    }[]
}

const props = defineProps<FileUploadProps>()
const emit = defineEmits(['uploadStatus', 'change', 'remove', 'fileRemoved'])
const model = defineModel()

const STATUS: Record<'success' | 'uploading' | 'failed', { text: string, color: string, icon: string }> = {
    success: {
        text: 'Completed',
        color: 'text-green-500',
        icon: 'ri:checkbox-circle-fill',
    },
    uploading: {
        text: 'Uploading...',
        color: 'text-yellow-500',
        icon: 'svg-spinners:8-dots-rotate',
    },
    failed: {
        text: 'Failed',
        color: 'text-red-500',
        icon: 'ri:close-circle-fill',
    },
}

const errorMessage = ref<string | null>(null)

interface FileData {
    name: string
    size: number
    type: string
    lastModified: number
    status: keyof typeof STATUS
    errorMessage?: string
    groupId?: string
}

const filesData = ref<FileData[]>([])

const dropZoneRef = ref<HTMLElement | null>(null)

function generateGroupId() {
    return Math.random().toString(36).substring(2)
}

const selectedFile = ref<FileData | null>(null)
const selectedGroupFiles = ref<typeof filesData.value>([])
const isSheetOpen = ref(false)

function openSheet(file: typeof filesData.value[0]) {
    selectedFile.value = file
    if (file.groupId) {
        selectedGroupFiles.value = filesData.value.filter(f => f.groupId === file.groupId)
    }
    else {
        selectedGroupFiles.value = [file]
    }
    isSheetOpen.value = true
}

function onDrop(files: FileList | File[] | null) {
    if (files) {
        const fileArray = Array.from(files instanceof FileList ? files : files)
        const groupId = fileArray.length > 1 ? generateGroupId() : undefined
        const newFiles = fileArray.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            status: 'uploading' as 'success' | 'uploading' | 'failed',
            errorMessage: undefined as string | undefined,
            groupId,
        }))

        const invalidFiles = newFiles.filter(file => !props.formats.includes(file.type))
        if (invalidFiles.length > 0) {
            invalidFiles.forEach((file) => {
                file.errorMessage = `Invalid file type: ${file.name}`
                file.status = 'failed'
            })
            filesData.value = [...filesData.value, ...invalidFiles]
            return
        }

        filesData.value = [...filesData.value, ...newFiles]
        emit('change', fileArray)
    }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop,
    multiple: props.multiple ?? true,
    preventDefaultForUnhandled: false,
})

const { open, onChange, reset } = useFileDialog({
    multiple: props.multiple,
    accept: props.formats.join(','),
})

onChange((files) => {
    errorMessage.value = null
    return onDrop(files ? Array.from(files) : null)
})

function removeFile(index: number) {
    const file = filesData.value[index]
    if (!file)
        return
    const fileName = file.name
    filesData.value.splice(index, 1)
    emit('remove', fileName)
    reset()
}
function tryAgain(index: number) {
    const file = filesData.value[index]
    if (!file)
        return
    file.status = 'uploading'
    const fileObject = new File([new Blob([JSON.stringify(file)], { type: file.type })], file.name, { type: file.type })
    emit('change', [fileObject])
}

function getGroupStatus(files: typeof filesData.value) {
    if (files.some(f => f.status === 'uploading'))
        return 'uploading'
    if (files.every(f => f.status === 'success'))
        return 'success'
    if (files.some(f => f.status === 'failed'))
        return 'failed'
    return 'uploading'
}

const groupedFiles = computed(() => {
    const map = new Map<string | undefined, typeof filesData.value>()
    filesData.value.forEach((file) => {
        if (!map.has(file.groupId))
            map.set(file.groupId, [])
        map.get(file.groupId)?.push(file)
    })
    return Array.from(map, ([gid, files]) => ({ gid, files }))
})
function updateGroupFiles(updatedFiles: any[]) {
    if (selectedFile.value?.groupId) {
        filesData.value = filesData.value.filter(file => file.groupId !== selectedFile.value?.groupId)
            .concat(updatedFiles)
    }
    selectedGroupFiles.value = updatedFiles
}

watch(() => props.filesStatus, (newStatus) => {
    if (newStatus) {
        model.value = props.data
        filesData.value = filesData.value.map((file) => {
            const status = newStatus.find(s => s.fileName === file.name)
            if (status) {
                return {
                    ...file,
                    status: status.status,
                    errorMessage: status.errorMessage,
                }
            }
            return file
        })

        newStatus.forEach((statusItem) => {
            const exists = filesData.value.some(file => file.name === statusItem.fileName)
            if (!exists) {
                filesData.value.push({
                    name: statusItem.fileName,
                    status: statusItem.status,
                    size: 0,
                    type: '',
                    lastModified: Date.now(),
                })
            }
        })
    }
}, { deep: true, immediate: true })

function removeGroup(groupId: string | undefined) {
    const groupFiles = filesData.value.filter(file => file.groupId === groupId)
    groupFiles.forEach((file) => {
        const index = filesData.value.findIndex(f => f === file)
        if (index !== -1) {
            filesData.value.splice(index, 1)
            emit('fileRemoved', file.name)
        }
    })
    reset()
}

function removeGroupFile(fileName: string) {
    filesData.value = filesData.value.filter(file => file.name !== fileName)
    emit('fileRemoved', fileName)
}
</script>

<template>
    <div class="file-upload">
        <div ref="dropZoneRef" class="file-upload-drop-zone" :class="{ 'file-upload-drop-zone--over': isOverDropZone }">
            <div class="file-upload-drop-zone__content">
                <Icon name="ri:upload-cloud-2-line" class="file-upload-drop-zone__icon" />
                <div class="file-upload-drop-zone__text">
                    <p class="file-upload-drop-zone__text__instruction">
                        Choose a file or drag & drop it here.
                    </p>
                    <p class="file-upload-drop-zone__text__formats">
                        {{ props.description || `Supported formats: ${props.formats.join(', ')}` }}
                    </p>
                </div>

                <Button variant="secondary" type="button" class="file-upload-drop-zone__label" @click="open">
                    {{ labelText }}
                </Button>
            </div>
        </div>
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>

        <div class="flex flex-col gap-2">
            <template v-for="(groupItem, index) in groupedFiles" :key="groupItem.gid">
                <template v-if="!groupItem.gid || groupItem.files.length === 1">
                    <div
                        v-for="(file, file_index) in groupItem.files"
                        :key="file_index"
                        class="file-upload__item"
                    >
                        <Icon
                            name="recruitmate:file"
                            class="file-upload__item__icon"
                            :class="file.name.split('.').pop()"
                            :data-ext="file.name.split('.').pop()"
                        />
                        {{ console.log(file.name.split('.').pop()) }}
                        <div class="file-upload__item__info">
                            <div class="file-upload__item__header">
                                <p class="file-upload__item__name">
                                    {{ file.name }}
                                </p>

                                <Button
                                    variant="secondary"
                                    size="xs"
                                    class="file-upload__item__remove"
                                    :disabled="file.status === 'uploading'"
                                    @click="removeFile(index); $emit('fileRemoved', file.name)"
                                >
                                    <Icon name="ri:close-line" class="file-upload__item__remove-icon" />
                                </Button>
                            </div>

                            <div class="flex flex-col gap-1">
                                <span class="file-upload__item__size">
                                    <span>
                                        {{
                                            file.status === 'failed'
                                                ? file.errorMessage || 'Error'
                                                : `${(file.size / 1024).toFixed(1)} KB`
                                        }}
                                    </span>
                                    ∙
                                    <span class="flex items-center gap-2">
                                        <Icon
                                            :name="STATUS[file.status].icon"
                                            class="size-3"
                                            :class="STATUS[file.status].color"
                                        />
                                        {{ STATUS[file.status].text }}
                                    </span>
                                </span>
                            </div>
                            <Button v-if="file.status === 'failed'" class="!text-text-red-accent w-fit !p-0" size="xs" variant="link" @click="tryAgain(index)">
                                Try Again
                            </Button>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div
                        class="file-upload__item"
                    >
                        <Icon
                            name="ri:folder-2-line"
                            class="text-zinc-300 size-12 flex-shrink-0"
                        />
                        <div class="file-upload__item__info">
                            <div class="file-upload__item__header">
                                <div class="flex items-center gap-2">
                                    <p class="file-upload__item__name">
                                        Grouped Files
                                        <Badge stroke="none" class="ml-2">
                                            {{ groupItem.files.length }}
                                        </Badge>
                                    </p>
                                </div>
                                <div class="flex gap-1">
                                    <Button variant="secondary" class="file-upload__item__list" size="xs" :disabled="STATUS[getGroupStatus(groupItem.files)].text === 'Uploading...'" @click="groupItem.files[0] && openSheet(groupItem.files[0])">
                                        <Icon name="ri:list-check" class="file-upload__item__list-icon" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="xs"
                                        class="file-upload__item__remove"
                                        :disabled="STATUS[getGroupStatus(groupItem.files)].text === 'Uploading...'"
                                        @click="removeGroup(groupItem.gid)"
                                    >
                                        <Icon name="ri:close-line" class="file-upload__item__remove-icon" />
                                    </Button>
                                </div>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="file-upload__item__size">
                                    <span>
                                        {{ groupItem.files.length }} Files
                                    </span>
                                    ∙
                                    <span class="flex items-center gap-2">
                                        <Icon
                                            :name="STATUS[getGroupStatus(groupItem.files)].icon"
                                            class="size-3"
                                            :class="STATUS[getGroupStatus(groupItem.files)].color"
                                        />
                                        {{ STATUS[getGroupStatus(groupItem.files)].text }}
                                    </span>

                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
        </div>
        <FileUploadSheets
            v-model:is-open="isSheetOpen"
            :file="selectedFile"
            :group-files="selectedGroupFiles"
            @try-again="tryAgain"
            @remove="removeGroupFile"
            @update-group-files="updateGroupFiles"
        />
    </div>
</template>

<style lang="postcss" scoped>
.file-upload {
    @apply flex flex-col gap-4;

    .file-upload-drop-zone {
        @apply mt-2 flex justify-center rounded-xl border border-dashed border-gray-900/25 px-6 py-10;

        &--over {
            @apply border-gray-900/50;
        }

        &__content {
            @apply text-center flex flex-col gap-2;
        }

        &__icon {
            @apply mx-auto size-6 text-text-primary;
        }

        &__text {
            @apply mt-4 flex flex-col gap-1;

            &__instruction {
                @apply text-captionL text-text-primary;
            }

            &__formats {
                @apply text-captionM text-text-tertiary;
            }
        }

        &__label {
            @apply mx-auto;
        }

        &__input {
            @apply sr-only;
        }

        &__list {
            @apply py-2 flex flex-col gap-2;
        }
    }

    &__item {
        @apply flex gap-3 items-start rounded-xl border bg-white p-4 hover:shadow-xs;

        &__icon {
            @apply size-12 text-gray-200 relative;
        }

        &__info {
            @apply flex w-full flex-col gap-1;

            .badge {
                @apply bg-gray-100 text-text-primary text-captionS px-2 py-0.5 rounded-md inline-flex;
            }
        }

        &--grouped {
            @apply bg-white;
        }

        &__header {
            @apply flex items-center justify-between;
        }

        &__name {
            @apply max-w-xs truncate text-captionL font-medium;
        }

        &__remove,&__list {
            @apply rounded-xl aspect-square;
        }

        &__remove-icon,&__list-icon {
            @apply text-captionL;
        }

        &__size {
            @apply flex gap-1 text-captionM text-gray-500;
        }
    }

    .error-message {
        @apply text-red-500 h-6 text-captionM mt-2;
    }

    .file-list {
        @apply mt-4;

        h3 {
            @apply text-captionL font-medium;
        }

        ul {
            @apply list-disc pl-5;

            li {
                @apply mt-2;
            }
        }
    }

    .iconify[data-ext]::after {
        @apply inline-flex items-center gap-2 px-1 py-0.5 uppercase rounded-sm text-white text-captionS font-medium absolute top-2/3 -translate-y-1/2;
        content: attr(data-ext);

        &.pdf {
            @apply bg-red-500;
        }

        &.docx {
            @apply bg-blue-500;
        }

        &.xlsx {
            @apply bg-green-500;
        }

        &.pptx {
            @apply bg-yellow-500;
        }

        &.txt {
            @apply bg-gray-600;
        }

        &.jpg,
        &.jpeg,
        &.png,
        &.gif,
        &.svg,
        &.webp,
        &.bmp {
            @apply bg-gray-500;
        }

        &.zip,
        &.rar,
        &.7z {
            @apply bg-purple-500;
        }

        &.mp3,
        &.wav,
        &.flac,
        &.aac,
        &.ogg {
            @apply bg-pink-500;
        }

        &.mp4,
        &.mkv,
        &.avi,
        &.mov,
        &.wmv,
        &.flv,
        &.webm {
            @apply bg-indigo-500;
        }

        &.group {
            @apply bg-blue-500;
            content: "GROUP";
        }
    }
}
</style>
