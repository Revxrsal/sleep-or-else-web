import {createSupabaseSessionResource} from "~/database/primitives";
import {createEffect} from "solid-js";
import {useNavigate} from "@solidjs/router";
import Pg from "~/components/typography/Pg";

export default function Subscriptions() {
  const session = createSupabaseSessionResource()
  const navigate = useNavigate()
  createEffect(() => {
    if (session() == null && session.state === "ready") {
      navigate("/login")
    }
  })
  return (
    <main>
      <title>Subscriptions - Sleep or else</title>
      <Pg>Hello</Pg>
    </main>
  )
}