import PageTitle from "~/components/meta/PageTitle";
import Column from "~/components/layout/Column";
import Header from "~/components/typography/Header";
import FormField from "~/components/icons/FormField";
import Button from "~/components/input/Button";
import {createSignal, Show} from "solid-js";
import Pg from "~/components/typography/Pg";
import {useNavigate} from "@solidjs/router";
import {useSupabaseAuth} from "solid-supabase";
import Row from "~/components/layout/Row";

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = createSignal("")
  const auth = useSupabaseAuth()
  const [error, setError] = createSignal("")
  const [success, setSuccess] = createSignal(false)
  const [canResend, setCanResend] = createSignal(true)

  async function send() {
    const userEmail = email();
    if (userEmail) {
      setCanResend(false)
      const {error} = await auth.resetPasswordForEmail(userEmail)
      if (error) {
        setError(error.message)
        setSuccess(false)
      } else {
        setError("")
        setSuccess(true)
      }
      setTimeout(() => setCanResend(true), 300 * 1000)
    }
  }

  return (
    <main class={"mt-0"}>
      <PageTitle>Reset your password</PageTitle>
      <Column center>
        <Header size={3} class={"text-3xl md:text-4xl lg:text-5xl"}>
          Reset your password
        </Header>

        <FormField
          label={"Email address"}
          type={"email"}
          value={email()}
          onInput={v => {
            setEmail(v.target.value)
            setError("")
            setSuccess(false)
          }}
        />
        <Row class={"m-8"}>
          <Button
            class={"px-4 h-12 flex flex-row align-middle center items-center"}
            onClick={() => navigate("/login")}
          >
            Back
          </Button>

          <Button
            class={"px-4 h-12 flex flex-row align-middle center items-center"}
            onClick={send}
            disabled={!canResend()}
          >
            Send reset link
          </Button>
        </Row>
        <Show when={error().length > 0}>
          <Pg class={"text-red-500 dark:text-red-500"}>{error()}</Pg>
        </Show>
        <Show when={success()}>
          <Pg class={"text-lime-500 dark:text-red-500"}>
            Reset link successfully sent. It may take up to 5 minutes for it to appear in your inbox.
          </Pg>
        </Show>
      </Column>
    </main>
  )
}