import {createEffect, Suspense} from "solid-js";
import {PayPalButtonsComponentOptions} from "@paypal/paypal-js";
import {PayPalResource} from "~/paypal/paypal";
import Row from "~/components/layout/Row";

export interface PayPalButtonProps extends PayPalButtonsComponentOptions {
  class?: string,
  payPal: PayPalResource
}

export default function PayPalButtons(props: PayPalButtonProps) {
  const paypal = props.payPal
  let buttons: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;
  createEffect(async () => {
    if (paypal() && buttons) {
      try {
        await paypal()?.Buttons!(props).render(buttons as HTMLDivElement)
      } catch (e: any) {
        if (!e.message?.includes("zoid destroyed all components"))
          console.error(e.message)
      }
    }
  })

  return <Suspense>
    <Row class={"center my-auto align-middle justify-center"}>
      <div class={props.class} ref={el => buttons = el}/>
    </Row>
  </Suspense>
}