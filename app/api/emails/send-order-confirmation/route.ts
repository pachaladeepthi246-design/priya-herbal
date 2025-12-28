import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

interface EmailPayload {
  to: string
  order_id: string
  order_number: string
  total_amount: number
}

export async function POST(request: NextRequest) {
  try {
    const { to, order_id, order_number, total_amount } = (await request.json()) as EmailPayload

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

    // Log email in database
    await supabase.from("email_logs").insert({
      email: to,
      email_type: "order_confirmation",
      subject: `Order Confirmed - ${order_number}`,
      template_data: {
        order_id,
        order_number,
        total_amount,
      },
      sent_at: new Date().toISOString(),
      delivery_status: "pending",
    })

    // In production, integrate with SendGrid, Mailgun, or AWS SES
    // Example with SendGrid:
    /*
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to,
      from: process.env.FROM_EMAIL,
      subject: `Order Confirmed - ${order_number}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order #${order_number}</p>
        <p>Total: ₹${total_amount}</p>
        <a href="${process.env.DOMAIN}/order-tracking/${order_id}">Track Order</a>
      `,
    };

    await sgMail.send(msg);
    */

    return NextResponse.json({ success: true, message: "Email queued for sending" })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
