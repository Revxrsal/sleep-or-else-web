import Header from "~/components/typography/Header";
import BlockedSVG from "~/components/icons/BlockedSVG";
import Column from "~/components/layout/Column";
import PageTitle from "~/components/meta/PageTitle";
import {onMount} from "solid-js";
import Pg from "~/components/typography/Pg";

export default function Blocked() {
  onMount(() => document.getElementsByTagName("html")[0].classList.add("dark"))
  return (
    <main>
      <PageTitle>Page blocked</PageTitle>
      <Column center>
        <BlockedSVG class={"w-48 h-48 m-8"}/>
        <Header class={"text-center"}>This page has been blocked</Header>
        <Pg class={"text-3xl px-8"}>
          Don't give up what you want most for what you want now
        </Pg>
      </Column>
    </main>
  )
}