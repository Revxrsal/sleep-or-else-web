import Header from "~/components/typography/Header";
import Button from "~/components/input/Button";
import {useSupabaseAuth} from "solid-supabase";
import {createSupabaseSessionResource} from "~/database/primitives";
import {onMount, Show} from "solid-js";
import Column from "~/components/layout/Column";
import {useNavigate} from "@solidjs/router";
import PageTitle from "~/components/meta/PageTitle";

export default function Account() {
  const auth = useSupabaseAuth()
  const session = createSupabaseSessionResource()
  const navigate = useNavigate()
  onMount(() => {
    if (session() == null)
      navigate("/")
  })
  return (
    <main>
      <Column class={"center"}>
        <PageTitle>Account</PageTitle>
        <Header>Account</Header>
        <Show when={session() != null}>
          <Button onClick={() => auth.signOut()}>
            Sign out
          </Button>
        </Show>
      </Column>
    </main>
  )
}