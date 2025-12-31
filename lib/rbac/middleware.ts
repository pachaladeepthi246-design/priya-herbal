import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { hasPermission, type UserRole, type Permission } from "./permissions"

export async function checkPermission(request: NextRequest, requiredPermission: Permission) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {}
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    if (!hasPermission(profile.role as UserRole, requiredPermission)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return null
  } catch (error) {
    console.error("Permission check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
