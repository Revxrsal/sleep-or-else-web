import {createClient} from "@supabase/supabase-js";
import {Database} from "~/database/database-types";

export const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY
export const SUPABASE_PROJECT_URL: string = import.meta.env.VITE_SUPABASE_PROJECT_URL

export function createSupabaseClient() {
  return createClient<Database>(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY)
}
