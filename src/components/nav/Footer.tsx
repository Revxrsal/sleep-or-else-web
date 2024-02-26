import {ComponentProps, JSXElement, splitProps} from "solid-js";
import Pg from "~/components/typography/Pg";

export default function Footer() {
  return (
    <footer class={"flex flex-col lg:flex-row justify-around center align-middle mb-10"}>
      <Pg class={"text-sm opacity-80"}>© Sleep or else - All rights reserved</Pg>
    </footer>
  )
}

function Section(props: {
  title: string,
  children?: JSXElement
}) {
  return <section class={"text text-on-bg center m-4"}>
    <Pg class={"font-semibold text-xl m-2"}>{props.title}</Pg>
    <ul>
      {props.children}
    </ul>
  </section>
}

interface ItemProps extends ComponentProps<"a"> {
  class?: string
}

function Item(props: ComponentProps<"a">) {
  const [local, aProps] = splitProps(props, ["class"])
  return (<li><a class={`cursor-pointer m-2 transition-all hover:opacity-75 ${local.class || ""}`} {...props}></a></li>)
}