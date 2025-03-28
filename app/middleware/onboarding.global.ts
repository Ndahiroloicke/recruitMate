import type { TableRows } from '~/types/supabase-helper'
import { useAuth } from '~/store/auth'

export default defineNuxtRouteMiddleware(async (to) => {
    const user = useSupabaseUser()
    const auth = useAuth()
    let me: TableRows<'recruiters'> | undefined

    if (user.value)
        me = await auth.getMe()

    if (!me?.tos_accepted && !/onboarding/.test(to.fullPath) && user.value)
        return navigateTo('/onboarding')
})
