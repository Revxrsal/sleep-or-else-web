import {loadScript, PayPalNamespace} from "@paypal/paypal-js";
import {Accessor} from "solid-js";

export const PAYPAL_CLIENT_ID: string = import.meta.env.VITE_PAYPAL_CLIENT_ID

export type PayPalResource = Accessor<PayPalNamespace | undefined | null>

export function forSubscriptions() {
  return loadScript({
    clientId: PAYPAL_CLIENT_ID,
    vault: true,
    intent: "subscription",
  })
}

export function forCheckout() {
  return loadScript({
    clientId: PAYPAL_CLIENT_ID,
    vault: true,
  })
}
