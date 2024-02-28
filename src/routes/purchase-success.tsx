import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import Column from "~/components/layout/Column";

export default function PurchaseSuccess() {
  return (
    <main class={"mt-0"}>
      <title>Purchase successful!</title>
      <Column>
        <Header>Purchase successful!</Header>
        <Pg class={"mx-12 text-xl"}>
          Thank you for investing in your sleep. It's worth it! We won't let you down.
        </Pg>
      </Column>
    </main>
  )
}