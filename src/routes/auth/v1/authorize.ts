import type {APIEvent} from "@solidjs/start/server";
import {redirect} from "@solidjs/router";
import {API_URL} from "~/routes/auth/v1/callback";

export async function GET(event: APIEvent) {
  throw redirect(`${API_URL}/v1/authorize`, event.request)
}