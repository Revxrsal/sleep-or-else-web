import {createResource, Resource} from "solid-js";
import {useOnAuthStateChange, useSupabaseAuth} from "solid-supabase";
import {Session} from "@supabase/supabase-js";

export function createSupabaseSessionResource(): Resource<Session | null> {
  const auth = useSupabaseAuth()
  const [session, {mutate}] = createResource(() => auth.getSession().then(v => v.data.session))
  useOnAuthStateChange((event, session) => {
    mutate(session)
  })
  return session
}