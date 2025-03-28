<script setup lang="ts">
import recruitMate from '@/assets/recruitmate.svg'
import { Capacitor } from '@capacitor/core'
import { DefaultSystemBrowserOptions, InAppBrowser } from '@capacitor/inappbrowser'
import Card from '~/components/common/application/Card.vue'
import Background from '~/components/common/general/Background.vue'

definePageMeta({
    middleware: 'auth',
})

const supabase = useSupabaseClient()

function getRedirectUri() {
    if (Capacitor.isNativePlatform()) {
        return 'com.robx.recruitmate://auth/callback'
    }

    return `${import.meta.env.VITE_APP_URL}/auth/callback`
}

async function handleGoogleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: getRedirectUri(),
            skipBrowserRedirect: Capacitor.isNativePlatform(),
        },
    })

    if (error) {
        console.error(error)
        return
    }

    if (!data.url)
        return

    await InAppBrowser.openInSystemBrowser({
        url: data.url,
        options: DefaultSystemBrowserOptions,
    })
}

function handleLinkedinLogin() {
    supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
    })
}
</script>

<template>
    <Background class="login">
        <div class="login__container">
            <img class="login__logo" :src="recruitMate">

            <Card class="login__card">
                <div class="login__header">
                    <p class="login__title">
                        Login to RecruitMate AI
                    </p>
                    <span class="login__description">
                        Speed up and easily manage your email campaigns
                    </span>
                </div>

                <div class="login__actions">
                    <Button class="login__button" variant="secondary" @click="handleGoogleLogin">
                        <Icon name="logos:google-icon" />
                        Login with Google
                    </Button>

                    <Button class="login__button" variant="secondary" @click="handleLinkedinLogin">
                        <Icon name="logos:linkedin-icon" />
                        Login with LinkedIn
                    </Button>
                </div>
            </Card>
        </div>
    </Background>
</template>

<style lang="postcss" scoped>
.login {
    @apply flex items-center justify-center;

    &__container {
        @apply flex flex-col justify-center items-center min-h-screen w-full sm:max-w-[440px];
    }

    &__logo {
        @apply w-36 h-6 mb-5;
    }

    &__card {
        @apply flex flex-col gap-3.5 border border-background-surface-neutral-subtle p-6 rounded-none sm:rounded-2xl shadow-lg w-full;
    }

    &__header {
        @apply flex flex-col gap-1;
    }

    &__title {
        @apply text-bodyL font-medium leading-5 tracking-normal text-center;
    }

    &__description {
        @apply font-normal text-bodyM leading-6 tracking-normal text-center text-text-secondary;
    }

    &__actions {
        @apply flex flex-col gap-2;
    }

    &__button {
        @apply flex items-center justify-center gap-2;
    }
}
</style>
