<script setup lang="ts">
import type { Step } from '~/store/campaigns/create'

interface Props {
    steps: Step[]
}

defineProps<Props>()
</script>

<template>
    <div class="steps">
        <StepperItem
            v-for="step in steps" :key="step.step" v-slot="{ state }"
            class="steps__stepper-item" :step="step.step"
        >
            <Icon
                v-if="step.step !== steps[0]?.step" name="ri:arrow-right-s-line"
                class="steps__stepper-icon"
            />

            <StepperTrigger as-child>
                <Button
                    :variant="state === 'completed' || state === 'active' ? 'primary' : 'secondary'" size="icon"
                    class="steps__button"
                    :class="[state === 'active' && 'steps__button--active', state === ' completed' && '!bg-green-500']"
                    :disabled="state !== 'completed' && state !== 'active'"
                >
                    <Icon v-if="state === 'completed'" name="ri:check-fill" class="size-4" />
                    <span v-else>{{ step.step }}</span>
                </Button>
            </StepperTrigger>

            <StepperTitle
                :class="[state === 'active' ? 'steps__title--active' : 'steps__title--inactive']"
                class="steps__title"
            >
                {{ step.title }}
            </StepperTitle>
        </StepperItem>
    </div>
</template>

<style lang="postcss" scoped>
.steps {
    @apply flex items-center pb-4 w-full;

    &__stepper-item {
        @apply relative flex;
    }

    &__stepper-icon {
        @apply text-text-tertiary flex-shrink-0 ml-2;
    }

    &__button {
        @apply z-10 rounded-full !h-5 !w-5 shrink-0 text-captionM;
    }

    &__button--active {
        @apply ring-1 ring-border-base-info ring-offset-2 ring-offset-background;
    }

    &__title {
        @apply text-captionL font-medium transition w-16 sm:w-auto truncate;
    }

    &__title--active {
        @apply text-text-primary;
    }

    &__title--inactive {
        @apply text-text-secondary;
    }
}
</style>
