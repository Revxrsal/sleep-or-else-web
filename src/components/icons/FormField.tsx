import {ComponentProps, splitProps} from "solid-js";
import Column from "~/components/layout/Column";

export interface FormFieldProps extends ComponentProps<"input"> {
  label: string
  class?: string
}

export default function FormField(props: FormFieldProps) {
  const [local, inputProps] = splitProps(props, ["label", "class"])
  return (
    <Column class={"text-start"}>
      <label for="password" class={"text text-on-bg mx-4 font-semibold"}>{props.label}</label>
      <input
        type={props.type}
        class={`w-96 lg:w-[420px] p-3 mx-3 my-1 rounded-md outline-none bg-stone-300 dark:bg-stone-950 text-on-bg ${local.class || ""}`}
        placeholder={props.label}
        {...inputProps}
      />
    </Column>
  )
}