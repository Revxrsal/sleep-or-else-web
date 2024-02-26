import type {APIEvent} from "@solidjs/start/server";

export async function GET(event: APIEvent) {
  return await fetch("https://xjaqtpgdbcsyxptpcqhy.supabase.co/auth/v1/callback", event.request)
}