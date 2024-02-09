import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import Row from "~/components/layout/Row";
import Divider from "~/components/decoration/Divider";
import {SignUpButton} from "~/components/input/SignUpButton";
import Column from "~/components/layout/Column";
import Check from "~/components/icons/Check";
import {JSXElement} from "solid-js";
import Spacer from "~/components/decoration/Spacer";
import Badge from "~/components/decoration/Badge";
import Cross from "~/components/icons/Cross";

function PackFeature(props: {
  children: JSXElement
}) {
  return <Row class={"m-1 items-center"}>
    <Check class={"mx-2 fill-green-700"}/>
    <Pg class={"text-stone-800 dark:text-stone-800"}>{props.children}</Pg>
  </Row>
}


function NoPackFeature(props: {
  children: JSXElement
}) {
  return <Row class={"m-1 items-center"}>
    <Cross class={"mx-2 fill-red-700"}/>
    <Pg class={"text-stone-800 dark:text-stone-800"}>{props.children}</Pg>
  </Row>
}

export default function Pricing() {
  return (
    <main class={"pt-4 mt-4"}>
      <title>Pricing - Sleep or else</title>
      <Header class={"text-center my-0"}>
        Pricing
      </Header>
      <Divider class={"mx-8 my-12"}/>

      <Row class={"center justify-around"}>
        <Column class={"bg-gray-100 dark:bg-white rounded-2xl p-4 drop-shadow-lg m-3"}>
          <Pg class={"text-2xl text-start m-4 font-bold text-stone-800 dark:text-stone-800"} i>Monthly</Pg>
          <Header size={4} class={"text-start mt-1 mb-2 w-fit text-stone-800 dark:text-stone-800"}>
            <span class={"text-sm"}>$</span>
            <span class={"text-lime-800 drop-shadow dark:text-lime-800 text-5xl"}>1.99</span>
            <span class={"text-sm"}>USD/month</span>
          </Header>
          <Spacer class={"my-2"}/>
          <PackFeature>Full access to the application</PackFeature>
          <PackFeature>Full access to the browser extension</PackFeature>
          <PackFeature>Install on unlimited computers</PackFeature>
          <PackFeature>Access to periodic updates</PackFeature>
          <PackFeature>Priority support</PackFeature>
        </Column>

        <Column class={"bg-gray-100 dark:bg-white rounded-2xl p-4 drop-shadow-lg m-3"}>
          <Row>
            <Badge class={"bg-purple-800 dark:bg-purple-800 mx-2"}>BEST VALUE</Badge>
            <Badge class={"bg-green-800 dark:bg-green-800 mx-2"}>+2 FREE MONTHS</Badge>
          </Row>
          <Pg class={"text-2xl text-start m-4 font-bold text-stone-800 dark:text-stone-800"} i>Annually</Pg>
          <Header size={4} class={"text-start mt-1 mb-2 w-fit text-stone-800 dark:text-stone-800"}>
            <span class={"text-sm"}>$</span>
            <span class={"text-lime-800 drop-shadow dark:text-lime-800 text-5xl"}>1.67</span>
            <span class={"text-sm"}>USD/month</span>
          </Header>
          <Pg class={"text-stone-800 dark:text-stone-800 text-xs p-1"}>Billed annually as $19.99/year</Pg>
          <Spacer class={"my-2"}/>
          <PackFeature>Full access to the application</PackFeature>
          <PackFeature>Full access to the browser extension</PackFeature>
          <PackFeature>Install on unlimited computers</PackFeature>
          <PackFeature>Access to periodic updates</PackFeature>
          <PackFeature>Priority support</PackFeature>
        </Column>

        <Column class={"bg-gray-100 dark:bg-white rounded-2xl p-4 drop-shadow-lg m-3"}>
          <Pg class={"text-2xl text-start m-4 font-bold text-stone-800 dark:text-stone-800"}>One-time purchase</Pg>
          <Header size={4} class={"text-start mt-1 mb-2 w-fit text-stone-800 dark:text-stone-800"}>
            <span class={"text-sm"}>$</span>
            <span class={"text-lime-800 drop-shadow dark:text-lime-800 text-5xl"}>29.99</span>
            <span class={"text-sm"}>USD</span>
          </Header>
          <Spacer class={"my-2"}/>
          <PackFeature>Full access to the application</PackFeature>
          <PackFeature>Full access to the browser extension</PackFeature>
          <PackFeature>Install on unlimited computers</PackFeature>
          <PackFeature>Access to periodic updates</PackFeature>
          <NoPackFeature>Priority support</NoPackFeature>
        </Column>
      </Row>

      <Divider class={"mx-8 mt-12"}/>

      <Header class={"text-center"}>Not sure yet?</Header>
      <Pg class={"text-center text-xl text-yellow-800 dark:text-yellow-200 mx-8"}>
        You can get a free trial of <span class={"font-bold"}>14 days</span>, and a 30-day money back
        guarantee after purchase. No questions asked.
      </Pg>
      <Row class={"items-center justify-center center m-8 mx-8 mb-0"}>
        <SignUpButton/>
      </Row>
    </main>
  )
}