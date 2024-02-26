import {JSXElement} from "solid-js";

export function NavBar(props: { children: JSXElement }) {
  return (
    <nav class={"w-full dark:bg-stone-900 lg:flex flex-row justify-between text-lg"}>
      {props.children}
    </nav>
  )
}