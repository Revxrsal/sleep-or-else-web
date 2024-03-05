import Header from "~/components/typography/Header";
import Column from "~/components/layout/Column";
import {createSignal, Show} from "solid-js";
import Button from "~/components/input/Button";
import {useSupabaseAuth} from "solid-supabase";
import Pg from "~/components/typography/Pg";
import {useNavigate} from "@solidjs/router";
import FormField from "~/components/icons/FormField";
import {SignInWithGitHub, SignInWithGoogle} from "~/components/providers/ProviderButton";
import PageTitle from "~/components/meta/PageTitle";

export default function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = createSignal("")
  const [password, setPassword] = createSignal("")
  const [confirmPassword, setConfirmPassword] = createSignal("")
  const [error, setError] = createSignal("")
  const auth = useSupabaseAuth()
  return (
    <main class={"mt-0"}>
      <PageTitle>Sign up</PageTitle>
      <Column center>
        <Header size={3} class={"text-3xl md:text-4xl lg:text-5xl"}>
          Welcome abroad!
        </Header>
        {/*<SignInWithGoogle/>*/}
        {/*<SignInWithGitHub/>*/}
        {/*<Pg class={"font-semibold my-8"}>Or sign-up with email address</Pg>*/}
        <FormField
          label={"Email address"}
          value={email()}
          onInput={v => {
            setEmail(v.target.value)
            setError("")
          }}
          class={"mb-10"}
        />

        <FormField
          label={"Password"}
          type={"password"}
          value={password()}
          onInput={v => {
            setPassword(v.target.value)
            setError("")
          }}
          class={"mb-5"}
        />

        <FormField
          label={"Confirm password"}
          type={"password"}
          value={confirmPassword()}
          onInput={v => {
            setConfirmPassword(v.target.value)
            setError("")
          }}
        />

        <Button
          class={"min-w-32 px-4 mt-8"}
          disabled={password().length <= 3 || email().length == 0 || confirmPassword() != password()}
          onClick={async () => {
            const res = await auth.signUp({
              email: email(),
              password: password()
            })
            if (res.error) {
              setError(res.error.message)
            }
          }}>
          Sign up
        </Button>
        <Show when={error().length > 0}>
          <Pg class={"text-red-500 dark:text-red-500"}>{error()}</Pg>
        </Show>
        <Pg class={"my-4"}>
          Already have an account? <span
          class={"font-semibold text text-yellow-800 dark:text-yellow-200 cursor-pointer"}
          onClick={() => navigate("/login")}>Sign in</span> instead
        </Pg>

      </Column>
    </main>
  )
}