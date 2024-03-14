import {components} from "@paypal/paypal-js/types/apis/openapi/billing_subscriptions_v1";
import {APIEvent} from "@solidjs/start/server/types";
import {createSupabaseClient} from "~/database/client";
import {env} from "~/routes/api/environment";
import {getUserSubscription} from "~/routes/api/paypal-subscription-created";

interface SubscriptionResponse {
  hasLicense: boolean,
  status: components["schemas"]["subscription_status"]["status"] | "NOT_SUBSCRIBED",
}

const NOT_SUBSCRIBED: SubscriptionResponse = {
  hasLicense: false,
  status: "NOT_SUBSCRIBED"
}

const LIFETIME_ACTIVE: SubscriptionResponse = {
  hasLicense: true,
  status: "ACTIVE"
}

export async function GET(event: APIEvent) {
  const {user} = event.params;

  const supabase = createSupabaseClient(env.SUPABASE_SERVICE_ROLE)
  const {data, error} = await supabase.from("licenses")
    .select("license_type, bought_from, purchase_data")
    .limit(1)
    .eq("id", user)

  if (error || !data || !data[0]) {
    console.log(error)
    return Response.json(NOT_SUBSCRIBED)
  }

  const {bought_from, license_type, purchase_data} = data[0]
  if (license_type == "LIFETIME" || bought_from == "MANUALLY_ADDED") {
    return Response.json(LIFETIME_ACTIVE)
  }

  if (bought_from == "PAYPAL" && purchase_data) {
    const purchaseData: { id: string } = purchase_data as { id: string }
    const subscription = await getUserSubscription(purchaseData.id)
    if (subscription == null) {
      return Response.json(NOT_SUBSCRIBED)
    }
    return Response.json(
      {
        hasLicense: true,
        status: subscription.status
      } as SubscriptionResponse
    )
  } else {
    return Response.json(NOT_SUBSCRIBED)
  }
}