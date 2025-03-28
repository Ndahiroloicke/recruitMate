<script setup lang="ts">
const import_candidates = [
    {
        key: '1',
        icon: 'ri:file-upload-line',
        title: 'Import new Candidates',
        description: 'Imports your candidate information in docx, xlsx, pdf formats',
    },
    {
        key: '2',
        icon: 'ri:group-line',
        title: 'Existing Campaign Candidates',
        description: 'Import candidates from other campaigns',
    },
    {
        key: '3',
        icon: 'ri:linkedin-fill',
        title: 'Import with Linkedin URL',
        description: 'Adding candidates with linkedin url',
    },
]
</script>

<template>
    <div>
        <FormField v-slot="{ componentField }" name="importCandidates">
            <CommonApplicationRadioGroup :data="import_candidates" v-bind="componentField" />
        </FormField>
    </div>
</template>
