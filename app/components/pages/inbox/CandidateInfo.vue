<script lang="ts" setup>
import { useInbox } from '~/store/inbox'

const store = useInbox()
const candidate = store.selectedCandidate

const modelValue = defineModel({
    default: false,
})
const loading = false
</script>

<template>
    <SkeletonCampaignInboxInfo v-if="loading" v-model:model-value="modelValue" />
    <div v-else class="candidate-info">
        <div class="candidate-info__details">
            <div>
                <div>
                    <p class="candidate-info__label">
                        Full Name
                    </p>
                    <p class="candidate-info__value">
                        {{ candidate?.name }}
                    </p>
                </div>
                <div>
                    <p class="candidate-info__label">
                        Job Title
                    </p>
                    <p class="candidate-info__value">
                        {{ candidate?.jobTitle }}
                    </p>
                </div>
                <div>
                    <p class="candidate-info__label">
                        Skills
                    </p>
                    <div class="candidate-info__skills">
                        <Badge v-for="skill in candidate?.skills" :key="skill" size="sm" color="blue" class="candidate-info__skills__badge">
                            {{ skill }}
                        </Badge>
                    </div>
                </div>
                <div>
                    <p class="candidate-info__label">
                        Country
                    </p>
                    <p class="candidate-info__value">
                        {{ candidate?.country }}
                    </p>
                </div>
                <div>
                    <p class="candidate-info__label">
                        Graduation Status
                    </p>
                    <p class="candidate-info__value">
                        {{ candidate?.graduationStatus }}
                    </p>
                </div>
                <div>
                    <p class="candidate-info__label">
                        Education
                    </p>
                    <p class="candidate-info__value">
                        {{ candidate?.education }}
                    </p>
                </div>
                <div>
                    <p class="candidate-info__label">
                        Experience
                    </p>
                    <ul class="candidate-info__experience">
                        <li v-for="experience in candidate?.experience" :key="experience" class="candidate-info__experience__item">
                            {{ experience }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="candidate-info__close">
            <Button variant="secondary" size="xs" class="candidate-info__close__btn" @click="modelValue = false">
                <Icon name="ri:close-fill" />
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.candidate-info {
    @apply w-full px-4 pt-6 bg-white flex items-start justify-start relative;

    &__details {
        @apply flex flex-col gap-3;
    }

    &__label {
        @apply text-captionM font-medium;
    }

    &__value {
        @apply text-captionM text-text-secondary;
    }

    &__skills {
        @apply flex flex-wrap gap-2 mt-2;

        &__badge {
            @apply border-0 px-1;
        }
    }

    &__experience {
        @apply list-disc pl-5;

        &__item {
            @apply text-captionM text-text-secondary;
        }
    }

    &__close {
        @apply absolute top-5 right-2;

        &__btn {
            @apply text-text-sub-600 rounded-full;
        }
    }
}
</style>
