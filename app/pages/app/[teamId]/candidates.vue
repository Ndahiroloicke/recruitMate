<script setup lang="ts">
import CandidateImportModal from '@/components/common/general/modals/Import.vue'
import CandidatesTableContainer from '@/components/pages/candidates/index.vue'

const modal = useModal()

function openImportModal() {
    modal.open(CandidateImportModal, {
        name: 'candidate-import',
        loading: false,
    })
}
</script>

<template>
    <div class="page">
        <CommonApplicationMainLayout
            class="candidatePageContent" title="All Candidates"
            description="Hiring a skilled marketing specialist to boost campaign strategies."
        >
            <template #actions>
                <div class="candidatePageContent_actions">
                    <Button variant="secondary" class="candidatePageContent_button" @click="openImportModal">
                        <Icon name="ri:upload-cloud-2-line" class="candidatePageContent_icon" />
                        Import
                    </Button>
                </div>
            </template>

            <template #main>
                <CandidatesTableContainer />
            </template>
        </CommonApplicationMainLayout>
    </div>
</template>

<style lang="postcss" scoped>
.candidatePageContent {
    &_actions {
        @apply w-full shadow-none min-w-full;
    }

    &_button {
        @apply w-full shadow-none min-w-full;
    }

    &_icon {
        @apply w-5 h-5 text-black/60;
    }
}
</style>
