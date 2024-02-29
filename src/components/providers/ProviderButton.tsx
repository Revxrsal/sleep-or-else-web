import Button, {ButtonProps} from "~/components/input/Button";
import {JSXElement, splitProps} from "solid-js";
import {useSupabaseAuth} from "solid-supabase";
import {AiFillGithub, AiOutlineGoogle} from "solid-icons/ai";

export interface ProviderButtonProps extends Omit<ButtonProps, "class"> {
  class?: string
  icon: JSXElement
  name: string
  children?: JSXElement
}

export function ProviderButton(props: ProviderButtonProps) {
  const [local, buttonProps] = splitProps(props, ["class", "children", "icon"])
  return (
    <Button
      class={`min-w-96 h-12 flex flex-row justify-between items-center align-middle ${local.class || ""}`} {...buttonProps}>
      {local.icon}
      Continue with {props.name}
      <div/>
      {local.children}
    </Button>
  )
}

export function SignInWithGoogle() {
  const auth = useSupabaseAuth()

  async function login() {
    await auth.signInWithOAuth({
      options: {
        redirectTo: `${import.meta.env.BASE_URL}/pricing`
      },
      provider: "google",
    })
  }

  return (
    <ProviderButton
      icon={<AiOutlineGoogle size={32}/>}
      class={"bg-blue-600 dark:bg-blue-500 text-stone-100 dark:text-stone-50"}
      name="Google"
      onClick={login}
    />
  )
}

export function SignInWithGitHub() {
  const auth = useSupabaseAuth()

  async function login() {
    await auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${import.meta.env.BASE_URL}/pricing`
      }
    })
  }

  return (
    <ProviderButton
      icon={<AiFillGithub size={32}/>}
      class={"bg-stone-800 dark:bg-stone-50 text-stone-100 dark:text-stone-800"}
      name="GitHub"
      onClick={login}
    />
  )
}
