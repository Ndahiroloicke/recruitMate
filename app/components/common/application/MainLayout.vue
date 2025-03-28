<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
    title: string
    description?: string
    isShowBackButton?: boolean
    backRouter?: string
    backButtonIcon?: string
    isLoading?: boolean
}

const props = defineProps<Props>()
const slots = defineSlots()
const router = useRouter()
function handleBackButton() {
    if (props?.backRouter) {
        router.push(props?.backRouter)
        return
    }
    router.push(`/app`)
}
</script>

<template>
    <div class="pageLayout" :class="{ pageLayout__withUnderLayout: slots.underLayout }">
        <div class="pageLayout_wrapper clamp">
            <div v-if="props.isShowBackButton">
                <Icon name="ri:arrow-left-line" :class="backButtonIcon" class="pageLayout_backButton" @click="handleBackButton" />
            </div>
            <div class="pageLayout_container">
                <div class="pageLayout_row">
                    <div v-if="slots.logos || slots.avatar">
                        <slot name="logos" />
                        <slot name="avatar" />
                    </div>
                    <div class="pageLayout_contentWrapper">
                        <div class="pageLayout_titleSection">
                            <div class="pageLayout_titleContainer">
                                <div class="pageLayout_titleContent">
                                    <slot name="subtitle" />
                                    <div class="pageLayout_titleRow">
                                        <h1 v-if="!props.isLoading" class="pageLayout_title">
                                            {{ props.title }}
                                        </h1>
                                        <slot name="status" />
                                        <Skeleton v-if="props.isLoading" class="pageLayout_titleSkeleton" />
                                        <slot name="headerContent" />
                                    </div>
                                </div>
                            </div>
                            <p v-if="props.description && !props.isLoading" class="pageLayout_description">
                                {{ props.description }}
                            </p>
                            <Skeleton v-if="props.isLoading" class="pageLayout_descriptionSkeleton" />
                        </div>
                        <div class="pageLayout_actions">
                            <Skeleton v-if="props.isLoading" class="pageLayout_actionsSkeleton" />
                            <slot v-else name="actions" />
                        </div>
                    </div>
                </div>
                <slot name="breadcrumbs" />
                <slot name="underLayout" />
            </div>
        </div>
        <div class="pageLayout_tabs clamp">
            <slot name="tabs" />
        </div>
        <div class="pageLayout_divider" />

        <div class="pageLayout_content clamp">
            <slot name="main" />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.pageLayout {
    @apply mx-auto w-full;

    &_wrapper {
        @apply flex flex-col px-6 sm:px-4 pb-8 pt-5 gap-5 w-full sm:flex-row;
    }

    &_container {
        @apply flex flex-col gap-3 w-full;
    }

    &_row {
        @apply flex gap-3 w-full sm:flex-row flex-col;
    }

    &_contentWrapper {
        @apply flex flex-col justify-between sm:flex-row flex-wrap gap-3 w-full;
    }

    &_titleSection {
        @apply flex flex-col flex-wrap gap-0.5 min-w-fit;
    }

    &_titleContainer {
        @apply flex flex-row flex-wrap gap-3 items-end justify-between w-full;
    }

    &_titleContent {
        @apply flex flex-col gap-0.5;
    }

    &_titleRow {
        @apply flex items-center gap-3;
    }

    &_titleSkeleton {
        @apply h-6 w-20;
    }

    &_descriptionSkeleton {
        @apply h-5 w-32 mt-2;
    }

    &_actions {
        @apply flex items-center gap-4 w-full sm:w-auto;
    }

    &_actionsSkeleton {
        @apply w-full h-7 sm:h-9 sm:w-32 rounded-[10px];
    }

    &_backButton {
        @apply w-6 h-6 mt-1 text-text-secondary hover:text-text-primary cursor-pointer;
    }

    &_headerContainer {
        @apply flex flex-col sm:flex-row sm:justify-between items-start py-0 sm:pt-3 w-full gap-3 text-text-secondary;
    }

    &_header {
        @apply flex flex-row items-start sm:ml-0 gap-5;
    }

    &_headerContent {
        @apply flex flex-col gap-3;
    }

    &_tabs {
        @apply px-6 sm:px-4;
    }

    &_titleContainer {
        @apply flex items-center gap-3 flex-wrap;
    }

    &_title {
        @apply text-h6 font-semibold text-text-primary text-nowrap;
    }

    &_description {
        @apply text-bodyM leading-5 text-text-secondary;
    }

    &_divider {
        @apply h-px bg-border-base-divider;
    }

    &_content {
        @apply w-full px-0 sm:px-4;
    }
}

@screen sm {
    .pageLayout {
        &__header {
            @apply pb-10 pt-7 flex flex-row mx-auto items-end;
        }
    }
}
</style>
