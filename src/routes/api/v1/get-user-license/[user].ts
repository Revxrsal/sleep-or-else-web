import {components} from "@paypal/paypal-js/types/apis/openapi/billing_subscriptions_v1";
import {APIEvent} from "@solidjs/start/server/types";
import {createSupabaseClient} from "~/database/client";
import {env} from "~/routes/api/environment";
import {getUserSubscription} from "~/routes/api/subscription-created";

interface SubscriptionResponse {
  hasLicense: boolean,
  status: components["schemas"]["subscription_status"]["status"] | "NOT_SUBSCRIBED",
}

export async function GET(event: APIEvent) {
  const {user} = event.params;

  const supabase = createSupabaseClient(env.SUPABASE_SERVICE_ROLE)
  const {data, error} = await supabase.from("licenses")
    .select("paypal_id, license_type")
    .limit(1)
    .eq("id", user)

  if (error || !data || !data[0]) {
    console.log(error)
    return Response.json(
      {
        hasLicense: false,
        status: "NOT_SUBSCRIBED"
      } as SubscriptionResponse
    )
  }

  const {paypal_id, license_type} = data[0]
  if (license_type == "LIFETIME") {
    return Response.json(
      {
        hasLicense: true,
        status: "ACTIVE"
      } as SubscriptionResponse
    )
  }

  const subscription = await getUserSubscription(paypal_id)
  if (subscription == null) {
    return Response.json(
      {
        hasLicense: false,
        status: "NOT_SUBSCRIBED"
      } as SubscriptionResponse
    )
  }

  return Response.json(
    {
      hasLicense: true,
      status: subscription.status
    } as SubscriptionResponse
  )
}