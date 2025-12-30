// Email Service (SMTP-based, self-hosted, unlimited)
import nodemailer from "nodemailer"

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    // SMTP Configuration (can be any SMTP provider - Gmail, SendGrid self-hosted, etc.)
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendOrderConfirmation(email: string, orderData: any): Promise<boolean> {
    try {
      const html = `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <p>Order Number: ${orderData.orderNumber}</p>
        <p>Total: ₹${orderData.total}</p>
        <p>Tracking will be available at: ${process.env.APP_URL}/order-tracking/${orderData.id}</p>
      `

      await this.transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Order Confirmation - ${orderData.orderNumber}`,
        html,
      })

      return true
    } catch (error) {
      console.error("[v0] Email send failed:", error)
      return false
    }
  }

  async sendNewsletterEmail(emails: string[], content: string): Promise<boolean> {
    try {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          ${content}
          <hr>
          <p>
            <a href="${process.env.APP_URL}/unsubscribe">Unsubscribe</a>
          </p>
        </div>
      `

      for (const email of emails) {
        await this.transporter.sendMail({
          from: process.env.FROM_EMAIL,
          to: email,
          subject: "PriyaHerbal Newsletter",
          html,
        })
      }

      return true
    } catch (error) {
      console.error("[v0] Newsletter send failed:", error)
      return false
    }
  }

  async sendCustomEmail(to: string, subject: string, html: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        html,
      })
      return true
    } catch (error) {
      console.error("[v0] Custom email send failed:", error)
      return false
    }
  }
}

export const emailService = new EmailService()
