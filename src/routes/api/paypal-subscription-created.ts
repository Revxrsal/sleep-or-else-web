import {APIEvent} from "@solidjs/start/server/types";
import {paths} from "@paypal/paypal-js/types/apis/openapi/billing_subscriptions_v1";
import {createSupabaseClient} from "~/database/client";
import {authorization, BASE_URL} from "~/routes/api/util";
import {env} from "~/routes/api/environment";
import {LicenseType} from "~/routes/api/types";

export interface SubscriptionCreatedBody {
  subscriptionId: string,
  userId: string,
  subscriptionType: LicenseType
}

type BillingSubscriptionResponse = paths["/v1/billing/subscriptions/{id}"]["get"]["responses"]["200"]["content"]["application/json"]

async function saveSubscription(body: SubscriptionCreatedBody, result: BillingSubscriptionResponse) {
  const supabase = createSupabaseClient(env.SUPABASE_SERVICE_ROLE)
  if (body.subscriptionType != "SUBSCRIPTION_YEARLY" && body.subscriptionType != "SUBSCRIPTION_MONTHLY") {
    return Response.json({
      success: false
    }, {
      status: 400,
      statusText: "Subscription type must be either SUBSCRIPTION_YEARLY or SUBSCRIPTION_MONTHLY"
    })
  }
  const response = await supabase.from("licenses").insert(
    {
      id: body.userId,
      bought_from: "PAYPAL",
      license_type: body.subscriptionType,
      purchase_data: {
        id: result.id!,
      }
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

export async function getUserSubscription(subscriptionId: string) {
  const response = await fetch(`${BASE_URL}/v1/billing/subscriptions/${subscriptionId}`, {
    headers: {
      "Authorization": authorization(),
      "Content-Type": "application/json"
    }
  })
  if (response.ok) {
    const result: BillingSubscriptionResponse = await response.json()
    return result
  } else {
    return null
  }
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