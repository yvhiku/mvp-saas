import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
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