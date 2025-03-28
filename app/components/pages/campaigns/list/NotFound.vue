<script setup lang="ts">
import CandidateImportModal from '@/components/common/general/modals/Import.vue'

const modal = useModal()

function handleImportButton() {
    modal.open(CandidateImportModal, {
        name: 'candidate-import',
        loading: false,
    })
}
</script>

<template>
    <div class="mt-20">
        <CommonGeneralNotFound
            title="Let’s Find Your Perfect Candidate"
            description="You've justarted! Import your candidates to continue"
        >
            <template #image>
                <NuxtImg src="/images/no_data.svg" width="462px" height="305px" alt="Not Found Image" />
            </template>
            <template #buttons>
                <Button class="min-w-[149px]" variant="secondary" @click="handleImportButton">
                    <Icon name="ri:upload-cloud-2-line" class="icon" />
                    Import Candidates
                </Button>
            </template>
        </CommonGeneralNotFound>
    </div>
</template>
