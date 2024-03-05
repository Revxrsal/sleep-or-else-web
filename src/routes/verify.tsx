import PageTitle from "~/components/meta/PageTitle";
import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import Row from "~/components/layout/Row";
import Button from "~/components/input/Button";
import {useNavigate} from "@solidjs/router";
import {createSignal} from "solid-js";
import {useSupabaseAuth} from "solid-supabase";

export default function Verify() {
  const navigate = useNavigate()
  const auth = useSupabaseAuth()
  const [canResend, setCanResend] = createSignal(true)
  const email = async () => (await auth.getSession()).data.session?.user?.email

  async function resend() {
    const userEmail = await email();
    if (userEmail) {
      setCanResend(false)
      await auth.resend({
        type: "signup",
        email: (await auth.getSession()).data.session?.user?.email || ""
      })
      setTimeout(() => setCanResend(true), 300 * 1000)
    }
  }

  return (
    <main class={"center"}>
      <PageTitle>Successfully registered</PageTitle>
      <Header>Successfully registered</Header>
      <Pg class={"m-8 text-xl"}>
        A verification e-mail has been sent to you. Please check your inbox.
      </Pg>
      <Row class={"align-middle"}>
        <Button class={"m-8"} onClick={() => navigate("/login")}>
          Sign in
        </Button>
        <Button disabled={!canResend()} class={"m-8"} onClick={resend}>
          Re-send verification email
        </Button>

      </Row>
    </main>
  )
}