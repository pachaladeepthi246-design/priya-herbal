import { emailService } from "@/lib/email/service"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json()

    const result = await emailService.sendCustomEmail(to, subject, html)

    return NextResponse.json({ success: result })
  } catch (error) {
    console.error("[v0] Email send error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
