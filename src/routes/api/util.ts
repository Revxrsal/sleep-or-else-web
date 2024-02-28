import {env} from "~/routes/api/environment";

const SANDBOX = import.meta.env.VITE_SANDBOX === "true"
export const BASE_URL = `https://api.${SANDBOX ? "sandbox." : ""}paypal.com`
export const WEB_URL = `https://${SANDBOX ? "sandbox." : ""}paypal.com`

export function authorization() {
  return `Basic ${btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`)}`
}