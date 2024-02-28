import {APIEvent} from "@solidjs/start/server/types";
import {BASE_URL} from "~/routes/api/util";
import {OrderCreateRequest, OrderCreateResponse, Purchases, PurchaseType} from "~/routes/api/types";
import getAuthToken from "~/routes/api/auth";

export interface CreateOrderRequestBody {
  purchase: PurchaseType
}

export async function POST(event: APIEvent) {
  const body: CreateOrderRequestBody = await event.request.json()
  const item = Purchases[body.purchase]!

  const createOrderBody: OrderCreateRequest = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: item.price.toString(),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: item.price.toString()
            }
          }
        },
        items: [
          {
            name: item.name,
            unit_amount: {
              currency_code: "USD",
              value: item.price.toString(),
            },
            quantity: "1"
          }
        ]
      }
    ]
  }

  const { access_token: accessToken } = await getAuthToken();

  const response = await fetch(`${BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Prefer": "return=representation",
      "Accept-Language": "en_US",
    },
    body: JSON.stringify(createOrderBody)
  })
  if (response.ok) {
    const order: OrderCreateResponse = await response.json()
    return Response.json({
      orderId: order.id
    })
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