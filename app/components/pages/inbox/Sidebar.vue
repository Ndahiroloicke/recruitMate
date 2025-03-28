<script lang="ts" setup>
import inboxSettings from '~/components/common/general/modals/inboxSettings.vue'
import { useInbox } from '~/store/inbox'

const store = useInbox()
const modal = useModal()

function openModal() {
    modal.open(inboxSettings, {
        name: 'inboxSettings',
        loading: false,
    })
}
const dataVisible = true

const menuItems = [
    { label: 'AZ', icon: 'ri:arrow-up-down-fill' },
    { label: 'ZA', icon: 'ri:arrow-up-down-fill' },
]
const filterItems = [
    { label: 'Manager' },
    { label: 'Frontend Developer' },
]
</script>

<template>
    <div class="sidebar">
        <div class="sidebar__header">
            <div class="sidebar__title-container">
                <div>
                    <h2 class="sidebar__title">
                        Candidates
                    </h2>
                    <p class="sidebar__description">
                        Find the best fit quickly.
                    </p>
                </div>
                <Button size="xs" variant="secondary" @click="openModal">
                    <Icon name="ri:settings-4-line" />
                </Button>
            </div>
            <Tabs default-value="shortlist" class="sidebar__tabs">
                <TabsList class="sidebar__tabs-list">
                    <TabsTrigger class="sidebar__tabs-trigger" value="followup">
                        Follow Up
                    </TabsTrigger>
                    <TabsTrigger class="sidebar__tabs-trigger" value="shortlist">
                        Short List
                    </TabsTrigger>
                    <TabsTrigger class="sidebar__tabs-trigger" value="declined">
                        Declined
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <div class="sidebar__controls">
                <CommonGeneralSearchInput placeholder="Search Candidates" class="sidebar__controls__search" />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button class="sidebar__controls__button" variant="secondary">
                            <Icon name="ri:sort-desc" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            v-for="(item, index) in menuItems"
                            :key="index"
                            class="sidebar__controls__menuItem"
                        >
                            {{ item.label }} <Icon :name="item.icon" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button class="sidebar__controls__button" variant="secondary">
                            <Icon name="ri:filter-fill" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            v-for="(item, index) in filterItems"
                            :key="index"
                        >
                            {{ item.label }}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <div v-if="dataVisible" class="sidebar__content">
            <NuxtLink
                v-for="candidate in store.candidates"
                :key="candidate.id"
                :to="{ name: 'app-teamId-inbox-id', params: { id: candidate.id } }"
                class="sidebar__content__item"
                :class="{ 'sidebar__content__item--active': store.selectedCandidate?.id === candidate.id }"
            >
                <div
                    v-if="store.selectedCandidate?.id === candidate.id"
                    class="sidebar__content__indicator"
                />
                <div class="sidebar__content__avatar">
                    <Avatar size="lg">
                        <AvatarImage src="/images/Avatar.svg" alt="User avatar" />
                        <AvatarFallback>
                            <NuxtImg
                                class="sidebar__content__avatar-fallback" src="/images/Avatar.svg"
                                alt="Avatar Placeholder"
                            />
                        </AvatarFallback>
                    </Avatar>
                </div>

                <div class="sidebar__content__info">
                    <p class="sidebar__content__name">
                        {{ candidate.name }}
                    </p>
                    <p class="sidebar__content__message">
                        {{ candidate.lastMessage }}
                    </p>
                </div>
                <Badge
                    v-if="candidate.unreadMessages"
                    color="blue"
                    size="lg"
                    class="sidebar__content__badge"
                >
                    +{{ candidate.unreadMessages }}
                </Badge>
            </NuxtLink>
        </div>
        <SkeletonCampaignInboxCandidates v-else />
    </div>
</template>

<style scoped>
.sidebar {
    @apply border-0 md:border  border-t-0 h-full flex flex-col;

    &__header {
        @apply flex flex-col gap-3 items-start justify-center px-4 mt-6;
    }

    &__title-container{
       @apply flex justify-between w-full
    }
    &__title {
        @apply text-bodyM font-medium;
    }

    &__description {
        @apply text-captionM text-text-sub-600;
    }

    &__tabs {
        @apply w-full rounded-lg;

        &-list {
            @apply  w-full grid w-full grid-cols-3;
        }
        &-trigger{
                @apply px-2 text-captionM  font-medium
            }
    }

    &__controls {
        @apply flex w-full gap-3;
        &__button{
            @apply text-text-secondary
        }
        &__menuItem{
           @apply justify-center
        }
    }

    &__content {
        @apply mt-4 overflow-y-auto flex-1;

        &__item {
            @apply flex items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer relative border-t pr-4;

            &--active {
                @apply bg-background-surface-info;
            }
        }

        &__indicator {
            @apply absolute left-0.5 h-3 w-1 bg-blue-500 rounded;
        }

        &__avatar {
            @apply ml-1;
        }

        &__name {
            @apply font-medium text-captionL;
        }

        &__message {
            @apply  text-text-sub-600 text-captionM;
        }

        &__badge {
            @apply ml-auto text-captionS font-medium px-3 py-1 rounded-full leading-4 border-text-blue-accent;
        }
    }
}
</style>
