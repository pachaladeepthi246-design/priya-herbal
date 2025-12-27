import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

let supabaseClient: any = null

export async function getSupabaseClient() {
  if (!supabaseClient) {
    const cookieStore = await cookies()

    supabaseClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet: any[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              // Ignore cookie setting errors in Server Components
            }
          },
        },
      },
    )
  }

  return supabaseClient
}

export async function resetSupabaseClient() {
  supabaseClient = null
}
