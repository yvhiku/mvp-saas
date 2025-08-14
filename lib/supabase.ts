import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kwmzrnzizsjuslqojozt.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3bXpybnppenNqdXNscW9qb3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzM3NTcsImV4cCI6MjA3MDY0OTc1N30.38pdrrjrCUPxnOA27J2T--okTuqRrGMoaUx4VKKNtSM'

// Only throw error in production
if (process.env.NODE_ENV === 'production' && (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder'))) {
  throw new Error(
    'Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)


export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          subscription_status: string | null
          subscription_plan: string | null
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          subscription_status?: string | null
          subscription_plan?: string | null
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          subscription_status?: string | null
          subscription_plan?: string | null
          stripe_customer_id?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          target_market: string
          main_features: string[]
          blueprint: any | null
          wireframe_url: string | null
          pitch_deck: any | null
          checklist: any | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          target_market: string
          main_features: string[]
          blueprint?: any | null
          wireframe_url?: string | null
          pitch_deck?: any | null
          checklist?: any | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          target_market?: string
          main_features?: string[]
          blueprint?: any | null
          wireframe_url?: string | null
          pitch_deck?: any | null
          checklist?: any | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}