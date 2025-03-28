<script setup lang="ts">
import type { ParsedData } from '~/server/utils/parseResume'
import { useFormContext } from 'vee-validate'

const resumesStatus = ref<{ fileName: string, status: 'success' | 'uploading' | 'failed', errorMessage?: string }[]>([])

interface ResumeData {
    content: ParsedData
    filename?: string
}

const resumes = ref<ResumeData[]>([])
const { setFieldValue } = useFormContext()

async function uploadSingleFile(files: File[]) {
    const formData = new FormData()
    files.forEach((file) => {
        formData.append('files', file)
    })

    files.forEach((file) => {
        resumesStatus.value.push({
            fileName: file.name,
            status: 'uploading' as const,
        })
    })

    try {
        const data = await $fetch('/api/campaign/create/resume', {
            method: 'POST',
            body: formData,
        })

        if (data && 'data' in data && Array.isArray(data.data)) {
            // Update status for all files at once
            files.forEach((file) => {
                const index = resumesStatus.value.findIndex(r => r.fileName === file.name)
                if (index !== -1) {
                    resumesStatus.value[index].status = 'success'
                }
            })

            // Process all parsed resumes
            const newResumes = data.data as ResumeData[]
            resumes.value.push(...newResumes)
            
            // Update form with ALL valid resumes, including previous ones
            const allValidResumes = resumes.value.filter(resume => 
                resume.content && 
                resume.content.isValid === true
            )
            
            if (allValidResumes.length > 0) {
                const formattedResumes = allValidResumes.map(r => ({
                    ...r.content,
                    Name: r.content.Name || null,
                    'Contact Information': {
                        email: r.content['Contact Information']?.email || null,
                        phone: r.content['Contact Information']?.phone || null
                    },
                    isValid: true,
                    Education: r.content.Education || [],
                    'Work Experience': r.content['Work Experience'] || [],
                    Skills: r.content.Skills || [],
                    Certifications: r.content.Certifications || [],
                    Summary: r.content.Summary || null,
                    'Trait Personality': r.content['Trait Personality'] || [],
                    Slogan: r.content.Slogan || null,
                    'Personal Info': r.content['Personal Info'] || []
                }))
                await setFieldValue('importNewCandidates', JSON.stringify(formattedResumes))
                await setFieldValue('importCandidates', '1')
                console.log('Total valid resumes:', formattedResumes.length)
            }
        }
    }
    catch (err: any) {
        console.error('Upload error:', err)
        files.forEach((file) => {
            const index = resumesStatus.value.findIndex(r => r.fileName === file.name)
            const fileStatus = resumesStatus.value[index]
            if (fileStatus) {
                fileStatus.status = 'failed'
                fileStatus.errorMessage = err?.message || 'Failed to upload due to network or server error.'
            }
        })
    }
}

// Update computed property to use isValid flag
const hasValidResumes = computed(() => {
    return resumes.value.some(resume => resume.content && resume.content.isValid)
})

async function handleFileUpload(filesInput: FileList | File[]) {
    const files = Array.from(filesInput instanceof FileList ? filesInput : filesInput)

    if (!files || files.length === 0) {
        console.error('No files to upload.')
        return
    }

    resumesStatus.value = resumesStatus.value.filter(status =>
        !files.some(file => file.name === status.fileName),
    )

    await uploadSingleFile(files)
}

function handleFileRemoved(fileName: string) {
    resumesStatus.value = resumesStatus.value.filter(status => status.fileName !== fileName)
    resumes.value = resumes.value.filter(status => status.filename !== fileName)
}
</script>

<template>
    <FormField v-slot="{ componentField }" name="importNewCandidates">
        <CommonGeneralFileUpload
            :model-value="componentField.modelValue"
            :data="resumes.map(r => r.content)"
            :formats="['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']"
            :multiple="true"
            :max-file-size="2097152"
            label-text="Browse File"
            description="DOCX, PDF, CSV and XLSX formats, up to 2 MB."
            :files-status="resumesStatus"
            @update:model-value="componentField['onUpdate:modelValue']"
            @change="handleFileUpload"
            @file-removed="handleFileRemoved"
        />
    </FormField>
</template>
