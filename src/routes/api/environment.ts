export interface Environment {
  API_KEY: string,
  PAYPAL_CLIENT_ID: string,
  PAYPAL_CLIENT_SECRET: string,
  SUPABASE_SERVICE_ROLE: string
}

function environment(): Environment {
  if (import.meta.env.PROD) {
    return {
      API_KEY: process.env.API_KEY!,
      PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID!,
      PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET!,
      SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE!
    }
  } else {
    // noinspection JSUnresolvedReference
    return {
      API_KEY: import.meta.env.VITE_API_KEY,
      PAYPAL_CLIENT_ID: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      PAYPAL_CLIENT_SECRET: import.meta.env.VITE_PAYPAL_CLIENT_SECRET,
      SUPABASE_SERVICE_ROLE: import.meta.env.VITE_SUPABASE_SERVICE_ROLE
    }
  }
}

export const env = environment()