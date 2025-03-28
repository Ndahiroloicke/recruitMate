<script lang="ts" setup>
import { Toaster } from 'vue-sonner'

useApp()
</script>

<template>
    <NuxtLayout>
        <Toaster />
        <CommonGeneralModal />
        <NuxtPage />
    </NuxtLayout>
</template>
