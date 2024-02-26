import Header from "~/components/typography/Header";
import BlockedSVG from "~/components/icons/BlockedSVG";
import Column from "~/components/layout/Column";

export default function Blocked() {
  return (
    <main>
      <Column center>
        <BlockedSVG class={"w-48 h-48 m-8"}/>
        <Header class={"text-center"}>This page has been blocked</Header>
      </Column>
    </main>
  )
}