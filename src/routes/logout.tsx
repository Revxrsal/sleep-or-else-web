import PageTitle from "~/components/meta/PageTitle";
import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import Button from "~/components/input/Button";
import {onMount} from "solid-js";
import {useSupabaseAuth} from "solid-supabase";
import {useNavigate} from "@solidjs/router";

export default function LogOut() {
  const auth = useSupabaseAuth()
  const navigate = useNavigate()
  onMount(async () => {
    await auth.signOut()
  })
  return (
    <main class={"center"}>
      <PageTitle>Log out</PageTitle>
      <Header class={"text-center mt-0"}>Log out</Header>
      <Pg class={"text-3xl text-center m-8"}>You have been successfully logged out.</Pg>
      <Button onClick={() => navigate("/")}>
        Go back
      </Button>
    </main>
  )
}