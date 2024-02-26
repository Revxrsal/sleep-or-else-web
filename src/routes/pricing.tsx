import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import Row from "~/components/layout/Row";
import Divider from "~/components/decoration/Divider";
import {SignUpButton} from "~/components/input/SignUpButton";
import Column from "~/components/layout/Column";
import Check from "~/components/icons/Check";
import {JSXElement, splitProps} from "solid-js";
import Spacer from "~/components/decoration/Spacer";
import Badge from "~/components/decoration/Badge";
import Cross from "~/components/icons/Cross";
import Flex from "~/components/layout/Flex";
import Button, {ButtonProps} from "~/components/input/Button";
import PayPalButtons from "~/paypal/PayPalButtons";
import {createSupabaseSessionResource} from "~/database/primitives";
import {useNavigate} from "@solidjs/router";

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

function BuyNowButton(props: {
  class?: string
} & ButtonProps) {
  const [local, bProps] = splitProps(props, ["class"])
  return <Button class={`
          w-full mx-auto my-auto mt-8 h-12 
          flex flex-row align-middle justify-center center 
          bg-blue-600 dark:bg-blue-600 
          text text-stone-200 ${local.class || ""}`
  } {...bProps}>
    Buy now
  </Button>
}

function SubscribeButton(props: { planId: string }) {
  const session = createSupabaseSessionResource()
  const navigate = useNavigate()
  return <PayPalButtons
    class={"mx-auto w-32 lg:w-48"}
    style={{
      shape: "rect",
      color: "blue",
      layout: "vertical",
      label: "subscribe"
    }}
    createSubscription={(_data, actions) => {
      return actions.subscription.create({
        plan_id: props.planId
      })
    }}
    onApprove={
      async (data, actions) => {
        const response = await fetch("/api/subscription-created", {
          method: "POST",
          body: JSON.stringify({
            subscriptionId: data.subscriptionID!,
            userId: session()?.user!.id!
          })
        });
        console.log(response)
        console.log(await response.json())
        navigate("/purchase-success")
      }
    }
  />
}

export default function Pricing() {
  return (
    <main class={"pt-4 mt-4"}>
      <title>Pricing - Sleep or else</title>
      <Header class={"text-center my-0"}>
        Pricing
      </Header>
      <Divider class={"mx-8 my-8 mb-0 lg:my-12"}/>

      <Flex class={"flex-col lg:flex-row center justify-around scale-[85%] lg:scale-100"}>
        <Column class={"bg-gray-100 dark:bg-white rounded-2xl p-4 drop-shadow-lg m-3"}>
          <Pg class={"text-2xl text-start m-4 font-bold text-stone-800 dark:text-stone-800"} i>Monthly</Pg>
          <Header size={4} class={"text-start mt-1 mb-2 w-fit text-stone-800 dark:text-stone-800"}>
            <span class={"text-sm"}>$</span>
            <span class={"text-orange-800 drop-shadow dark:text-orange-800 text-5xl"}>1.99</span>
            <span class={"text-sm"}>USD/month</span>
          </Header>
          <Spacer class={"my-2"}/>
          <PackFeature>Full access to the application</PackFeature>
          <PackFeature>Full access to the browser extension</PackFeature>
          <PackFeature>Install on unlimited computers</PackFeature>
          <PackFeature>Access to periodic updates</PackFeature>
          <PackFeature>Priority support</PackFeature>
          <div class={"mt-8"}>
            <SubscribeButton planId="P-6S924879LV528163NMXIP2UI"/>
          </div>
          {/*<BuyNowButton onClick={() => console.log("A")}/>*/}
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
            <span class={"text-orange-800 drop-shadow dark:text-orange-800 text-5xl"}>29.99</span>
            <span class={"text-sm"}>USD</span>
          </Header>
          <Spacer class={"my-2"}/>
          <PackFeature>Full access to the application</PackFeature>
          <PackFeature>Full access to the browser extension</PackFeature>
          <PackFeature>Install on unlimited computers</PackFeature>
          <PackFeature>Access to periodic updates</PackFeature>
          <NoPackFeature>Priority support</NoPackFeature>
        </Column>
      </Flex>

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