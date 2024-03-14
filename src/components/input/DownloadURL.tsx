import {JSXElement} from "solid-js";
import Column from "~/components/layout/Column";
import Pg from "~/components/typography/Pg";

export default function DownloadURL(props: {
  icon: JSXElement,
  label: string,
  class?: string,
  downloadURL: string
}) {
  return (
    <Column
      class={`center hover:scale-105 cursor-pointer transition-all m-8 ${props.class || ""}`}
      onClick={() => window.open(props.downloadURL, "_blank")}>
      {props.icon}
      <Pg class={"text-xl lg:text-2xl font-semibold"}>{props.label}</Pg>
    </Column>
  )
}
