import { Suspense } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HeroSection from "@/components/home/hero-section"
import FeaturedProducts from "@/components/home/featured-products"
import TestimonialsSlider from "@/components/home/testimonials-slider"
import WhatsAppWidget from "@/components/home/whatsapp-widget"
import TrustBadges from "@/components/home/trust-badges"

export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Products */}
      <Suspense fallback={<div className="h-96" />}>
        <FeaturedProducts />
      </Suspense>

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* WhatsApp Widget */}
      <WhatsAppWidget />

      <Footer />
    </main>
  )
}
