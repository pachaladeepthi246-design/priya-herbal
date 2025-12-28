import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const CASHFREE_SECRET = process.env.CASHFREE_SECRET_KEY

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const timestamp = request.headers.get("x-webhook-timestamp") || ""
    const signature = request.headers.get("x-webhook-signature") || ""

    // Verify webhook signature
    const signatureData = timestamp + rawBody
    const computedSignature = crypto.createHmac("sha256", CASHFREE_SECRET!).update(signatureData).digest("base64")

    if (computedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const data = JSON.parse(rawBody)
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
      event_type: data.type,
      source: "cashfree",
      data: data,
    })

    // Handle payment success
    if (data.type === "PAYMENT_SUCCESS_WEBHOOK") {
      const { order_id, order_amount, payment_status } = data.data

      // Update payment transaction
      await supabase
        .from("payment_transactions")
        .update({
          status: "success",
          webhook_received: true,
          webhook_data: data,
          updated_at: new Date().toISOString(),
        })
        .eq("transaction_id", order_id)

      // Update order status
      await supabase
        .from("orders")
        .update({
          status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("payment_id", order_id)

      // Log email notification
      await supabase.from("email_logs").insert({
        email_type: "order_confirmation",
        subject: "Order Confirmed - PriyaHerbal",
        sent_at: new Date().toISOString(),
        delivery_status: "pending",
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
