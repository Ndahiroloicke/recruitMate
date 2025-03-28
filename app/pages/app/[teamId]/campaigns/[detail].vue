<script setup lang="ts">
import CandidateImportModal from '@/components/common/general/modals/Import.vue'
import PagesCampaignsDetailContainer from '@/components/pages/campaigns/detail/index.vue'
import CampaignsStatus from '@/components/pages/campaigns/status.vue'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/vue-3'
import CampaignsDetail from '~/components/common/application/infoCard/detail.vue'
import CampaignDetailEdit from '~/components/common/general/modals/CampaignDetailEdit.vue'
import CampaignPreviewEmail from '~/components/common/general/modals/CampaignPreviewEmail.vue'

const MockListData = [
    {
        name: 'John Doe',
        last_name: 'Doe',
        slug: 'test-1',
        recruiter_id: 1,
        position: 'Frontend Developer',
        company: 'Google',
        candidates: [1],
    },
]

interface CampaignDetailType {
    id?: number
    name?: string
    description?: string
    hiring_company?: string
    status?: string
    company_logo?: string
    stats?: Record<string, any>
}

const editor = useEditor({
    content: '',
    editorProps: {
        attributes: {
            class: 'dialog__preview_email_editor__content',
        },
    },
    extensions: [StarterKit],
})

const subjectEditor = useEditor({
    content: '',
    editorProps: {
        attributes: {
            class: 'dialog__preview_email_editor_input__content',
        },
    },
    extensions: [StarterKit],
})

const route = useRoute<'app-teamId-campaigns-detail'>()
const modal = useModal()

const campaignId = route.params.detail?.toString() || ''
const url = `/api/campaign/${campaignId}` as '/api/campaign/:id'

const { data: response, status, refresh } = await useFetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})

function openEditModal() {
    modal.open(CampaignDetailEdit, {
        name: 'Campaign Detail Edit',
        loading: false,
        editFn: handleUpdate,
        data: response.value,
    })
}

function openPreviewModal() {
    modal.open(CampaignPreviewEmail, {
        name: 'Campaign Preview Email',
        loading: false,
        data: response.value,
        editor,
        subjectEditor,
    })
}

function openImportModal() {
    modal.open(CandidateImportModal, { name: 'candidate-import', loading: false })
}

const campaignDetail = computed<CampaignDetailType>(() => response.value?.data || {})

async function handleUpdate(formData: Record<string, any>) {
    if (!campaignDetail?.value?.id)
        return
    try {
        const formDataPayload = new FormData()

        for (const key in formData) {
            formDataPayload.append(key, formData[key])
        }

        const { data, status, error } = await useFetch(url, {
            method: 'PUT',
            body: formDataPayload,
        })
        if (status.value === 'success') {
            await refresh()
            console.log('Fetched data:', data)
        }
        else {
            console.error('Error editing campaign:', error.value || 'Unknown error')
        }
    }
    catch (err) {
        console.error('Unexpected error:', err)
    }
}
provide('editor', editor)
provide('subjectEditor', subjectEditor)
</script>

<template>
    <CommonApplicationMainLayout
        :is-show-back-button="true" class="campaignsPageContent"
        :title="campaignDetail?.name || ''" :description="campaignDetail?.description || ''"
    >
        <template #subtitle>
            <span class="campaignsPageContent_subtitle">
                {{ campaignDetail?.hiring_company || 'N/A' }}
            </span>
        </template>
        <template #status>
            <CampaignsStatus :status="campaignDetail?.status || 'default-status'" />
        </template>
        <template #avatar>
            <Avatar size="xl" shape="square">
                <AvatarImage
                    class="object-fit h-full w-full"
                    :src="campaignDetail?.company_logo || '/images/Company.svg'" alt="Company Logo"
                />
                <AvatarFallback>
                    <NuxtImg
                        class="object-fit h-full w-full"
                        :src="campaignDetail?.company_logo || '/images/Company.svg'" alt="Company Logo Placeholder"
                    />
                </AvatarFallback>
            </Avatar>
        </template>
        <template #underLayout>
            <div class=" mt-4">
                <SkeletonCampaignDetail v-if="status === 'pending'" />
                <CampaignsDetail v-else :data="campaignDetail?.stats" />
            </div>
        </template>

        <template #actions>
            <div class="campaignsPageContent_actions">
                <Button variant="secondary" @click="openEditModal">
                    <Icon name="ri:edit-2-line" class="campaignsPageContent_icon" />
                    Edit
                </Button>

                <Button variant="secondary" @click="openImportModal">
                    <Icon name="ri:filter-line" class="campaignsPageContent_icon" />
                    Import
                </Button>

                <Button v-if="MockListData.length" variant="black" @click="openPreviewModal">
                    <Icon name="ri:asterisk" class="campaignsPageContent_beginCampaignIcon" />
                    Begin Campaign
                </Button>
            </div>
        </template>

        <template #main>
            <PagesCampaignsDetailContainer :data="MockListData" />
        </template>
    </CommonApplicationMainLayout>
</template>

<style lang="postcss" scoped>
.campaignsPageContent {
    &_actions {
        @apply w-full flex gap-2;
    }

    &_icon,
    &_beginCampaignIcon {
        @apply w-5 h-5;
    }

    &_icon {
        @apply text-black/60;
    }

    &_subtitle {
        @apply font-medium text-bodyM text-secondary/60;
    }
}
</style>
