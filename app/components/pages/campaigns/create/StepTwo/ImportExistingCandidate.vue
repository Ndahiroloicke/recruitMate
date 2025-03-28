<script setup lang="ts">
import { computed } from 'vue'

const { status } = useFetch('/api/candidates', {
    method: 'GET',
})

// const existing_candidates = computed(() =>
//     (data.value?.data ?? []).map(candidate => ({
//         ...candidate,
//         key: candidate.id.toString(),
//         title: `${candidate.first_name} ${candidate.last_name}`,
//     })),
// )

const existing_candidates2 = [
    {
        key: '1',
        title: 'Marketing Specialist',
        description: 'Hiring a skilled marketing specialist to boost campaign strategies.',
        candidateCount: 224,
    },
    {
        key: '2',
        title: 'Project Manager',
        description: 'Streamlining management processes to improve team efficiency and communication.',
        candidateCount: 124,
    },
    {
        key: '3',
        title: 'Software Engineer',
        description: 'Developing and maintaining software applications to meet business needs.',
        candidateCount: 124,
    },
    {
        key: '4',
        title: 'Data Analyst',
        description: 'Analyzing data to provide insights and recommendations for business decisions.',
        candidateCount: 124,
    },
]
</script>

<template>
    <div class="importCandidates">
        <SkeletonCamapignCreateImportCandidates v-if="status === 'pending'" />
        <FormField v-else v-slot="{ componentField }" name="importExistingCandidates">
            <CommonApplicationRadioGroup :data="existing_candidates2" v-bind="componentField">
                <template #content="{ item }">
                    <Avatar size="lg" class="importCandidates__avatar">
                        <AvatarImage src="/images/Company.svg" alt="User avatar" />
                        <AvatarFallback>
                            <NuxtImg
                                class="importCandidates__avatar-fallback"
                                src="/images/Company.svg"
                                alt="Avatar Placeholder"
                            />
                        </AvatarFallback>
                    </Avatar>

                    <div class="importCandidates__content">
                        <span class="importCandidates__title">
                            {{ item.title }}
                            <span class="importCandidates__title-sub">
                                ({{ item.candidateCount }} Candidates)
                            </span>
                        </span>
                        <span class="importCandidates__description">{{ item.description }}</span>
                    </div>
                </template>
            </CommonApplicationRadioGroup>
        </FormField>
    </div>
</template>

<style lang="postcss" scoped>
.importCandidates {
    @apply flex flex-col gap-4;

    &__avatar {
        @apply rounded-xl;
    }

    &__avatar-fallback {
        @apply w-12 h-12;
    }

    &__content {
        @apply flex flex-col gap-1;
    }

    &__icon {
        @apply text-text-secondary size-4;
    }

    &__title {
        @apply text-captionL text-text-primary;
    }

    &__title-sub {
        @apply text-captionS text-text-tertiary;
    }

    &__description {
        @apply text-captionM text-text-tertiary;
    }
}
</style>
