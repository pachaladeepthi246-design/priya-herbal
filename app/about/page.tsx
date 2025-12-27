import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Leaf, Heart, Globe, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-muted-foreground">
              PriyaHerbal was founded on a simple belief: that nature holds the key to true wellness. We're committed to
              bringing authentic Ayurvedic formulations directly to you.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="p-8 bg-primary/5 rounded-xl border border-primary/10">
              <Leaf className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide 100% authentic, premium herbal products that empower individuals to take control of their
                health and wellness through nature's wisdom.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 bg-secondary/5 rounded-xl border border-secondary/10">
              <Globe className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the most trusted herbal wellness brand in India, bringing ancient Ayurvedic knowledge to
                modern wellness seekers worldwide.
              </p>
            </div>

            {/* Values */}
            <div className="p-8 bg-accent/5 rounded-xl border border-accent/10">
              <Heart className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <p className="text-muted-foreground">
                Authenticity, Sustainability, Quality, and Trust. We believe in transparency and putting customer
                wellness first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose PriyaHerbal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">100% Authentic Ingredients</h3>
                <p className="text-muted-foreground">
                  Every product is sourced directly from trusted Ayurvedic experts and herbal farms across India.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">No Harmful Chemicals</h3>
                <p className="text-muted-foreground">
                  Free from parabens, sulfates, and artificial additives. Pure nature, nothing else.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Expert Formulations</h3>
                <p className="text-muted-foreground">
                  Created by Ayurvedic experts with over 20 years of experience in herbal wellness.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Customer Satisfaction</h3>
                <p className="text-muted-foreground">
                  4.8/5 stars from 15,000+ satisfied customers with 30-day money-back guarantee.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Fast & Free Shipping</h3>
                <p className="text-muted-foreground">
                  Free shipping on orders above ₹499. Delivered to your doorstep in 2-3 business days.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Sustainable Practices</h3>
                <p className="text-muted-foreground">
                  Eco-friendly packaging and sustainable sourcing to protect our planet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Wellness Community</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover the PriyaHerbal difference. Your wellness journey starts here.
          </p>
          <Button size="lg">Explore Our Products</Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
