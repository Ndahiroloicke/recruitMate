<script setup lang="ts">
import type { FormValidationResult, GenericObject } from 'vee-validate'
import type { GlobalModal, GlobalModalEmits } from '~/types/modal'
import type { ParsedData } from '~/server/utils/parseResume'
import { toTypedSchema } from '@vee-validate/zod'
import { ref, computed, watch, onMounted } from 'vue'
import { StepTwo } from '~/components/pages/campaigns/create'
import { importNewCandidateSchema } from '~/lib/validation/campaignCreate'
import Divider from '../Divider.vue'

interface Props extends GlobalModal {
    onSuccess?: () => Promise<void>
}

interface ResumeData {
    content: ParsedData
    filename?: string
}

const props = defineProps<Props>()
const emit = defineEmits<GlobalModalEmits>()

const formData = ref({
    importCandidates: '1',
    importNewCandidates: ''
})

const resumes = ref<ResumeData[]>([])
const isUploading = ref(false)
const uploadComplete = ref(false)
const isCompleting = ref(false)

const hasValidResumes = computed(() => {
    return resumes.value.some(resume => 
        resume.content && 
        resume.content.isValid === true
    )
})

const isImportEnabled = computed(() => {
    return hasValidResumes.value && uploadComplete.value && !isUploading.value
})

async function onSubmit(values: GenericObject) {
    if (!hasValidResumes.value) return

    try {
        isCompleting.value = true
        
        const validResumes = resumes.value.filter(resume => 
            resume.content && 
            resume.content.isValid === true
        )

        const formattedResumes = validResumes.map(r => ({
            ...r.content,
            Name: r.content.Name || null,
            'Contact Information': {
                email: r.content['Contact Information']?.email || null,
                phone: r.content['Contact Information']?.phone || null
            },
            'Work Experience': r.content['Work Experience'] || [],
            Education: r.content.Education || [],
            Skills: (r.content.Skills || []).map(skill => skill || null),
            Certifications: (r.content.Certifications || []).map(cert => cert || null),
            Summary: r.content.Summary || null,
            'Trait Personality': (r.content['Trait Personality'] || []).map(trait => trait || null),
            Slogan: r.content.Slogan || null,
            'Personal Info': (r.content['Personal Info'] || []).map(info => info || null),
            isValid: true
        }))

        const { data } = await useFetch('/api/candidates/import', {
            method: 'POST',
            body: {
                candidates: formattedResumes
            }
        })

        if (data.value) {
            if (props.onSuccess) {
                await props.onSuccess()
            }
            emit('close')
        }
    } catch (error) {
        console.error('Import error:', error)
    } finally {
        isCompleting.value = false
    }
}

function handleResumesParsed(parsedResumes: ResumeData[]) {
    resumes.value = parsedResumes
    uploadComplete.value = true
    
    if (parsedResumes.length > 0) {
        const validResumes = parsedResumes.filter(r => r.content?.isValid)
        if (validResumes.length > 0) {
            formData.value.importNewCandidates = JSON.stringify(validResumes.map(r => r.content))
        }
    }
}

// Reset upload state when modal is opened
onMounted(() => {
    uploadComplete.value = false
    isUploading.value = false
    resumes.value = []
})
</script>

<template>
    <Dialog :open="true" @close="emit('close')">
        <DialogContent class="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle>Import Candidates</DialogTitle>
                <DialogDescription>
                    Upload candidate resumes to import
                </DialogDescription>
            </DialogHeader>

            <Divider />

            <Form
                :validation-schema="toTypedSchema(importNewCandidateSchema)"
                :initial-values="formData"
                class="space-y-4"
                @submit="onSubmit"
            >
                <StepTwo.ImportNewCandidate @resumes-parsed="handleResumesParsed" />

                <DialogFooter>
                    <Button type="button" variant="outline" @click="emit('close')">
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        :disabled="!isImportEnabled"
                        :loading="isCompleting"
                    >
                        {{ isCompleting ? 'Completing...' : 'Complete' }}
                    </Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    </Dialog>
</template>

<style scoped lang="postcss">
.dialog {
    &__content {
    @apply w-full pt-0 py-5 md:pt-5 px-0;
  }

  &__header {
    @apply flex gap-3 mx-5 mb-4 items-center max-w-[404px];
  }

  &__header-container{
   @apply flex flex-col
  }

  &__header-title{
   @apply  font-medium
  }

  &__body {
    @apply mx-5 mb-7 flex flex-col gap-3 mt-2;
  }

  &__description {
    @apply text-captionM text-text-secondary;
  }

  &__icon{
    @apply flex items-center justify-center h-10 w-10
  }

  &__field{
        @apply flex flex-col gap-2;
    }

  &__footer {
    @apply sm:justify-start grid grid-cols-2 gap-2 px-5;
  }

  &__label{
    @apply text-bodyS;
  }

  &__required{
    @apply text-text-red-accent;
  }

  &__user {
    @apply flex gap-2 items-center ;
  }

  &__header-icon {
    @apply text-text-tertiary;
  }

    &__form-container {
        @apply flex flex-col gap-4 mt-4 px-4   md:mx-auto;

        &.no-clamp {
            @apply max-w-full p-0 m-0;
        }
    }

    &__footer {
        @apply flex items-center justify-between mt-4 px-4  md:mx-auto;
    }

    &__footer-buttons {
        @apply flex items-center justify-between gap-3 w-full ;
            button{
                @apply w-full
            }
    }
    &__import-button{
       @apply flex items-center justify-center gap-2
    }
}
</style>
