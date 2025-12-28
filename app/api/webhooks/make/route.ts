import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

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

    // Log webhook event
    await supabase.from("webhook_events").insert({
      event_type: data.event_type,
      source: "make_webhook",
      data: data,
    })

    // Handle different webhook event types
    switch (data.event_type) {
      case "order_status_update": {
        const { order_id, new_status, tracking_number } = data

        await supabase
          .from("orders")
          .update({
            status: new_status,
            updated_at: new Date().toISOString(),
          })
          .eq("id", order_id)

        if (tracking_number) {
          await supabase.from("order_tracking_events").insert({
            order_id,
            status: new_status,
            tracking_number,
            notes: `Status updated to ${new_status}`,
          })
        }
        break
      }

      case "commission_payout": {
        const { affiliate_id, amount } = data

        await supabase
          .from("commission_transactions")
          .update({
            status: "paid",
            payout_date: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("affiliate_id", affiliate_id)
          .eq("status", "pending")
        break
      }

      case "inventory_update": {
        const { product_id, quantity } = data

        await supabase.from("products").update({ quantity_available: quantity }).eq("id", product_id)
        break
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
