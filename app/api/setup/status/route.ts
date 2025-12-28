import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Check environment variables
    const envVars = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      cashfreeAppId: !!process.env.NEXT_PUBLIC_CASHFREE_APP_ID,
      cashfreeSecret: !!process.env.CASHFREE_SECRET_KEY,
      cashfreeMode: process.env.NEXT_PUBLIC_CASHFREE_MODE || "NOT SET",
    }

    // Check database connection
    const { data: dbCheck, error: dbError } = await supabase.from("products").select("count(*)").limit(1)

    const dbConnected = !dbError

    // Check if products exist
    const { count: productCount, error: countError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })

    return NextResponse.json({
      status: "ready",
      environment: envVars,
      database: {
        connected: dbConnected,
        error: dbError?.message,
        productsCount: productCount || 0,
      },
      ready:
        Object.values(envVars)
          .slice(0, 4)
          .every((v) => v) && dbConnected,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
        ready: false,
      },
      { status: 500 },
    )
  }
}
