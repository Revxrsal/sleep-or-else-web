import {APIEvent} from "@solidjs/start/server/types";
import {paths} from "@paypal/paypal-js/types/apis/openapi/billing_subscriptions_v1";
import {createSupabaseClient} from "~/database/client";
 import {authorization, BASE_URL} from "~/routes/api/util";
import {env} from "~/routes/api/environment";

export interface SubscriptionCreatedBody {
  subscriptionId: string,
  userId: string
}

type BillingSubscriptionResponse = paths["/v1/billing/subscriptions/{id}"]["get"]["responses"]["200"]["content"]["application/json"]

async function saveSubscription(body: SubscriptionCreatedBody, result: BillingSubscriptionResponse) {
  const supabase = createSupabaseClient(env.SUPABASE_SERVICE_ROLE)
  const response = await supabase.from("subscriptions").insert(
    {
      id: body.userId,
      subscription_key: result.id!
    }
  )
  if (response.error) {
    console.error("Error occurred", response.error)
    return Response.json({
      success: false
    }, {
      status: response.status,
      statusText: response.statusText
    })
  }
  return Response.json({
    success: true
  }, {
    status: 200
  })
}

export async function POST(event: APIEvent) {
  const body: SubscriptionCreatedBody = await event.request.json()
  const response = await fetch(`${BASE_URL}/v1/billing/subscriptions/${body.subscriptionId}`, {
    headers: {
      "Authorization": authorization(),
      "Content-Type": "application/json"
    }
  })
  if (response.ok) {
    const result: BillingSubscriptionResponse = await response.json()
    return saveSubscription(body, result);
  } else {
    const error = await response.json()
    return Response.json({
      status: response.status,
      error: error.message!
    }, {
      status: response.status,
      statusText: response.statusText
    })
  }
}