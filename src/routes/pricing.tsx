import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import Row from "~/components/layout/Row";
import Divider from "~/components/decoration/Divider";
import {SignUpButton} from "~/components/input/SignUpButton";
import Column from "~/components/layout/Column";
import Check from "~/components/icons/Check";
import {createEffect, createSignal, JSXElement, onMount, Show} from "solid-js";
import Spacer from "~/components/decoration/Spacer";
import Badge from "~/components/decoration/Badge";
import Cross from "~/components/icons/Cross";
import Flex from "~/components/layout/Flex";
import {ButtonProps} from "~/components/input/Button";
import PayPalButtons from "~/paypal/PayPalButtons";
import {createSupabaseSessionResource} from "~/database/primitives";
import {useNavigate} from "@solidjs/router";
import {forCheckout, forSubscriptions, PayPalResource} from "~/paypal/paypal";
import SwitchButton from "~/components/input/SwitchButton";
import {PayPalNamespace} from "@paypal/paypal-js";
import {CreateOrderRequestBody} from "~/routes/api/create-order";
import {SubscriptionCreatedBody} from "~/routes/api/subscription-created";
import {LicenseType} from "~/routes/api/types";
import PageTitle from "~/components/meta/PageTitle";

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
  payPal: PayPalResource
  class?: string
} & ButtonProps) {
  const navigate = useNavigate()
  const session = createSupabaseSessionResource()
  return <PayPalButtons
    payPal={props.payPal}
    class={`mx-auto w-32 lg:w-48 mt-8 ${props.class || ""}`}
    style={{
      shape: "rect",
      color: "blue",
      layout: "vertical",
      label: "checkout"
    }}
    createOrder={async (data, actions) => {
      const request: CreateOrderRequestBody = {
        purchase: "Lifetime"
      }
      return await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      }).then(async res => {
        const json = await res.json();
        return res.ok ? json : await Promise.reject(json);
      }).then(({orderId}) => orderId).catch(e => {
        console.log(e.error)
      });
    }}
    onApprove={async (data, _actions) => {
      await fetch("/api/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId: data.orderID,
          userId: session()?.user!.id!
        })
      })
      navigate("/purchase-success")
    }}/>
}

function SubscribeButton(props: { planId: string, subscriptionType: LicenseType, payPal: PayPalResource }) {
  const session = createSupabaseSessionResource()
  const navigate = useNavigate()
  return <PayPalButtons
    payPal={props.payPal}
    class={"mx-auto w-32 lg:w-48 mt-8"}
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
      async (data, _actions) => {
        /*const response = */
        await fetch("/api/subscription-created", {
          method: "POST",
          body: JSON.stringify({
            subscriptionId: data.subscriptionID!,
            userId: session()?.user!.id!,
            subscriptionType: props.subscriptionType
          } as SubscriptionCreatedBody)
        });
        // console.log(await response.json())
        navigate("/purchase-success")
      }
    }
  />
}

function MonthlyPlan(props: {
  payPal: PayPalResource
}) {
  return (
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
      <SubscribeButton
        subscriptionType="SUBSCRIPTION_MONTHLY"
        payPal={props.payPal} planId="P-6S924879LV528163NMXIP2UI"
      />
    </Column>
  )
}

function YearlyPlan(props: {
  payPal: PayPalResource
}) {
  return (
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
      <SubscribeButton
        subscriptionType="SUBSCRIPTION_YEARLY"
        payPal={props.payPal}
        planId="P-6S924879LV528163NMXIP2UI"
      />
    </Column>
  )
}

function LifetimePlan(props: {
  payPal: PayPalResource
}) {
  return (
    <Column class={"bg-gray-100 dark:bg-white rounded-2xl p-4 drop-shadow-lg m-3"}>
      <Pg class={"text-2xl text-start m-4 font-bold text-stone-800 dark:text-stone-800"}>Lifetime purchase</Pg>
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
      <BuyNowButton payPal={props.payPal}/>
    </Column>
  )
}

export default function Pricing() {
  const [lifetime, setLifetime] = createSignal(false)
  const [payPal, setPayPal] = createSignal<PayPalNamespace | null>(null)
  onMount(async () => {
    if (lifetime())
      setPayPal((await forCheckout())!)
    else
      setPayPal((await forSubscriptions())!)
  })
  let lastSwitched: string | number | NodeJS.Timeout | undefined;
  createEffect(async () => {
    clearTimeout(lastSwitched)
    const isLifetime = lifetime() // so solid can track it here
    const payPalValue = payPal()
    await payPalValue?.Buttons?.().close()
    if (isLifetime)
      setPayPal((await forCheckout())!)
    else
      setPayPal((await forSubscriptions())!)
  })
  return (
    <main class={"pt-4 mt-4"}>
      <PageTitle>Pricing</PageTitle>
      <Header class={"text-center my-0"}>Pricing</Header>
      <Divider class={"mx-8 my-8 mb-0 lg:my-12"}/>
      <Row class={"justify-center"}>
        <Pg class={"font-semibold"}>Subscription</Pg>
        <SwitchButton onClick={() => setLifetime(v => !v)} checked={lifetime()}/>
        <Pg class={"font-semibold"}>Lifetime</Pg>
      </Row>
      <Flex class={"flex-col lg:flex-row center justify-around scale-[85%] lg:scale-100"}>
        <Show when={lifetime()} fallback={
          <>
            <YearlyPlan payPal={payPal}/>
            <MonthlyPlan payPal={payPal}/>
          </>
        }>
          <LifetimePlan payPal={payPal}/>
        </Show>
      </Flex>

      <Divider class={"mx-8 mt-12"}/>

      <Header class={"text-center"}>Not sure yet?</Header>
      <Pg class={"text-center text-xl text-yellow-800 dark:text-yellow-200 mx-8"}>
        Get a free trial of <span class={"font-bold"}>14 days</span>, and a 30-day money back
        guarantee after purchase. No questions asked.
      </Pg>
      <Row class={"items-center justify-center center m-8 mx-8 mb-0"}>
        <SignUpButton/>
      </Row>
    </main>
  )
}