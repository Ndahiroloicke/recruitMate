import type { TableRows } from '~/types/supabase-helper'
import { toast } from 'vue-sonner'
import { getters } from '.'
import { useOnboarding } from './onboarding'

interface StateAuth {
    user: TableRows<'recruiters'> | null
    isAuth: boolean
}

export const useAuth = defineStore('auth', {
    state: (): StateAuth => ({
        user: null,
        isAuth: false,
    }),

    getters: {
        ...getters,
        FullName(state) {
            return `${state.user?.first_name} ${state.user?.last_name}`
        },
    },

    actions: {
        $reset() {
            this.user = null
            this.isAuth = false
        },
        async getMe(forceRefresh = false) {
            if (!forceRefresh && this.isAuth && this.user && this.user.tos_accepted) {
                return this.user
            }

            const onboarding = useOnboarding()

            try {
                const me = await $fetch('/api/me', { method: 'GET', cache: 'no-store' })

                if (!me?.data) {
                    toast.error('An error occurred while fetching user data')
                    return
                }

                const userData = me.data

                this.isAuth = true
                this.$patch({ user: userData })

                onboarding.$patch({
                    signatureText: userData.signature_text || '',
                    tosAccepted: userData.tos_accepted || false,
                })

                return userData
            }
            catch (error) {
                console.error('Error fetching user data:', error)
                toast.error('An error occurred while fetching user data')
            }
        },
        async Logout(callback?: () => void) {
            const onboarding = useOnboarding()

            try {
                await this.supabaseClient.auth.signOut()

                onboarding.$reset()
                this.$reset()

                this.Router.push('/auth')
                if (typeof callback === 'function')
                    callback()

                toast.success('Signed out successfully')
            }
            catch (error) {
                console.error('Logout error:', error)
                toast.error('An error occurred while signing out')
            }
        },
    },
    persist: true,
})
