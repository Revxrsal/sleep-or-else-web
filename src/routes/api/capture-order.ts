import {APIEvent} from "@solidjs/start/server/types";
import getAuthToken from "~/routes/api/auth";
import {BASE_URL} from "~/routes/api/util";

export async function POST(event: APIEvent) {
  const {access_token: accessToken} = await getAuthToken();
  const {orderId}: { orderId: string } = await event.request.json()

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
    const order = await response.json()
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