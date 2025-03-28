export default defineNuxtRouteMiddleware(async (to) => {
    const user = useSupabaseUser()
    console.log('Auth middleware:', { path: to.fullPath, user: !!user.value })

    if (to.fullPath === '/auth') {
        if (user.value)
            return navigateTo('/app')
        return
    }

    if (to.fullPath.startsWith('/app')) {
        if (!user.value)
            return navigateTo('/auth')
    }
})
