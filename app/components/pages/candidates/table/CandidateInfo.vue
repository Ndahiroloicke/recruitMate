<script lang="ts" setup>
import type { ICandidateResponse } from '~/types/candidates/reponse'

interface Props {
    item: ICandidateResponse
    isLoading?: boolean
}

defineProps<Props>()
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
                {{ item.first_name }} {{ item.last_name }}
                <span
                    v-if="!item.first_name && !item.last_name"
                    class="candidateInfo_name"
                >
                    -
                </span>
            </p>
            <Skeleton
                v-if="isLoading"
                class="candidateInfo_positionSkeleton"
            />
            <p
                v-else
                class="candidateInfo_position"
            >
                {{ item.position || "-" }}
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

    &_position {
        @apply text-secondary leading-4 opacity-60 text-captionM;
    }
}
</style>
