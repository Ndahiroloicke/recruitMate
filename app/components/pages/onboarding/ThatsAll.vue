<script setup lang="ts">
import { onMounted } from 'vue'
import Button from '~/components/ui/button/Button.vue'

const router = useRouter()
function launchConfetti() {
    const colors = ['#0078F5', '#ffffff']
    const duration = 1.5 * 1000
    const end = Date.now() + duration;

    (function frame() {
        const confettiSettings = {
            particleCount: 2,
            spread: 55,
            colors,
        };

        (window as any).confetti({ ...confettiSettings, angle: 60, origin: { x: 0 } });
        (window as any).confetti({ ...confettiSettings, angle: 120, origin: { x: 1 } })

        if (Date.now() < end) {
            requestAnimationFrame(frame)
        }
    })()
}

onMounted(() => {
    launchConfetti()
})
</script>

<template>
    <div class="completion">
        <div class="completion_progress">
            <span>Step 3 / 3</span>
        </div>
        <div class="completion_texts">
            <h5>
                That's all
            </h5>
            <span>
                You can start creating campaigns for your candidates and products.
            </span>
        </div>
        <Button @click="router.push('/app/:teamId/campaigns')">
            Complete
        </Button>
    </div>
</template>

<style lang="postcss" scoped>
.completion {
    @apply flex flex-col gap-5 w-full sm:max-w-[380px] p-9 sm:p-0;

    &_progress {
        @apply flex flex-col text-captionL text-text-secondary font-medium leading-5;
    }

    &_texts {
        @apply flex flex-col gap-2;

        h5 {
            @apply text-h5 leading-9 font-semibold;
        }

        span {
            @apply font-normal text-bodyM leading-6 tracking-normal text-text-secondary;
        }
    }
}
</style>
