import { useRoute } from 'vue-router'

export function useTeamContext() {
    const route = useRoute()
    const teamId = computed(() => Number(route.params.teamId))

    return {
        teamId
    }
} 