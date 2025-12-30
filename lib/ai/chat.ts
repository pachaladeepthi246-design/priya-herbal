// AI Chatbot System for WhatsApp/Web
import { ollama } from "./config"

export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export async function generateChatResponse(messages: ChatMessage[], context?: string): Promise<string> {
  try {
    const systemPrompt = `You are PriyaHerbal's AI Assistant - a knowledgeable, helpful chatbot for our herbal wellness e-commerce platform.
    
You have expertise in:
- Herbal products and Ayurvedic remedies
- Product recommendations based on customer needs
- Order tracking and customer service
- Health and wellness advice (always disclaiming you're not a doctor)
- Ingredient information and benefits
- Shipping and return policies

Always be helpful, professional, and maintain the brand voice of PriyaHerbal.
${context ? `Additional context: ${context}` : ""}
`

    const conversationText = messages.map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`).join("\n")

    const response = await ollama.generate({
      model: process.env.OLLAMA_MODEL || "mistral",
      prompt: `${systemPrompt}\n\n${conversationText}\n\nASSISTANT:`,
      stream: false,
    })

    return response.response.trim()
  } catch (error) {
    console.error("[v0] Chat generation failed:", error)
    throw error
  }
}

export async function generateStreamChatResponse(messages: ChatMessage[], onChunk: (chunk: string) => void) {
  try {
    const systemPrompt = `You are PriyaHerbal's AI Assistant. Be helpful, professional, and knowledgeable about herbal products and wellness.`

    const conversationText = messages.map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`).join("\n")

    const response = await ollama.generate({
      model: process.env.OLLAMA_MODEL || "mistral",
      prompt: `${systemPrompt}\n\n${conversationText}\n\nASSISTANT:`,
      stream: true,
    })

    // Handle streaming response
    if (response) {
      onChunk(response.response)
    }

    return true
  } catch (error) {
    console.error("[v0] Streaming chat failed:", error)
    throw error
  }
}
