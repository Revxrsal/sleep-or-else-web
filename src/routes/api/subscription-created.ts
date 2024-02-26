import {APIEvent} from "@solidjs/start/server/types";
import {paths} from "@paypal/paypal-js/types/apis/openapi/billing_subscriptions_v1";
import {createSupabaseClient} from "~/database/client";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET

export interface SubscriptionCreatedBody {
  subscriptionId: string,
  userId: string
}

const SANDBOX = true

function encodeAuth(clientId: string, clientSecret: string) {
  const v = `${clientId}:${clientSecret}`
  return btoa(v)
}

type BillingSubscriptionResponse = paths["/v1/billing/subscriptions/{id}"]["get"]["responses"]["200"]["content"]["application/json"]

export async function POST(event: APIEvent) {
  const body: SubscriptionCreatedBody = await event.request.json()

  const url = SANDBOX ? `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${body.subscriptionId}`
    : `https://api-m.paypal.com/v1/billing/subscriptions/${body.subscriptionId}`

  const response = await fetch(url, {
    headers: {
      "Authorization": `Basic ${encodeAuth(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET)}`,
      "Content-Type": "application/json"
    }
  })
  if (response.ok) {
    const result: BillingSubscriptionResponse = await response.json()
    const supabase = createSupabaseClient()
    await supabase.from("subscriptions").insert(
      {
        id: body.userId,
        subscription_key: result.id!
      }
    )
    return Response.json({
      success: true
    }, {
      status: 200
    })
  } else {
    const error = await response.json()
    return Response.json({
      status: response.status,
      error: error.message!
    },{
      status: response.status,
      statusText: response.statusText
    })
  }
}