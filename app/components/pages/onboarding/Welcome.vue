<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'
import Checkbox from '~/components/ui/checkbox/Checkbox.vue'
import { useOnboarding } from '~/store/onboarding'

const emit = defineEmits(['next'])
const onboarding = useOnboarding()

function handleNext() {
    emit('next')
}
</script>

<template>
    <div class="welcome">
        <div class="welcome__progress">
            <span>Step 1 / 3</span>
        </div>
        <div class="welcome__content">
            <div class="welcome__texts">
                <h5 class="welcome__title">
                    Welcome to RecruitMate
                </h5>
                <span class="welcome__description">
                    Let's get started and take a look at the 3 steps before managing your candidates and team.
                </span>
            </div>
        </div>
        <Label class="welcome__agreement">
            <Checkbox v-model:checked="onboarding.tosAccepted" />
            <p>
                I agree to the <NuxtLink to="/policy/terms" class="welcome__tos">
                    Terms of Service
                </NuxtLink> , <NuxtLink to="/policy/privacy" class="welcome__privacy">
                    Privacy Policy
                </NuxtLink>
                and <NuxtLink to="/policy/legal" class="welcome__legal">
                    Legal
                </NuxtLink>.
            </p>
        </Label>
        <Button :disabled="!onboarding.tosAccepted" @click="handleNext">
            Let's Start
        </Button>
    </div>
</template>

<style lang="postcss" scoped>
.welcome {
    @apply flex flex-col gap-5 w-full sm:max-w-[400px] p-9 sm:p-0;

    &__progress {
        @apply flex flex-col text-captionL text-text-secondary font-medium leading-5;
    }

    &__content {
        @apply flex flex-col;
    }

    &__texts {
        @apply flex flex-col gap-2;
    }

    &__title {
        @apply text-h5 leading-9 tracking-[-0.5] font-semibold sm:whitespace-nowrap;
    }

    &__description {
        @apply font-normal text-bodyM leading-6 tracking-normal text-text-secondary;
    }

    &__agreement {
        @apply text-captionM font-medium text-zinc-400 flex items-center gap-2;
    }

    &__tos,
    &__privacy,
    &__legal {
        @apply text-neutral-950 hover:underline hover:text-background-surface-info-accent;
    }

}
</style>
