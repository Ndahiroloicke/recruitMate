import type { Database } from '~/server/types/supabase'

export type TableRows<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
