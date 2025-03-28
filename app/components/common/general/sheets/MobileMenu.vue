<script setup lang="ts">
import type { GlobalModal, GlobalModalEmits } from '~/types/modal'
import type { RouteRecordPath } from '~/types/route'
import { VisuallyHidden } from 'radix-vue'
import { useRoute } from 'vue-router'
import { useAuth } from '~/store/auth'

defineOptions({
    inheritAttrs: false,
})

defineProps<Props>()
const emit = defineEmits<GlobalModalEmits>()

interface Props extends GlobalModal {}

interface Navigation {
    title: string
    icon: string
    to: RouteRecordPath
    count?: number
}

const modelValue = defineModel({
    type: Boolean,
    default: false,
})

const user = useSupabaseUser()
const auth = useAuth()
const route = useRoute()

function handleNavigation() {
    emit('hide')
}

function isActive(path: string) {
    const resolvedPath = path.replace(':teamId', route.params.teamId as string)
    return route.path.startsWith(resolvedPath)
}

const NavigationContent: Navigation[] = [
    { title: 'Campaign', icon: 'ri:newspaper-line', to: `/app/:teamId/campaigns` },
    { title: 'Candidates', icon: 'ri:group-line', to: `/app/:teamId/candidates` },
    { title: 'Team Settings', icon: 'ri:team-line', to: `/app/:teamId/teams-settings/` },
    { title: 'Notifications', icon: 'ri:notification-3-line', to: `/app/:teamId/notifications`, count: 1 },
    { title: 'Settings', icon: 'ri:settings-3-line', to: `/app/:teamId/settings` },
    { title: 'Inbox', icon: 'ri:question-line', to: `/app/:teamId/inbox/` },
]
</script>

<template>
    <Sheet
        v-model:open="modelValue"
        @update:open="($event) => {
            if (!$event) {
                emit('hide')
            }
        }"
    >
        <SheetContent side="left" class="mobile-menu">
            <SheetHeader>
                <VisuallyHidden as-child>
                    <SheetTitle>Mobile Menu</SheetTitle>
                </VisuallyHidden>

                <CommonGeneralLayoutLogo />
            </SheetHeader>

            <div class="mobile-menu__content">
                <div class="mobile-menu__links">
                    <NuxtLink
                        v-for="link in NavigationContent"
                        :key="link.title"
                        :to="link.to"
                        class="mobile-menu__link"
                        :class="{ 'mobile-menu__link--active': isActive(link.to) }"
                        @click="handleNavigation"
                    >
                        <Icon :name="link.icon" class="mobile-menu__link-icon" />
                        <span>{{ link.title }}</span>

                        <Badge v-if="link.count" color="blue" class="w-8 justify-center ml-auto" shape="pill">
                            {{ link.count }}
                        </Badge>
                    </NuxtLink>
                </div>
            </div>

            <div v-if="user" class="mobile-menu__profile">
                <div class="mobile-menu__profile-info">
                    <Avatar size="lg" class="mobile-menu__profile-image">
                        <AvatarImage :src="user?.user_metadata.picture" alt="User avatar" />
                        <AvatarFallback>
                            <NuxtImg class="mobile-menu__profile-img" src="/images/Avatar.svg" alt="Avatar Placeholder" />
                        </AvatarFallback>
                    </Avatar>
                    <div class="mobile-menu__profile-details">
                        <div class="mobile-menu__profile-name">
                            {{ user?.user_metadata.full_name }}
                        </div>
                        <div class="mobile-menu__profile-email">
                            {{ user?.user_metadata.email }}
                        </div>
                    </div>
                </div>
                <div class="mobile-menu__profile-links">
                    <Button variant="ghost" size="lg" color="gray" class="mobile-menu__profile-link" @click="auth.Logout(() => emit('hide'))">
                        <Icon name="ri:logout-box-line" class="mobile-menu__link-icon" />
                        <span class="w-full text-left">
                            Sign out
                        </span>
                    </Button>
                </div>
            </div>
        </SheetContent>
    </Sheet>
</template>

<style lang="postcss" scoped>
.mobile-menu {
    @apply !gap-0;

    &__content {
        @apply pb-2 h-full;
    }

    &__links {
        @apply mt-3  px-4 divide-y;
    }

    &__link {
        @apply flex gap-2 px-3 py-4 text-bodyM font-medium text-text-secondary items-center transition-all duration-200;

        &-icon {
            @apply size-6;
        }

        &:hover {
            @apply text-text-primary;
        }

        &--active {
            @apply text-blue-600 font-semibold border-l-4 border-l-blue-500 ;
        }
    }

    &__profile {
        @apply pb-2 pt-4 px-4;
    }

    &__profile-info {
        @apply flex items-center pb-4 border-b;
    }

    &__profile-image {
        @apply shrink-0;
    }

    &__profile-img {
        @apply size-10 rounded-full;
    }

    &__profile-details {
        @apply ml-3 min-w-0 flex-1;
    }

    &__profile-name {
        @apply truncate text-bodyM font-medium text-gray-800;
    }

    &__profile-email {
        @apply truncate text-captionL font-medium text-gray-500;
    }

    &__profile-links {
        @apply space-y-1 pt-2;
    }

    &__profile-link {
        @apply flex gap-6 items-center w-full rounded-md px-3 py-2 text-bodyM font-medium text-text-secondary hover:text-text-primary;
    }
}
</style>
