import type {APIEvent} from "@solidjs/start/server";
import {redirect} from "@solidjs/router";

export async function GET(event: APIEvent) {
  throw redirect(`${URL}/v1/authorize`, event.request)
}