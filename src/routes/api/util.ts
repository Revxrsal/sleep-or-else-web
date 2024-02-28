export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
export const PAYPAL_CLIENT_SECRET = import.meta.env.VITE_PAYPAL_CLIENT_SECRET

const SANDBOX = import.meta.env.VITE_SANDBOX === "true"
export const BASE_URL = `https://api.${SANDBOX ? "sandbox." : ""}paypal.com`
export const WEB_URL = `https://${SANDBOX ? "sandbox." : ""}paypal.com`

export function authorization() {
  return `Basic ${btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`)}`
}