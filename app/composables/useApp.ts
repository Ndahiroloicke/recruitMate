import type { URLOpenListenerEvent } from '@capacitor/app'
import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { InAppBrowser } from '@capacitor/inappbrowser'
import { SafeArea } from 'capacitor-plugin-safe-area'

export async function useApp() {
    if (!Capacitor.isNativePlatform())
        return

    const router = useRouter()
    const client = useSupabaseClient()

    App.addListener('appUrlOpen', async (event: URLOpenListenerEvent) => {
        const slug = event.url.split('.app').pop()

        if (event.url.includes('/auth/callback')) {
            const code = new URL(event.url).searchParams.get('code')
            console.log('Received code:', code)
            if (code) {
                const { data, error } = await client.auth.exchangeCodeForSession(code)
                console.log('Exchanged code for session:', data)
                if (error) {
                    console.error('Error exchanging code for session:', error.message)
                }
            }

            return await InAppBrowser.close()
        }

        if (slug) {
            console.log('Opening URL: ', slug)
            router.push(slug)
        }
    })

    SafeArea.getSafeAreaInsets().then(({ insets }) => {
        for (const [key, value] of Object.entries(insets)) {
            document.documentElement.style.setProperty(
                `--safe-area-inset-${key}`,
                `${value}px`,
            )
        }
    })

    SafeArea.addListener('safeAreaChanged', (data) => {
        const { insets } = data
        for (const [key, value] of Object.entries(insets)) {
            document.documentElement.style.setProperty(
                `--safe-area-inset-${key}`,
                `${value}px`,
            )
        }
    })

    onUnmounted(async () => {
        await SafeArea.removeAllListeners()
    })
}
