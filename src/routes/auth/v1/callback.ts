import type {APIEvent} from "@solidjs/start/server";
import {redirect} from "@solidjs/router";

export async function GET(event: APIEvent) {
  throw redirect("https://xjaqtpgdbcsyxptpcqhy.supabase.co/auth/v1/callback/", event.request)
}