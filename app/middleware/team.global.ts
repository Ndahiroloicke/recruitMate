import { useTeams } from '~/store/teams'

export default defineNuxtRouteMiddleware(async (to) => {
    const user = useSupabaseUser()

    if (!to.fullPath.startsWith('/app') || !user.value) {
        return
    }

    const { currentTeam, fetchTeams } = useTeams()

    if (!currentTeam) {
        await fetchTeams()

        if (!currentTeam) {
            return navigateTo('/app/')
        }
    }

    if (to.params.teamId) {
        if (to.params.teamId === 'undefined') {
            return navigateTo(to.path.replace('/undefined', `/${currentTeam.id}`))
        }

        if (to.params.teamId !== currentTeam.id.toString()) {
            return navigateTo(to.path.replace(`/${to.params.teamId}`, `/${currentTeam.id}`))
        }
    }
})
