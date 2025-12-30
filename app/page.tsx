import { Suspense } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HeroSection from "@/components/home/hero-section"
import FeaturedProducts from "@/components/home/featured-products"
import TestimonialsSlider from "@/components/home/testimonials-slider"
import WhatsAppWidget from "@/components/home/whatsapp-widget"
import TrustBadges from "@/components/home/trust-badges"
import AIRecommendations from "@/components/ai/ai-recommendations"
import ChatWidget from "@/components/ai/chat-widget"
import { herbalProducts } from "@/lib/data/herbal-products"

export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Badges */}
      <TrustBadges />

      {/* AI-Powered Recommendations */}
      <Suspense fallback={<div className="h-96" />}>
        <AIRecommendations
          allProducts={herbalProducts}
          title="AI-Powered Recommendations Just For You"
          limit={8}
        />
      </Suspense>

      {/* Featured Products */}
      <Suspense fallback={<div className="h-96" />}>
        <FeaturedProducts />
      </Suspense>

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* WhatsApp Widget */}
      <WhatsAppWidget />

      {/* AI Chat Assistant */}
      <ChatWidget />

      <Footer />
    </main>
  )
}
