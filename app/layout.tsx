import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { DatabaseInit } from "@/components/database-init"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PriyaHerbal - Premium Indian Herbal Products",
  description:
    "Discover authentic, premium herbal products for wellness, beauty, and health. Traditional Ayurvedic formulations delivered to your door.",
  keywords: "herbal products, ayurveda, natural remedies, Indian herbs, wellness",
  authors: [{ name: "PriyaHerbal" }],
  openGraph: {
    title: "PriyaHerbal - Premium Herbal Wellness",
    description: "Authentic Indian herbal products for your wellness journey",
    url: "https://priyaherbal.com",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#356941" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`font-sans antialiased`}>
        <DatabaseInit />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
