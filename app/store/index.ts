import type { SupabaseClient } from '@supabase/supabase-js'
import type { Router } from 'vue-router'
import type { Database } from '~/server/types/supabase'

const getters = {
    supabaseClient: (): SupabaseClient<Database> => {
        return useSupabaseClient<Database>()
    },
    Router: (): Router => {
        return useRouter() as unknown as Router
    },
}

export { getters }
