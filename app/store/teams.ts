import type { TableRows } from '~/types/supabase-helper'

interface State {
    currentTeam: TableRows<'teams'> | null
    teams: TableRows<'teams'>[]
}
// this is the store for the teams

export const useTeams = defineStore('teams', {
    state: (): State => ({
        currentTeam: null,
        teams: [],
    }),
    actions: {
        setCurrentTeam(team: TableRows<'teams'>) {
            this.$patch({ currentTeam: team })
        },
        async fetchTeams() {
            const session = useSupabaseSession()

            if (!session.value)
                return

            const { data } = await useFetch('/api/teams', {
                method: 'GET',
            })

            this.$patch({
                teams: data.value?.data ?? [],
                currentTeam: data.value?.data?.find((item: TableRows<'teams'>) => item.is_default) || null,
            })
        },
    },
    persist: true,
})
