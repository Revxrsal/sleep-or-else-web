import {paths} from "@paypal/paypal-js/types/apis/openapi/checkout_orders_v2";

export type OrderCreateRequest = paths["/v2/checkout/orders"]["post"]["requestBody"]["content"]["application/json"]
export type OrderCreateResponse = paths["/v2/checkout/orders"]["post"]["responses"]["200"]["content"]["application/json"]

export type PurchaseType = "Lifetime"

export interface Purchase {
  type: PurchaseType,
  name: string,
  price: number
}

export const LifetimePurchase: Purchase = {
  type: "Lifetime",
  name: "Lifetime license",
  price: 29.99
}

export const Purchases: Record<PurchaseType, Purchase> = {
  "Lifetime": LifetimePurchase
}
