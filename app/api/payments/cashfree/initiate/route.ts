import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const CASHFREE_APP_ID = process.env.NEXT_PUBLIC_CASHFREE_APP_ID // This is safe to have NEXT_PUBLIC_ prefix
const CASHFREE_SECRET = process.env.CASHFREE_SECRET_KEY // This is server-only, NO NEXT_PUBLIC_ prefix

const CASHFREE_MODE = process.env.NEXT_PUBLIC_CASHFREE_MODE || "TEST"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, orderAmount, customerEmail, customerPhone, returnUrl } = body

    const timestamp = Math.floor(Date.now() / 1000)
    const signatureData = `${orderId}${orderAmount}${CASHFREE_APP_ID}${timestamp}`
    const signature = crypto.createHmac("sha256", CASHFREE_SECRET!).update(signatureData).digest("hex")

    const paymentData = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: "INR",
      customer_email: customerEmail,
      customer_phone: customerPhone,
      order_note: "PriyaHerbal Product Order",
      order_meta: {
        return_url: returnUrl,
      },
      payments: {
        upi: {},
        app: ["googlepay"],
        card: {
          enabled: true,
        },
        netbanking: {},
        wallet: {},
        cardless_emi: {},
        bnpl: {},
        paylater: {},
      },
      api_request_id: crypto.randomUUID(),
    }

    const baseUrl =
      CASHFREE_MODE === "PROD" ? "https://api.cashfree.com/pg/orders" : "https://sandbox.cashfree.com/pg/orders"

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_APP_ID!,
        "x-client-secret": CASHFREE_SECRET!, // Secret key only used on server, never exposed to client
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify(paymentData),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Payment initiation error:", error)
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 })
  }
}
