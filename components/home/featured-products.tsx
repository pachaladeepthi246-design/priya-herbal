import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"

// Sample products data (will be fetched from Supabase in next phase)
const featuredProducts = [
  {
    id: 1,
    name: "Premium Neem Hair Oil",
    price: "₹249",
    originalPrice: "₹399",
    rating: 4.7,
    reviews: 234,
    image: "/placeholder.svg?key=c7fgk",
  },
  {
    id: 2,
    name: "Turmeric Face Pack",
    price: "₹199",
    originalPrice: "₹299",
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?key=tcv36",
  },
  {
    id: 3,
    name: "Ashwagandha Powder",
    price: "₹399",
    originalPrice: "₹599",
    rating: 4.8,
    reviews: 312,
    image: "/placeholder.svg?key=dhjls",
  },
  {
    id: 4,
    name: "Tulsi Green Tea",
    price: "₹179",
    originalPrice: "₹259",
    rating: 4.5,
    reviews: 156,
    image: "/placeholder.svg?key=1rx09",
  },
  {
    id: 5,
    name: "Brahmi Hair Oil",
    price: "₹229",
    originalPrice: "₹349",
    rating: 4.7,
    reviews: 198,
    image: "/placeholder.svg?key=r4guf",
  },
  {
    id: 6,
    name: "Hibiscus Face Mask",
    price: "₹249",
    originalPrice: "₹399",
    rating: 4.4,
    reviews: 142,
    image: "/placeholder.svg?key=eijdg",
  },
  {
    id: 7,
    name: "Triphala Powder",
    price: "₹349",
    originalPrice: "₹499",
    rating: 4.9,
    reviews: 276,
    image: "/placeholder.svg?key=ni5h5",
  },
  {
    id: 8,
    name: "Aloe Vera Gel",
    price: "₹199",
    originalPrice: "₹299",
    rating: 4.6,
    reviews: 201,
    image: "/placeholder.svg?key=oaehm",
  },
  {
    id: 9,
    name: "Bhringraj Oil",
    price: "₹269",
    originalPrice: "₹429",
    rating: 4.8,
    reviews: 267,
    image: "/placeholder.svg?key=jp5bd",
  },
  {
    id: 10,
    name: "Sandalwood Face Cream",
    price: "₹499",
    originalPrice: "₹799",
    rating: 4.7,
    reviews: 189,
    image: "/placeholder.svg?key=82ie7",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">Featured Collection</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Our Best-Selling Herbal Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium herbal formulations trusted by thousands. Each product is crafted with pure, organic
            ingredients.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {featuredProducts.map((product, idx) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div
                className="group cursor-pointer h-full animate-fade-in-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="bg-card/50 backdrop-blur-md border border-primary/10 rounded-xl p-4 h-full hover:bg-card/70 hover:border-primary/20 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
                  <div className="relative overflow-hidden rounded-lg bg-muted mb-4 aspect-square">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3 bg-accent/90 backdrop-blur-md text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold border border-accent/50">
                      Save 37%
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      className="w-full mt-3 gap-2 bg-primary/90 hover:bg-primary backdrop-blur-sm border border-primary/20 transition-all duration-300 shadow-md hover:shadow-lg"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <Button
              size="lg"
              className="bg-primary/90 hover:bg-primary backdrop-blur-md border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
