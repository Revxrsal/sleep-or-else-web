import {ComponentProps, splitProps} from "solid-js";

export interface BadgeProps extends ComponentProps<"span"> {
  class?: string,
}

export default function Badge(props: BadgeProps) {
  const [local, spanProps] = splitProps(props, ["class"])
  const bgClass = (local.class || "").includes("bg-") ? local.class! : "bg-red-600 dark:bg-red-600"
  const textClass = (local.class || "").includes("text-") ? local.class! : "text-white dark:text-white"
  return (
    <span
      class={`w-fit inline-flex 
      items-center justify-center 
      px-2 py-1 
      text-xs font-bold leading-none rounded-full
      ${textClass} ${bgClass}`} {...spanProps}/>
  )
}