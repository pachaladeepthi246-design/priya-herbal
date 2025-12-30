// AI-Powered SEO Generation System
import { ollama } from "./config"

export interface SEOContent {
  title: string
  description: string
  keywords: string[]
  schema: Record<string, any>
  slug: string
}

export async function generateSEOContent(
  productName: string,
  productDescription: string,
  category: string,
): Promise<SEOContent> {
  try {
    const prompt = `Generate SEO-optimized content for an e-commerce product listing.

Product Name: ${productName}
Category: ${category}
Description: ${productDescription}

Please provide:
1. SEO Title (60-70 characters)
2. Meta Description (150-160 characters)
3. 5-7 relevant keywords
4. JSON-LD schema for product

Format your response as JSON with keys: title, description, keywords, schema, slug`

    const response = await ollama.generate({
      model: process.env.OLLAMA_MODEL || "mistral",
      prompt,
      stream: false,
    })

    try {
      const parsed = JSON.parse(response.response)
      return {
        title: parsed.title || productName,
        description: parsed.description || productDescription,
        keywords: parsed.keywords || [],
        schema: parsed.schema || {},
        slug: parsed.slug || productName.toLowerCase().replace(/\s+/g, "-"),
      }
    } catch {
      // Fallback if JSON parsing fails
      return {
        title: productName,
        description: productDescription,
        keywords: [productName, category, "herbal"],
        schema: {},
        slug: productName.toLowerCase().replace(/\s+/g, "-"),
      }
    }
  } catch (error) {
    console.error("[v0] SEO generation failed:", error)
    throw error
  }
}

export async function generateBlogPost(topic: string, keywords: string[]): Promise<string> {
  try {
    const prompt = `Write a 1000+ word SEO-optimized blog post for PriyaHerbal's herbal wellness blog.

Topic: ${topic}
Target Keywords: ${keywords.join(", ")}

Requirements:
- Professional, informative tone
- Include heading structure (H1, H2, H3)
- Natural keyword placement
- Include a call-to-action
- Format with proper HTML tags
- Include product recommendations from PriyaHerbal where relevant

Write the blog post now:`

    const response = await ollama.generate({
      model: process.env.OLLAMA_MODEL || "mistral",
      prompt,
      stream: false,
    })

    return response.response
  } catch (error) {
    console.error("[v0] Blog generation failed:", error)
    throw error
  }
}
