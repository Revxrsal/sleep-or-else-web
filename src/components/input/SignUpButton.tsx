import {createEffect} from "solid-js";
import Button from "~/components/input/Button";

export const FORM_URL = "https://forms.gle/LmwzAxr79pxptd2U7"

export function SignUpButton(props: {
  class?: string
}) {
  return <Button class={props.class} onClick={() => window.open(FORM_URL)}>Sign up for pre-release</Button>
}
