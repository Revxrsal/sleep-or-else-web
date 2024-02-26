import Column from "~/components/layout/Column";
import Spacer from "~/components/decoration/Spacer";
import Button from "~/components/input/Button";
import {useSupabaseAuth} from "solid-supabase";
import {createSignal, Show} from "solid-js";
import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import {useNavigate} from "@solidjs/router";
import FormField from "~/components/icons/FormField";
import {SignInWithGitHub, SignInWithGoogle} from "~/components/providers/ProviderButton";

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = createSignal("")
  const [password, setPassword] = createSignal("")
  const auth = useSupabaseAuth()
  const [error, setError] = createSignal("")
  return (
    <main class={"mt-0"}>
      <title>Login - Sleep or else</title>
      <Column center>
        <Header size={3} class={"text-3xl md:text-4xl lg:text-5xl"}>
          Welcome back!
        </Header>

        <SignInWithGoogle/>
        <SignInWithGitHub/>

        <Spacer class={"my-4"}/>

        <FormField
          label={"Email address"}
          value={email()}
          onInput={v => {
            setEmail(v.target.value)
            setError("")
          }}
        />

        <Spacer class={"my-1"}/>

        <FormField
          label={"Password"}
          type={"password"}
          value={password()}
          onInput={v => {
            setPassword(v.target.value)
            setError("")
          }}
        />

        <Button
          class={"min-w-32 px-4 mt-8"}
          disabled={password().length <= 3 || email().length == 0}
          onClick={async () => {
            const result = await auth.signInWithPassword({
              email: email(),
              password: password(),
            })
            if (result.error) {
              setError(result.error.message)
            }
          }}>
          Sign in
        </Button>
        <Show when={error().length > 0}>
          <Pg class={"text-red-500 dark:text-red-500"}>{error()}</Pg>
        </Show>
        <Pg class={"my-4"}>
          Don't have an account? <span
          class={"font-semibold text text-yellow-800 dark:text-yellow-200 cursor-pointer"}
          onClick={() => navigate("/signup")}>Sign up</span> instead
        </Pg>
      </Column>
    </main>
  )
}