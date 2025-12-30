import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")
  const error_description = searchParams.get("error_description")

  if (error) {
    console.error("OAuth error:", error, error_description)
    return NextResponse.redirect(
      `${request.nextUrl.origin}/auth/login?error=${encodeURIComponent(error_description || error)}`,
    )
  }

  if (!code) {
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/login?error=No code provided`)
  }

  try {
    const supabase = await createClient()

    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error("Exchange error:", exchangeError)
      return NextResponse.redirect(
        `${request.nextUrl.origin}/auth/login?error=${encodeURIComponent(exchangeError.message)}`,
      )
    }

    if (!data.user) {
      return NextResponse.redirect(`${request.nextUrl.origin}/auth/login?error=No user data`)
    }

    const { error: profileError } = await supabase.from("user_profiles").upsert(
      {
        id: data.user.id,
        email: data.user.email || "",
        full_name: data.user.user_metadata?.full_name || "",
        email_verified: true,
        role: "customer",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    )

    if (profileError) {
      console.error("Profile creation error:", profileError)
      // Continue anyway - user is authenticated
    }

    const { data: existingProfile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", data.user.id)
      .single()

    if (existingProfile?.role === "customer") {
      // Check if they need to select a role
      return NextResponse.redirect(`${request.nextUrl.origin}/auth/role-selection`)
    }

    return NextResponse.redirect(`${request.nextUrl.origin}/protected/account`)
  } catch (err) {
    console.error("Callback error:", err)
    return NextResponse.redirect(
      `${request.nextUrl.origin}/auth/login?error=${encodeURIComponent(err instanceof Error ? err.message : "Unknown error")}`,
    )
  }
}
