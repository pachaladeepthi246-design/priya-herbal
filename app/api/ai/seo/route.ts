import { generateSEOContent, generateBlogPost } from "@/lib/ai/seo"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { action, ...params } = await request.json()

    let result

    if (action === "generate-seo") {
      result = await generateSEOContent(params.productName, params.description, params.category)
    } else if (action === "generate-blog") {
      result = await generateBlogPost(params.topic, params.keywords)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] SEO API error:", error)
    return NextResponse.json({ error: "Failed to generate SEO content" }, { status: 500 })
  }
}
