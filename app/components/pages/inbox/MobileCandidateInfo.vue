<script setup lang="ts">
import {
    Sheet,
    SheetContent,
    SheetHeader,
} from '@/components/ui/sheet'
import { useInbox } from '~/store/inbox'

const store = useInbox()
const candidate = store.selectedCandidate
const modelValue = defineModel({
    default: false,
})
const loading = false
</script>

<template>
    <SkeletonCampaignInboxInfoMobile v-if="loading" v-model:open="modelValue" />
    <Sheet v-else v-model:open="modelValue">
        <SheetContent class="candidate-sheet">
            <SheetHeader class="candidate-sheet__header">
                <div class="candidate-sheet__content">
                    <div v-if="candidate" class="candidate-sheet__details">
                        <div>
                            <p class="candidate-sheet__label">
                                Full Name
                            </p>
                            <p class="candidate-sheet__value">
                                {{ candidate.name }}
                            </p>
                        </div>
                        <div>
                            <p class="candidate-sheet__label">
                                Job Title
                            </p>
                            <p class="candidate-sheet__value">
                                {{ candidate.jobTitle }}
                            </p>
                        </div>
                        <div>
                            <p class="candidate-sheet__label">
                                Skills
                            </p>
                            <div class="candidate-sheet__skills">
                                <Badge v-for="skill in candidate.skills" :key="skill" size="md" color="blue">
                                    {{ skill }}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <p class="candidate-sheet__label">
                                Country
                            </p>
                            <p class="candidate-sheet__value">
                                {{ candidate.country }}
                            </p>
                        </div>
                        <div>
                            <p class="candidate-sheet__label">
                                Graduation Status
                            </p>
                            <p class="candidate-sheet__value">
                                {{ candidate.graduationStatus }}
                            </p>
                        </div>
                        <div>
                            <p class="candidate-sheet__label">
                                Education
                            </p>
                            <p class="candidate-sheet__value">
                                {{ candidate.education }}
                            </p>
                        </div>
                        <div>
                            <p class="candidate-sheet__label">
                                Experience
                            </p>
                            <ul class="candidate-sheet__experience">
                                <li v-for="experience in candidate.experience" :key="experience" class="candidate-sheet__value">
                                    {{ experience }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</template>

<style lang="postcss" scoped>
.candidate-sheet {
    @apply w-full px-4 bg-white flex flex-col;

    &__header {
        @apply pb-4;
    }

    &__content {
        @apply flex items-start justify-start;
    }

    &__details {
        @apply flex flex-col gap-3 text-left;
    }

    &__label {
        @apply text-bodyM font-medium;
    }

    &__value {
        @apply text-captionL text-text-secondary;
    }

    &__skills {
        @apply flex flex-wrap gap-2 mt-2;
    }

    &__experience {
        @apply list-disc pl-5;
    }
}
</style>
