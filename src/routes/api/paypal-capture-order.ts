import {APIEvent} from "@solidjs/start/server/types";
import getAuthToken from "~/routes/api/auth";
import {BASE_URL} from "~/routes/api/util";
import {OrderCaptureResponse} from "~/routes/api/types";
import {createSupabaseClient} from "~/database/client";
import {env} from "~/routes/api/environment";

async function saveOrder(body: OrderCaptureResponse, userId: string) {
  const supabase = createSupabaseClient(env.SUPABASE_SERVICE_ROLE)
  const response = await supabase.from("licenses").insert(
    {
      id: userId,
      bought_from: "PAYPAL",
      license_type: "LIFETIME",
      purchase_data: {
        id: body.id!
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

interface PaypalCaptureOrder {
  orderId: string,
  userId: string
}

export async function POST(event: APIEvent) {
  const {access_token: accessToken} = await getAuthToken();
  const {orderId, userId}: PaypalCaptureOrder = await event.request.json()

  const response = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Prefer": "return=representation",
      "Accept-Language": "en_US",
    }
  })

  if (response.ok) {
    const order: OrderCaptureResponse = await response.json()

    await saveOrder(order, userId)

    return new Response()
  } else {
    const error = await response.json()
    return Response.json({
      status: response.status,
      error: error.message!
    }, {
      status: response.status,
      statusText: error.message!
    })
  }
}