"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsAppWidget() {
  const whatsappNumber = "918500647979"
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20PriyaHerbal,%20I%20would%20like%20to%20place%20an%20order`

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40">
      <Button
        className="rounded-full w-14 h-14 bg-[#25D366]/90 backdrop-blur-md hover:bg-[#25D366] shadow-2xl animate-bounce border border-white/20 transition-all duration-300"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </a>
  )
}
