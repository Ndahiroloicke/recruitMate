<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'
import { ref } from 'vue'

const {
    isShowUpdateButton = true,
    defaultImage = '/images/Avatar.svg',
} = defineProps<{
    defaultImage?: string
    isShowUpdateButton?: boolean
}>()

const imageFile = ref<File | null>(null)
const errorMessage = ref<string | null>(null)

const modelValue = defineModel<File | string | null>({
    default: null,
})

const { open, onChange, onCancel } = useFileDialog({
    accept: 'image/png, image/jpeg',
    directory: false,
})

const avatarKey = ref(0)

function handleFile(file: File) {
    const validTypes = ['image/png', 'image/jpeg']

    if (!validTypes.includes(file.type)) {
        errorMessage.value = 'Invalid file type. Please upload a PNG or JPEG image.'
        imageFile.value = null
        modelValue.value = ''
        return
    }

    const img = new Image()
    img.onload = () => {
        if (img.width < 400 || img.height < 400) {
            errorMessage.value = 'Image must be at least 400x400px.'
            imageFile.value = null
            modelValue.value = null
        }
        else {
            errorMessage.value = null
            imageFile.value = file
            modelValue.value = file

            avatarKey.value++
        }
    }
    img.onerror = () => {
        errorMessage.value = 'Invalid image file.'
        imageFile.value = null
        modelValue.value = ''
    }
    img.src = URL.createObjectURL(file)
}

onChange((files) => {
    if (files?.[0]) {
        handleFile(files[0])
    }
})

onCancel(() => {
    console.log('cancel file dialog')
    errorMessage.value = null
    imageFile.value = null
    modelValue.value = defaultImage
})

function remove() {
    modelValue.value = ''
    errorMessage.value = null
    imageFile.value = null
}

defineExpose({
    onCancel: () => {
        modelValue.value = defaultImage
        errorMessage.value = null
        imageFile.value = null
    },
})

const avatarImg = computed<string>(() => typeof modelValue.value === 'string' ? modelValue.value : modelValue.value ? URL.createObjectURL(modelValue.value) : defaultImage)
</script>

<template>
    <div class="avatar-update">
        <Avatar size="lg" class="avatar-update__avatar">
            <AvatarImage :src="avatarImg" alt="User avatar" />
            <AvatarFallback>
                <NuxtImg class="avatar-update__placeholder" :src="defaultImage" alt="Avatar Placeholder" />
            </AvatarFallback>
        </Avatar>

        <div class="avatar-update__content">
            <slot name="content" />
            <div class="avatar-update__actions">
                <div class="avatar-update__buttons">
                    <Button
                        v-if="isShowUpdateButton && modelValue" variant="secondary" class="avatar-update__remove-button"
                        type="button"
                        @click="remove"
                    >
                        Remove
                    </Button>
                    <Button
                        v-if="isShowUpdateButton" variant="secondary" class="avatar-update__upload-button"
                        type="button"
                        @click="open"
                    >
                        {{ modelValue ? 'Update' : 'Upload' }}
                    </Button>
                </div>
            </div>
            <div v-if="errorMessage" class="avatar-update__error-message">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.avatar-update {
    @apply flex gap-5  items-center;

    &__avatar {
        @apply !w-16 !h-16;
    }

    &__placeholder {
        @apply object-cover h-full w-full;
    }

    &__content {
        @apply flex flex-col justify-between gap-1 relative;
    }

    &__actions {
        @apply space-y-3;
    }

    &__buttons {
        @apply flex items-center gap-2;
    }

    &__remove-button {
        @apply w-fit !text-background-badge-red-accent !border-red-500;
    }

    &__upload-button {
        @apply w-fit !text-black;
    }

    &__error-message {
        @apply text-red-500 h-6 text-captionM mt-2;
    }
}
</style>
