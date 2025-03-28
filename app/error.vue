<script setup lang="ts">
import type { NuxtError } from '#app'
import { StatusCodes } from 'http-status-codes'
import Background from '~/components/common/general/Background.vue'

const props = defineProps({
    error: Object as () => NuxtError,
})

const handleBackHome = () => clearError({ redirect: '/' })
const handleHelp = () => clearError({ redirect: '/help' })

const notFoundStatusImage = `/images/${props?.error?.statusCode}.svg`
const defaultImages = '/images/notfound_default_image.svg'

function getImage() {
    if (props?.error?.statusCode === StatusCodes.NOT_FOUND) {
        return {
            image: notFoundStatusImage,
            settings: {
                width: 500,
                height: 329.17,
            },
        }
    }
    return {
        image: defaultImages,
        settings: {
            width: 462,
            height: 305,
        },
    }
}

function getTitle() {
    if ((props.error?.statusCode ?? 0) === StatusCodes.NOT_FOUND) {
        return 'Page Not Found'
    }
    return 'Something Went Wrong'
}

function getDescription() {
    if ((props.error?.statusCode ?? 0) === StatusCodes.NOT_FOUND) {
        return 'No such page found. Return to home page or ask for help.'
    }
    return 'An error occurred. Please try again later.'
}
</script>

<template>
    <Background>
        <div class="flex justify-center items-center h-full">
            <CommonGeneralNotFound :title="getTitle()" :description="getDescription()">
                <template #image>
                    <NuxtImg
                        :src="getImage().image" :width="getImage().settings.width"
                        :height="getImage().settings.height" alt="Not Found Image"
                    />
                </template>
                <template #buttons>
                    <Button
                        class="!rounded-[12px] !shadow-none min-w-[149px]" variant="secondary"
                        @click="handleBackHome"
                    >
                        <Icon name="ri:home-line" class="icon" />
                        Back to Home
                    </Button>
                    <Button class="!rounded-[12px] min-w-[149px]" variant="black" @click="handleHelp">
                        <Icon name="mingcute:question-line" class="icon" />
                        Help
                    </Button>
                </template>
            </CommonGeneralNotFound>
        </div>
    </Background>
</template>

<style lang="postcss" scoped>
.icon {
    @apply w-5 h-5
}
</style>
