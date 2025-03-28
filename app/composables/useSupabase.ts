import type { Database } from '~/server/types/supabase'

export const useSupabase = () => useSupabaseClient<Database>()
