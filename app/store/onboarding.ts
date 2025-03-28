import type { OnboardingData } from '~/lib/validation/onboarding'
import { toast } from 'vue-sonner'
import { getters } from '.'

interface StateOnboarding {
    signatureText: string
    tosAccepted: boolean
    error: Error | null
}

export const useOnboarding = defineStore('onboarding', {
    state: (): StateOnboarding => ({
        signatureText: '',
        tosAccepted: false,
        error: null,
    }),

    getters,

    actions: {
        $reset() {
            this.signatureText = ''
            this.tosAccepted = false
            this.error = null
        },
        async SaveOnboardingData(body: OnboardingData) {
            try {
                const response = await fetch('/api/onboarding', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData?.error || 'Failed to save onboarding data')
                }

                this.$patch({
                    signatureText: body.signature_text,
                    tosAccepted: body.tos_accepted,
                })

                toast.success('Onboarding data saved successfully')
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error'
                toast.error(`An error occurred while saving onboarding data: ${errorMessage}`)
            }
        },
    },
    persist: true,
})
