import {createClient} from "@supabase/supabase-js";
import {Database} from "~/database/database-types";

export const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY
export const SUPABASE_PROJECT_URL: string = import.meta.env.VITE_SUPABASE_PROJECT_URL

export function createSupabaseClient(key = SUPABASE_ANON_KEY) {
  return createClient<Database>(SUPABASE_PROJECT_URL, key)
}
