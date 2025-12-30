import { generateChatResponse } from "@/lib/ai/chat"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages, userMessage } = await request.json()

    const response = await generateChatResponse([...messages, { role: "user", content: userMessage }])

    return NextResponse.json({ response })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
