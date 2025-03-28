<script setup lang="ts">
const email_templates = [
    {
        key: '1',
        icon: 'ri:mail-open-line',
        title: 'Choose a ready-made template',
        description: 'Select from pre-designed templates to quickly get started.',
    },
    {
        key: '2',
        icon: 'ri:key-line',
        title: 'Create a new template',
        description: 'Design a custom email template tailored to your needs.',
    },
]
</script>

<template>
    <div>
        <FormField v-slot="{ componentField }" name="emailTemplate">
            <CommonApplicationRadioGroup :data="email_templates" v-bind="componentField" />
        </FormField>
    </div>
</template>
