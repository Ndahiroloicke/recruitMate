<script setup lang="ts">
import DeleteEmailTemplate from '~/components/common/general/modals/DeleteEmailTemplate.vue'
import { TEMPLATE_TAGS } from '~/constants/email'
import { useCampaignCreate } from '~/store/campaigns/create'

const campaignCreate = useCampaignCreate()

function toCreateNewTemplate() {
    campaignCreate.subStep = 2
    campaignCreate.templateId = null
}
function toEditTemplate(templateId: number) {
    campaignCreate.subStep = 2
    campaignCreate.templateId = templateId
}
function handleBack() {
    campaignCreate.stepIndex = 3
    campaignCreate.templateId = null
    campaignCreate.subStep = 0
}

const modal = useModal()
function openModal(templateId: number) {
    campaignCreate.templateId = templateId
    modal.open(DeleteEmailTemplate, {
        name: 'example',
        loading: false,
        deleteFn: handleDelete,
    })
}
const { data: response, status, refresh } = useFetch('/api/campaign/email/template', {
    method: 'GET',
})

async function handleDelete() {
    try {
        if (!campaignCreate.templateId) {
            console.error('No templateId found to delete.')
            return
        }
        const { status, error } = await useFetch(`/api/campaign/email/template/${campaignCreate.templateId.toString()}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (status.value === 'success') {
            await refresh()
        }
        else {
            console.error('Error deleting template:', error.value || 'Unknown error')
        }
    }
    catch (err) {
        console.error('Unexpected error:', err)
    }
}

const templateEmails = computed(() => response.value?.data || [])
</script>

<template>
    <FormField v-slot="{ meta, componentField }" name="readyMadeTemplate">
        <div>
            <div class="ready-made-templates">
                <div class="flex justify-between items-center">
                    <Button variant="tertiary" @click="handleBack">
                        <Icon name="ri:arrow-left-s-line" class="size-5" />
                        Back
                    </Button>

                    <Button type="submit" :disabled="!meta.valid" variant="primary">
                        Complete
                        <Icon name="ri:check-fill" class="size-5" />
                    </Button>
                </div>

                <div class="ready-made-templates__container">
                    <button class="ready-made-templates__new-button" @click="toCreateNewTemplate">
                        <Icon name="ri:mail-add-line" class="ready-made-templates__icon" />
                        <div class="ready-made-templates__info">
                            <div class="ready-made-templates__title">
                                Create New Template
                            </div>
                            <div class="ready-made-templates__description">
                                Design a custom email template tailored to your needs.
                            </div>
                        </div>
                    </button>

                    <template v-if="status === 'success'">
                        <div
                            v-for="template in templateEmails"
                            :key="template.id"
                            class="ready-made-templates__template"
                            :class="{ 'ready-made-templates__template--active': template.id === componentField.modelValue }"
                            @click="componentField['onUpdate:modelValue']?.(Number(template.id))"
                        >
                            <div class="ready-made-templates__template-content">
                                <div class="ready-made-templates__template-tags">
                                    <Badge
                                        v-for="tag in template.tags"
                                        :key="tag"
                                        :color="(TEMPLATE_TAGS as any)[tag] || 'gray'"
                                        size="md"
                                        shape="pill"
                                    >
                                        {{ tag }}
                                    </Badge>
                                </div>

                                <div class="ready-made-templates__template-subject">
                                    {{ template.title }}
                                </div>
                                <div class="ready-made-templates__template-body">
                                    {{ template.description ? `${template.description.slice(0, 100)}...` : '' }}
                                </div>
                            </div>
                            <div class=" w-full flex gap-1">
                                <Button
                                    type="button"
                                    :variant="componentField.modelValue === template.id ? 'primary' : 'secondary'"
                                    class="ready-made-templates__select-button"
                                >
                                    {{ componentField.modelValue === template.id ? 'Selected' : 'Select' }}
                                    <Icon :name="componentField.modelValue === template.id ? 'ri:close-fill' : 'ri:check-line'" />
                                </Button>
                                <Button variant="destructiveTertiary" @click="openModal(template.id)">
                                    <Icon name="ri:delete-bin-line" />
                                </Button>
                                <Button variant="secondary" @click="toEditTemplate(template.id)">
                                    <Icon name="i-ri:edit-2-line" />
                                </Button>
                            </div>
                        </div>
                    </template>
                    <SkeletonCamapignCreateReadyTemplate v-else />
                </div>
            </div>
        </div>
    </FormField>
</template>

<style lang="postcss" scoped>
.ready-made-templates {
    @apply flex flex-col gap-8 py-6 px-4;

    &__container {
        @apply w-full grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] gap-6;
    }

    &__new-button {
        @apply flex hover:opacity-80 py-12 px-4 flex-col justify-center items-center gap-5 hover:border-border-action-hover;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23333' stroke-width='4' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
        border-radius: 12px;
    }

    &__icon {
        @apply text-text-secondary size-6;
    }

    &__info {
        @apply flex flex-col items-center gap-1;
    }

    &__title {
        @apply text-bodyL font-semibold text-text-primary;
    }

    &__description {
        @apply text-captionL text-gray-500;
    }

    &__template {
        @apply  rounded-2xl border border-border-base-alpha bg-white shadow-xs flex flex-col p-6 justify-between items-start gap-5 flex-1 min-h-[14.5rem] cursor-pointer hover:shadow-sm transition-shadow;

        &--active {
            @apply border-transparent outline outline-2 outline-background-surface-info-accent shadow-md;
        }
    }

    &__template-tags {
        @apply flex gap-2;
    }

    &__template-content {
        @apply flex flex-col gap-2 w-full relative;
    }

    &__template-subject {
        @apply text-bodyL font-semibold text-gray-800 truncate;
    }

    &__template-body {
        @apply text-captionL text-gray-500;
    }

    &__select-button {
        @apply w-full;
    }
}
</style>
