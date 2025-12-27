import { Shield, Leaf, Zap, TrendingUp } from "lucide-react"

export default function TrustBadges() {
  return (
    <section className="bg-white border-y border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Free Shipping */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">Free Shipping</p>
              <p className="text-xs text-muted-foreground">Orders over ₹499</p>
            </div>
          </div>

          {/* Authentic Ingredients */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">100% Authentic</p>
              <p className="text-xs text-muted-foreground">Pure ingredients</p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">Secure Payment</p>
              <p className="text-xs text-muted-foreground">SSL Encrypted</p>
            </div>
          </div>

          {/* 4.8 Rating */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">4.8 / 5 Stars</p>
              <p className="text-xs text-muted-foreground">15K+ Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
