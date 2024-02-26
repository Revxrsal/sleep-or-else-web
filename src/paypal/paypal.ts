import {Accessor, createContext, useContext} from "solid-js";
import {loadScript, PayPalNamespace} from "@paypal/paypal-js";

export const PAYPAL_CLIENT_ID: string = import.meta.env.VITE_PAYPAL_CLIENT_ID

export const PayPalContext = createContext()

export function createPayPal() {
  return loadScript({
    clientId: PAYPAL_CLIENT_ID,
    vault: true,
    intent: "subscription",
  })
}

export function usePayPal(): Accessor<PayPalNamespace> {
  return useContext(PayPalContext) as Accessor<PayPalNamespace>
}
