<script setup lang="ts">
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const props = defineProps<{
    file: { name: string, size: number, type: string, status: 'success' | 'uploading' | 'failed', errorMessage?: string, groupId?: string } | null
    isOpen: boolean
    groupFiles?: { name: string, size: number, status: 'success' | 'uploading' | 'failed', errorMessage?: string, type: string }[]
}>()

const emit = defineEmits(['update:isOpen', 'updateGroupFiles', 'tryAgain', 'remove'])
const files = ref(props.groupFiles ? [...props.groupFiles] : [])

watch(() => props.groupFiles, (newFiles) => {
    files.value = newFiles ? [...newFiles] : []
}, { deep: true })

watch(files, (newFiles) => {
    if (newFiles.length === 0) {
        emit('update:isOpen', false)
    }
}, { deep: true })

function closeSheet() {
    emit('update:isOpen', false)
    files.value = []
}

function tryAgain(fileName: string) {
    const fileIndex = files.value.findIndex(f => f.name === fileName)
    if (fileIndex !== -1) {
        if (files.value[fileIndex]) {
            files.value[fileIndex].status = 'uploading'
        }
        emit('tryAgain', fileName)
    }
}

function removeFile(fileName: string) {
    const fileItem = files.value.find(f => f.name === fileName)
    if (fileItem && fileItem.status === 'uploading') {
        return
    }
    files.value = files.value.filter(f => f.name !== fileName)
    emit('remove', fileName)

    emit('updateGroupFiles', files.value)
}

const groupStatus = computed(() => {
    if (files.value.length === 0)
        return null

    if (files.value.some(f => f.status === 'uploading'))
        return { text: 'Uploading...', color: 'text-yellow-500', icon: 'svg-spinners:8-dots-rotate' }
    if (files.value.every(f => f.status === 'success'))
        return { text: 'Completed', color: 'text-green-500', icon: 'ri:checkbox-circle-fill' }
    if (files.value.some(f => f.status === 'failed'))
        return { text: 'Failed', color: 'text-red-500', icon: 'ri:close-circle-fill' }

    return { text: 'Uploading...', color: 'text-yellow-500', icon: 'svg-spinners:8-dots-rotate' }
})
</script>

<template>
    <Sheet :open="isOpen" @update:open="closeSheet">
        <SheetContent class="!justify-start gap-0">
            <SheetHeader class="pb-0 justify-start">
                <SheetTitle v-if="file" class="sheet__title">
                    <div class="sheet__title-container">
                        {{ file.groupId ? 'Grouped Files' : file.name }}
                        <Badge size="md">
                            {{ files.length }}
                        </Badge>
                    </div>
                    <div v-if="groupStatus" class="sheet__status">
                        <Icon :name="groupStatus.icon" class="sheet__status-icon" :class="groupStatus.color" />
                        <p :class="groupStatus.color">
                            {{ groupStatus.text }}
                        </p>
                    </div>
                </SheetTitle>
            </SheetHeader>

            <div v-if="files.length > 0" class="sheet__file-list">
                <div v-for="(groupFile, index) in files" :key="index" class="file-item">
                    <div class="file-item__details">
                        <Icon name="recruitmate:file" class="file-item__icon flex-shrink-0" :class="groupFile.type.split('/').pop()" :data-ext="groupFile.type.split('/').pop()" />
                        <div class="file-item__info">
                            <span class="file-item__name">{{ groupFile.name }}</span>
                            <div class="file-item__meta">
                                <span class="file-item__size">{{ (groupFile.size / 1024).toFixed(1) }} KB</span>
                            </div>
                        </div>
                    </div>
                    <div class="file-item__actions">
                        <Button v-if="groupFile.status !== 'uploading'" variant="ghost" size="xs" class="file-item__remove" @click="removeFile(groupFile.name)">
                            <Icon name="ri:close-line" class="file-item__remove-icon" />
                        </Button>
                        <Button v-if="groupFile.status === 'failed'" class="!h-fit !p-0 !m-0" size="xs" variant="ghost" @click="tryAgain(groupFile.name)">
                            <span class="text-background-surface-destructive-accent">Try Again</span>
                        </Button>
                    </div>
                </div>
            </div>
        </SheetContent>
    </Sheet>
</template>

<style lang="postcss" scoped>
.sheet__title {
    @apply flex flex-col;
}

.sheet__title-container {
    @apply flex gap-3;
}

.sheet__status {
    @apply flex text-bodyS items-center gap-2 mt-1;
}

.sheet__status-icon {
    @apply size-4;
}

.sheet__file-list {
    @apply mt-2 overflow-y-auto;
}

.file-item {
    @apply px-6 flex items-center justify-between border-b border-gray-200 py-2;
}

.file-item__details {
    @apply flex items-center gap-2;
}

.file-item__icon {
    @apply size-10 text-gray-400 relative;
}

.file-item__info {
    @apply flex flex-col;
}

.file-item__name {
    @apply font-medium text-bodyS max-w-64 w-full truncate;
}

.file-item__meta {
    @apply flex gap-2 text-captionM;
}

.file-item__size {
    @apply text-gray-500;
}

.file-item__status {
    @apply flex items-center gap-1;
}

.file-item__actions {
    @apply flex gap-2;
}

.file-item__remove {
    @apply p-0;
}

.file-item__remove-icon {
    @apply size-4 text-icon-static-dark-secondary;
}

.iconify[data-ext]::after {
    @apply inline-flex items-center gap-2 px-1 py-0.5 uppercase rounded-sm text-white text-captionS font-medium absolute top-2/3 -translate-y-1/2;
    content: attr(data-ext);
}

.iconify[data-ext="pdf"]::after { @apply bg-red-500; }
.iconify[data-ext="docx"]::after { @apply bg-blue-500; }
.iconify[data-ext="xlsx"]::after { @apply bg-green-500; }
.iconify[data-ext="pptx"]::after { @apply bg-yellow-500; }
.iconify[data-ext="txt"]::after { @apply bg-gray-600; }
.iconify[data-ext="jpg"],
.iconify[data-ext="jpeg"],
.iconify[data-ext="png"],
.iconify[data-ext="gif"],
.iconify[data-ext="svg"],
.iconify[data-ext="webp"],
.iconify[data-ext="bmp"]::after { @apply bg-gray-500; }
.iconify[data-ext="zip"],
.iconify[data-ext="rar"],
.iconify[data-ext="7z"]::after { @apply bg-purple-500; }
</style>
