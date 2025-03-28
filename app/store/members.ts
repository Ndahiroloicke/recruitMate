import type { TableRows } from '~/types/supabase-helper'

interface State {
    members: TableRows<'members'>[]
    status: 'idle' | 'loading' | 'success' | 'error'
    error: string | null
}

export const useMembers = defineStore('members', {
    state: (): State => ({
        members: [],
        status: 'idle',
        error: null,
    }),

    getters: {
        hasError: state => state.status === 'error',
    },

    actions: {
        async fetchMembers(teamId: string | number) {
            if (!teamId) {
                this.error = 'Team ID is required'
                return
            }

            const session = useSupabaseSession()
            if (!session.value) {
                this.error = 'Authentication required'
                return
            }

            try {
                this.status = 'loading'
                const { data, error } = await useFetch(`/api/teams/${teamId}/members`, {
                    method: 'GET',
                })

                if (error.value) {
                    throw error.value
                }

                this.$patch({
                    members: data.value?.data ?? [],
                    status: 'success',
                    error: null,
                })
            }
            catch (err) {
                this.$patch({
                    status: 'error',
                    error: err instanceof Error ? err.message : 'Failed to fetch members',
                })
            }
        },
    },
})
