// WhatsApp Automation Client (Open-Source - using WhatsApp Web API)
import axios from "axios"

export interface WhatsAppMessage {
  phone: string
  message: string
  mediaUrl?: string
}

export class WhatsAppClient {
  private apiUrl: string
  private apiKey: string

  constructor() {
    this.apiUrl = process.env.WHATSAPP_API_URL || "http://localhost:9000"
    this.apiKey = process.env.WHATSAPP_API_KEY || ""
  }

  async sendMessage(recipient: string, text: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.apiUrl}/send-message`, {
        phoneNumber: recipient,
        message: text,
      })

      return response.status === 200
    } catch (error) {
      console.error("[v0] WhatsApp send failed:", error)
      return false
    }
  }

  async sendMediaMessage(recipient: string, mediaUrl: string, caption?: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.apiUrl}/send-media`, {
        phoneNumber: recipient,
        mediaUrl,
        caption,
      })

      return response.status === 200
    } catch (error) {
      console.error("[v0] WhatsApp media send failed:", error)
      return false
    }
  }

  async broadcastMessage(recipients: string[], message: string): Promise<boolean> {
    try {
      const promises = recipients.map((phone) => this.sendMessage(phone, message))
      await Promise.all(promises)
      return true
    } catch (error) {
      console.error("[v0] WhatsApp broadcast failed:", error)
      return false
    }
  }

  async getStatus(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.apiUrl}/status`)
      return response.status === 200
    } catch {
      return false
    }
  }
}

export const whatsappClient = new WhatsAppClient()
