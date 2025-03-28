<script setup lang="ts">
import Background from '~/components/common/general/Background.vue'
import ThatsAll from '~/components/pages/onboarding/ThatsAll.vue'
import UpdateProfile from '~/components/pages/onboarding/UpdateProfile.vue'
import WaitingList from '~/components/pages/onboarding/WaitingList.vue'
import Welcome from '~/components/pages/onboarding/Welcome.vue'

const steps = [Welcome, UpdateProfile]
const isWaiting = ref(false)
const currentStepIndex = ref(0)

const dynamicSteps = computed(() => {
    return isWaiting.value
        ? [...steps, WaitingList]
        : [...steps, ThatsAll]
})

function nextStep() {
    if (currentStepIndex.value < dynamicSteps.value.length - 1) {
        currentStepIndex.value++
    }
}

function prevStep() {
    if (currentStepIndex.value > 0) {
        currentStepIndex.value--
    }
}

const CurrentStep = computed(() => dynamicSteps.value[currentStepIndex.value])
</script>

<template>
    <Background class="onboarding__background">
        <div class="onboarding__container">
            <Transition name="page" mode="out-in">
                <component :is="CurrentStep" :key="currentStepIndex" @next="nextStep" @prev="prevStep" />
            </Transition>
        </div>
    </Background>
</template>

<style lang="postcss" scoped>
.onboarding__background {
    @apply flex items-center justify-center;
}

.onboarding__container {
    @apply flex flex-col items-center gap-6;
}
</style>
