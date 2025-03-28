<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const settingTab = computed<string>({
    get() {
        return route.fullPath.includes('notification') ? 'notification' : 'general'
    },
    set(newTab) {
        const newPath = `/app/:teamsId/settings/${newTab}`

        if (route.fullPath !== newPath) {
            router.push(newPath)
        }
    },
})

definePageMeta({ redirect: () => `/app/:teamId/settings/general` })
</script>

<template>
    <div class="settings">
        <div class="settings__container">
            <CommonApplicationMainLayout
                title="Settings"
                description="View and manage all the campaigns you’ve created!"
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
                            <TabsTrigger value="notification" class="settings__tab-trigger">
                                Notification
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </template>
            </CommonApplicationMainLayout>

            <NuxtPage class="clamp" />
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
