import type {APIEvent} from "@solidjs/start/server";
import {redirect} from "@solidjs/router";

export const URL = "https://xjaqtpgdbcsyxptpcqhy.supabase.co"

export async function GET(event: APIEvent) {
  throw redirect(`${URL}/v1/callback`, event.request)
}