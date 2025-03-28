<script lang="ts" setup>
import type { Candidate } from '~/pages/app/teamsDetail.vue'

interface Props {
    item: Candidate
    isLoading?: boolean
}

const props = defineProps<Props>()

const { item, isLoading } = props
</script>

<template>
    <div class="candidateInfo">
        <Avatar size="lg" :src="item.avatar" :alt="item.avatar" initials="AB">
            <NuxtImg
                v-if="!isLoading"
                src="/images/Avatar.svg"
                class="candidateInfo_avatar"
                alt="Avatar Image"
            />
            <Skeleton
                v-else
                class="candidateInfo_avatarSkeleton"
            />
        </Avatar>
        <div class="candidateInfo_content">
            <Skeleton
                v-if="isLoading"
                class="candidateInfo_nameSkeleton"
            />
            <p
                v-else
                class="candidateInfo_name"
            >
                {{ item.member.first_name }} {{ item.member.last_name }}
            </p>
            <Skeleton
                v-if="isLoading"
                class="candidateInfo_positionSkeleton"
            />
            <p
                v-else
                class="candidateInfo_email"
            >
                {{ item.member.email }}
            </p>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.candidateInfo {
    @apply flex gap-2 items-center max-w-[404px];

    &_avatar {
        @apply object-cover h-full w-full;
    }

    &_avatarSkeleton {
        @apply h-full w-full rounded-full;
    }

    &_content {
        @apply flex flex-col gap-0.5;
    }

    &_nameSkeleton {
        @apply h-3 w-20;
    }

    &_name {
        @apply font-medium text-text-primary text-captionL;
    }

    &_positionSkeleton {
        @apply h-3 w-36;
    }

    &_email {
        @apply text-secondary leading-4 opacity-60 text-captionM;
    }
}
</style>
