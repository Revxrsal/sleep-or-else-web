import Button from "~/components/input/Button";
import {useNavigate} from "@solidjs/router";

// export const FORM_URL = "https://forms.gle/LmwzAxr79pxptd2U7"

export function SignUpButton(props: {
  class?: string
}) {
  const navigate = useNavigate()
  return (
      <Button class={props.class} onClick={() => navigate("/login")}>Log in</Button>
  )
}
