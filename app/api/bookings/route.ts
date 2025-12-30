import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email/service"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { date, time, name, email } = await request.json()

    const { data, error } = await supabase
      .from("bookings")
      .insert([{ date, time, name, email, status: "pending" }])
      .select()

    if (error) throw error

    // Send confirmation email
    await emailService.sendCustomEmail(
      email,
      "Booking Confirmation",
      `<h1>Your consultation is booked!</h1><p>Date: ${date}</p><p>Time: ${time}</p>`,
    )

    return NextResponse.json({ success: true, booking: data[0] })
  } catch (error) {
    console.error("[v0] Booking error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data } = await supabase.from("bookings").select("*")
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Bookings fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
