import PageTitle from "~/components/meta/PageTitle"
import Header from "~/components/typography/Header"
import Row from "~/components/layout/Row";
import { FaBrandsDiscord } from "solid-icons/fa";

const DISCORD_URL = "https://discord.com/invite/uwf72ZN"

export default function Support() {
  return (
    <main class={"center"}>
      <PageTitle>Support</PageTitle>
      <Header>Support</Header>
      <Row class={"bg-blue-600 dark:bg-blue-600 p-8 rounded-full h-12 center select-none font-semibold text-white dark:text-white justify-between min-w-60 hover:brightness-90 cursor-pointer"}
      onClick={() => window.open(DISCORD_URL, "_blank")}>
        <FaBrandsDiscord size={32}/>
        Join our Discord
      </Row>
    </main>
  )
}