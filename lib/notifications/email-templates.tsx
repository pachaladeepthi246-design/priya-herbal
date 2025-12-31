export const emailTemplates = {
  orderConfirmation: (orderNumber: string, total: number) => ({
    subject: `Order Confirmed - #${orderNumber}`,
    html: `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <p><strong>Order #:</strong> ${orderNumber}</p>
      <p><strong>Total:</strong> ₹${total.toFixed(2)}</p>
      <p>Your order will be shipped soon.</p>
    `,
  }),

  orderShipped: (trackingNumber: string) => ({
    subject: "Your Order Has Shipped",
    html: `
      <h1>Order Shipped</h1>
      <p>Your order is on its way!</p>
      <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
      <p>Track your delivery on our platform.</p>
    `,
  }),

  affiliateCommissionApproved: (amount: number) => ({
    subject: "Commission Approved",
    html: `
      <h1>Commission Approved</h1>
      <p>Your commission of ₹${amount.toFixed(2)} has been approved!</p>
      <p>It will be paid to your account within 5-7 business days.</p>
    `,
  }),

  welcomeEmail: (name: string) => ({
    subject: "Welcome to PriyaHerbal",
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Thank you for joining PriyaHerbal.</p>
      <p>Explore our premium herbal products and wellness solutions.</p>
    `,
  }),

  passwordReset: (resetLink: string) => ({
    subject: "Reset Your Password",
    html: `
      <h1>Password Reset</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `,
  }),

  supportTicketReceived: (ticketNumber: string) => ({
    subject: `Support Ticket #${ticketNumber} Received`,
    html: `
      <h1>Support Ticket Received</h1>
      <p>We have received your support request.</p>
      <p><strong>Ticket #:</strong> ${ticketNumber}</p>
      <p>Our team will respond within 24 hours.</p>
    `,
  }),
}
