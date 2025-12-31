import { Button } from "@/components/ui/button"
import Link from "next/link"
import HeroCarousel from "./hero-carousel"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <HeroCarousel />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="text-white animate-fade-in-up">
            <div className="mb-6">
              <p className="text-secondary font-semibold text-sm tracking-wider uppercase mb-2">
                Ancient Wisdom, Modern Wellness
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-balance">
                Premium Indian Herbal Products
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Discover the power of nature with our authentic Ayurvedic formulations. Crafted with pure, organic
                ingredients for your wellness journey.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  Shop Now
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/20 w-full sm:w-auto bg-white/10 backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
                <p className="text-2xl font-bold">15K+</p>
                <p className="text-white/80">Happy Customers</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
                <p className="text-2xl font-bold">4.8★</p>
                <p className="text-white/80">Average Rating</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-white/80">Natural Ingredients</p>
              </div>
            </div>
          </div>

          {/* Right: Decorative Floating Herbs */}
          <div className="hidden md:flex items-center justify-center relative h-96">
            <div className="absolute w-64 h-64 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
            <div className="animate-float">
              <div className="text-6xl drop-shadow-lg">🌿</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
