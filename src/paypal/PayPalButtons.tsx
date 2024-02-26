import {usePayPal} from "~/paypal/paypal";
import {createEffect, Suspense} from "solid-js";
import {PayPalButtonsComponentOptions} from "@paypal/paypal-js";

export interface PayPalButtonProps extends PayPalButtonsComponentOptions {
  class?: string
}

export default function PayPalButtons(props: PayPalButtonProps) {
  const paypal = usePayPal()
  let buttons: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;
  createEffect(async () => {
    if (paypal() && buttons) {
      await paypal()!.Buttons!(props).render(buttons as HTMLDivElement)
    }
  })

  return <Suspense>
    <div class={props.class} ref={el => buttons = el}/>
  </Suspense>
}