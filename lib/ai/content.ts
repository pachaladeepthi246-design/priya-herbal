// Content Generation System (Social Media, Marketing)
import { ollama } from "./config"

export async function generateSocialMediaPost(
  topic: string,
  platform: "instagram" | "facebook" | "twitter" | "linkedin",
  tone: "professional" | "casual" | "inspirational" = "casual",
): Promise<string> {
  try {
    const platformLimits = {
      instagram: 2200,
      facebook: 63206,
      twitter: 280,
      linkedin: 3000,
    }

    const prompt = `Generate a ${tone} social media post for ${platform} about a herbal wellness product or topic.
Topic: ${topic}
Platform character limit: ${platformLimits[platform]}
Tone: ${tone}

The post should be engaging, include relevant hashtags for ${platform}, and drive engagement or sales for PriyaHerbal.

Generate the post now (do not exceed character limit):`

    const response = await ollama.generate({
      model: process.env.OLLAMA_MODEL || "mistral",
      prompt,
      stream: false,
    })

    return response.response
  } catch (error) {
    console.error("[v0] Social media post generation failed:", error)
    throw error
  }
}

export async function generateProductDescription(
  productName: string,
  ingredients: string[],
  benefits: string[],
  usage: string,
): Promise<string> {
  try {
    const prompt = `Write an engaging, SEO-optimized e-commerce product description for an herbal product.

Product Name: ${productName}
Main Ingredients: ${ingredients.join(", ")}
Key Benefits: ${benefits.join(", ")}
Usage Instructions: ${usage}

The description should:
- Be 150-300 words
- Highlight key benefits early
- Include natural keyword placement
- Be persuasive and professional
- Mention ingredients and their benefits
- Include usage recommendations
- End with a call-to-action

Write the product description now:`

    const response = await ollama.generate({
      model: process.env.OLLAMA_MODEL || "mistral",
      prompt,
      stream: false,
    })

    return response.response
  } catch (error) {
    console.error("[v0] Product description generation failed:", error)
    throw error
  }
}

export async function generateEmailCampaign(
  campaignType: "welcome" | "followup" | "promotion" | "recovery",
  productName?: string,
  discount?: number,
): Promise<{ subject: string; body: string }> {
  try {
    const prompt = `Generate a marketing email for PriyaHerbal e-commerce platform.

Campaign Type: ${campaignType}
${productName ? `Product: ${productName}` : ""}
${discount ? `Discount: ${discount}%` : ""}

Requirements:
- Professional, engaging tone
- Clear subject line
- HTML-ready format
- Include call-to-action button
- Personalization ready
- Mobile-friendly

Generate the email with Subject and Body sections.`

    const response = await ollama.generate({
      model: process.env.OLLAMA_MODEL || "mistral",
      prompt,
      stream: false,
    })

    const parts = response.response.split(/Subject:|Body:/)
    return {
      subject: parts[1]?.trim() || "PriyaHerbal Update",
      body: parts[2]?.trim() || response.response,
    }
  } catch (error) {
    console.error("[v0] Email campaign generation failed:", error)
    throw error
  }
}
