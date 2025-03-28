<script lang="ts" setup>
import { useInbox } from '~/store/inbox'
import { useTeams } from '~/store/teams'

const store = useInbox()

const newMessage = ref('')
const showCandidateInfo = ref(false)
const isMobile = ref(false)
const router = useRouter()

const loading = false
function checkMobile() {
    isMobile.value = window.innerWidth <= 1024
}

function sendMessage() {
    if (store.selectedCandidate) {
        store.sendMessage(newMessage.value, store.selectedCandidate.id)
        newMessage.value = ''
    }
}

onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})
</script>

<template>
    <div class="inbox">
        <div class="inbox__container">
            <div class="inbox__header">
                <div class="inbox__header-left">
                    <div>
                        <Icon
                            name="ri:arrow-left-line" class="text-text-secondary cursor-pointer"
                            @click="router.push(`/app/:teamId/inbox/`)"
                        />
                    </div>
                    <div>
                        <h2 class="text-bodyM font-medium">
                            {{ store.selectedCandidate?.name }}
                        </h2>
                        <p class="inbox__header-info" @click="showCandidateInfo = !showCandidateInfo">
                            <span>Open Candidate Info</span>
                            <Icon name="ri:arrow-right-line" />
                        </p>
                    </div>
                </div>
                <div class="inbox__header-actions">
                    <Button>
                        <Icon name="ri:play-list-add-line" /> Add to Short List
                    </Button>
                    <Button variant="destructiveTertiary">
                        <Icon name="ri:close-line" /> Reject
                    </Button>
                </div>
            </div>

            <div class="flex flex-1 overflow-hidden relative h-full">
                <div
                    :class="{
                        'w-full md:w-2/3': showCandidateInfo,
                        'w-full': !showCandidateInfo,
                        'border-r': showCandidateInfo,
                    }" class="justify-between h-full flex flex-col"
                >
                    <div class="p-4 flex-1 overflow-y-auto h-full">
                        <SkeletonCampaignInboxMessages v-if="loading" />
                        <div v-for="message in store.selectedCandidate?.messages" v-else :key="message.id" class="flex gap-3">
                            <div class="mb-4 flex gap-3">
                                <Avatar size="lg">
                                    <AvatarImage src="/images/Avatar.svg" alt="User avatar" />
                                    <AvatarFallback>
                                        <NuxtImg
                                            class="header__avatar-fallback" src="/images/Avatar.svg"
                                            alt="Avatar Placeholder"
                                        />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div class="inbox__message-details">
                                <div class="inbox__message-meta">
                                    <span class="inbox__message-sender">{{ message.sender }}</span>
                                    <span class="inbox__message-time">{{ message.time }}</span>
                                </div>
                                <p class="inbox__message-text">
                                    {{ message.text }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 flex-0 border-t flex items-center gap-2">
                        <Button class="text-text-sub-600" variant="secondary">
                            <Icon name="ri:attachment-2" />
                        </Button>
                        <div class="relative w-full  items-center">
                            <Input v-model="newMessage" placeholder="Write your message" type="text" />
                            <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                                <Icon
                                    name="ri:send-plane-2-fill" class="size-6 text-muted-foreground"
                                    @click="sendMessage"
                                />
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white relative w-1/3" :style="{
                        maxWidth: showCandidateInfo ? '100%' : '0',
                    }"
                >
                    <PagesInboxMobileCandidateInfo v-if="isMobile && showCandidateInfo" v-model="showCandidateInfo" />
                    <PagesInboxCandidateInfo v-if="!isMobile && showCandidateInfo" v-model="showCandidateInfo" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.inbox {
    @apply flex-1 flex flex-col h-full;

    &__container {
        @apply flex flex-col flex-1 h-full;
    }

    &__header {
        @apply flex flex-col md:flex-row justify-between p-4 border-b;

        &-left {
            @apply flex items-center gap-2;
        }

        &-icon {
            @apply text-text-secondary cursor-pointer;
        }

        &-title {
            @apply text-bodyM font-medium;
        }

        &-info {
            @apply text-bodyS text-text-secondary cursor-pointer flex items-center gap-1;
        }

        &-actions {
            @apply flex flex-col md:flex-row gap-2 mt-4 md:mt-0;
        }
    }

    &__content {
        @apply flex flex-1 relative;
    }

    &__chat {
        @apply justify-between flex flex-col w-full;

        &--narrow {
            @apply w-full md:w-2/3 border-r;
        }
    }

    &__messages {
        @apply p-4 overflow-y-auto max-h-[75vh];
    }

    &__message {
        @apply mb-4 flex gap-3 items-center;
    }

    &__message-details {
        @apply flex flex-col ;
    }

    &__message-meta {
        @apply flex items-center gap-1;
    }
    &__message-time {
        @apply !text-captionS text-text-sub-600;
    }

    &__message-sender {
        @apply font-medium text-text-primary;
    }

    &__message-text {
        @apply text-bodyS ;
    }

    &__input {
        @apply p-4 border-t flex items-center gap-2;
    }

    &__send-icon {
        @apply size-6 text-muted-foreground;
    }
}
</style>
