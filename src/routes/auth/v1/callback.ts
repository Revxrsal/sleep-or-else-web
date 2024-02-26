import type {APIEvent} from "@solidjs/start/server";
import {redirect} from "@solidjs/router";

export const API_URL = "https://xjaqtpgdbcsyxptpcqhy.supabase.co"

export async function GET(event: APIEvent) {
  throw redirect(`${API_URL}/v1/callback`, event.request)
}