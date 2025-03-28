<script setup lang="ts">
import type { RouteRecordPath } from '~/types/route'
import MobileMenu from '@/components/common/general/sheets/MobileMenu.vue'
import { Button } from '@/components/ui/button'
import { useTeams } from '@/store/teams'
import { useAuth } from '~/store/auth'
import teamsModal from '../modals/teamsModal.vue'

const user = useSupabaseUser()
const router = useRouter()
const modal = useModal()
const auth = useAuth()
const route = useRoute()

const teamsStore = useTeams()

const isTeamDropdownOpen = ref(false)

interface Navigation {
    title: string
    to: RouteRecordPath
}

const navigation: Navigation[] = [
    { title: 'Campaign', to: '/app/:teamId/campaigns' },
    { title: 'Candidates', to: '/app/:teamId/candidates' },
    { title: 'Teams Settings', to: '/app/:teamId/teams-settings' as RouteRecordPath },
]

const NOTIFICATION_COUNT = 1

const isInOnboardingPhase = computed(() => route.path.startsWith('/onboarding') || route.path.startsWith('/policy/'))

const currentPath = computed(() => {
    const pathMatch = route.path.match(/\/app\/\d+\/(.*)/)
    return pathMatch ? pathMatch[1] : 'campaigns'
})

function resolvePath(path: string) {
    const params = route.params as Record<string, string | number | undefined>

    return path.replace(/:(\w+)/g, (match, paramName: string) => {
        const paramValue = params[paramName]
        return paramValue ? String(paramValue) : match
    })
}

function isActive(resolvedPath: string) {
    return route.path.includes(resolvedPath)
}

function openMobileMenu() {
    modal.open(MobileMenu, {
        name: 'mobile-menu',
        loading: false,
    })
}

function openCreateTeamModal() {
    modal.open(teamsModal, {
        name: 'create-team',
        loading: false,
    })
}

const menuItems = [
    {
        label: 'Settings',
        shortcut: null,
        handler: () => {
            router.push(`/app/:teamId/settings`)
        },
    },
    {
        label: 'Log out',
        shortcut: null,
        handler: auth.Logout,
    },
]
</script>

<template>
    <nav class="header">
        <div class="header__container">
            <div class="header__navigation">
                <CommonGeneralLayoutLogo :disabled="isInOnboardingPhase" />
                <DropdownMenu v-if="user && teamsStore.currentTeam?.id && route.path !== '/onboarding'" v-model:open="isTeamDropdownOpen">
                    <DropdownMenuTrigger>
                        <div class="header__team-selector">
                            <Avatar>
                                <AvatarImage :src="teamsStore.currentTeam.logo || ''" />
                            </Avatar>
                            {{ teamsStore.currentTeam?.name }}
                            <Icon
                                class="header__team-selector-icon"
                                :name="isTeamDropdownOpen ? 'ri:arrow-up-s-line' : 'ri:arrow-down-s-line'"
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        class="header__team-dropdown"
                        align="end"
                    >
                        <DropdownMenuItem v-for="team in teamsStore.teams" :key="team.id" class="header__team-item" :to="`/app/:teamId/${currentPath}`">
                            <div class="flex items-center gap-2 w-full">
                                <Avatar>
                                    <AvatarImage :src="team.logo || ''" />
                                </Avatar>
                                <div>
                                    {{ team.name }}
                                    <div class="text-captionM text-text-secondary">
                                        {{ team.description }}
                                    </div>
                                </div>
                                <Icon v-if="team.id === Number(teamsStore.currentTeam?.id)" class="ml-auto" name="ri:check-line" />
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="header__team-item" @click="openCreateTeamModal">
                            Create Team
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div v-if="user && !isInOnboardingPhase" class="header__links">
                    <NuxtLink
                        v-for="(item, index) in navigation"
                        :key="index"
                        :to="item.to"
                        class="header__link"
                        :class="{ 'header__link--active': isActive(resolvePath(item.to)) }"
                    >
                        {{ item.title }}
                    </NuxtLink>
                </div>
            </div>

            <div class="header__actions">
                <div class="header__actions">
                    <template v-if="user">
                        <template v-if="isInOnboardingPhase">
                            <Button variant="secondary" size="sm" @click="auth.Logout">
                                Log out
                            </Button>
                        </template>
                        <template v-else>
                            <Button variant="ghost" size="icon" class="header__action-button" @click="router.push(`/app/:teamId/inbox/`)">
                                <Icon name="ri:mail-line" class="header__icon" />
                            </Button>
                            <CommonGeneralLayoutNotificationsPopover />

                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Avatar size="lg" class="header__avatar">
                                        <AvatarImage :src="user?.user_metadata.picture" alt="User avatar" />
                                        <AvatarFallback>
                                            <NuxtImg class="header__avatar-fallback" src="/images/Avatar.svg" alt="Avatar Placeholder" />
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" class="header__dropdown" align="end">
                                    <DropdownMenuLabel>
                                        <p class="header__dropdown-label">
                                            Signed in as
                                        </p>
                                        <p class="header__dropdown-email">
                                            {{ user?.user_metadata.email }}
                                        </p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem v-for="(item, index) in menuItems" :key="index" class="cursor-pointer" @click="item?.handler">
                                        <span>{{ item.label }}</span>
                                        <DropdownMenuShortcut v-if="item.shortcut">
                                            {{ item.shortcut }}
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </template>
                    </template>
                    <template v-else>
                        <template v-if="!isInOnboardingPhase">
                            <Button variant="secondary" size="sm">
                                Login
                            </Button>
                            <Button class="header__try-button">
                                Try For Free
                                <Icon class="header__icon" name="ri:arrow-right-line" />
                            </Button>
                        </template>
                    </template>

                    <Button v-if="user && route.path !== '/onboarding'" variant="ghost" size="icon" class="header__menu-button" @click="openMobileMenu">
                        <Icon name="ri:menu-2-fill" class="header__menu-icon" />
                        <Badge v-if="NOTIFICATION_COUNT" color="blue" class="notification" shape="pill">
                            {{ NOTIFICATION_COUNT }}
                        </Badge>
                    </Button>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="postcss">
.header {
    @apply border-b border-zinc-200 bg-white;

    &__container {
        @apply mx-auto max-w-7xl px-6 sm:px-4 flex h-16 justify-between;
    }

    &__navigation {
        @apply flex items-center;
    }

    &__team-selector {
        @apply flex items-center font-medium rounded-[10px] ml-8 border-[#DEE0E3] border-[1px] py-[6px] px-[10px] gap-2 !w-[185px];
    }

    &__team-selector-icon {
        @apply text-icon-base-secondary ml-auto;
    }

    &__team-dropdown {
        @apply !w-[185px];
    }

    &__team-item {
        @apply cursor-pointer;
    }

    &__links {
        @apply hidden -my-px ml-6 h-full space-x-8;

        @screen sm {
            @apply flex;
        }
    }

    &__link {
        @apply inline-flex items-center border-b-4 border-transparent px-1 pt-1 text-captionL font-medium text-zinc-500 hover:border-zinc-300 hover:text-zinc-700;

        &--active {
            @apply !border-background-surface-info-accent border-b-[4px] text-zinc-900;
        }
    }

    &__actions {
        @apply flex items-center space-x-2 ml-6;

        &__button {
            @apply text-icon-base-secondary hidden;

            @screen sm {
                @apply block;
            }
        }
    }

    &__action-button {
        @apply text-zinc-400 hover:text-zinc-500 hidden;

        @screen sm {
            @apply block;
        }
    }

    &__icon {
        @apply size-4;
    }

    &__avatar {
        @apply cursor-pointer hidden;

        @screen sm {
            @apply block;
        }
    }

    &__avatar-fallback {
        @apply flex-shrink-0 h-10 w-10;
    }

    &__dropdown {
        @apply !max-w-[220px];
    }

    &__dropdown-label {
        @apply text-captionL font-medium;
    }

    &__dropdown-email {
        @apply truncate text-captionL font-medium text-text-secondary;
    }

    &__menu-button {
        @apply flex -mr-2 items-center relative;

        @screen sm {
            @apply hidden;
        }
    }

    &__menu-icon {
        @apply size-5;
    }

    &__notification {
        @apply w-8 justify-center absolute -bottom-1 -left-3;
    }

    &__try-button {
        @apply bg-gradient-to-b from-border-action-info-hover to-background-surface-info-accent;
    }
}
</style>
