<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const settingTab = computed<string>({
    get() {
        return route.fullPath.includes('general') ? 'general' : 'members'
    },
    set(newTab: string) {
        const newPath = `/app/:teamId/teams-settings/${newTab}`
        if (route.fullPath !== newPath) {
            router.push(newPath)
        }
    },
})
</script>

<template>
    <div class="settings">
        <div class="settings__container">
            <CommonApplicationMainLayout
                title="Teams Settings"
                description="Manage your team settings and members"
                class="settings__layout"
            >
                <template #tabs>
                    <Tabs
                        v-model="settingTab"
                        variant="underline"
                    >
                        <TabsList class="settings__tabs-list">
                            <TabsTrigger value="general" class="settings__tab-trigger">
                                General
                            </TabsTrigger>
                            <TabsTrigger value="members" class="settings__tab-trigger">
                                Members
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </template>
            </CommonApplicationMainLayout>

            <NuxtPage />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.settings {
    @apply flex items-start justify-center h-full;

    &__layout {
        @apply w-full flex flex-col;

        .pageLayout_clamp {
            @apply !pb-0;
        }
    }

    &__container {
        @apply w-full mx-auto;
    }

    &__tabs-list {
        @apply flex gap-4 px-0;
    }
}
</style>
