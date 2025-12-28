"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import ImageCarousel from "@/components/product/image-carousel"
import VariantSelector from "@/components/product/variant-selector"
import ReviewsSection from "@/components/product/reviews-section"
import RelatedProducts from "@/components/product/related-products"
import { createClient } from "@/lib/supabase/client"

// Sample product data
const productData = {
  id: 1,
  name: "Premium Neem Hair Oil",
  price: 249,
  originalPrice: 399,
  rating: 4.7,
  reviewCount: 234,
  description: "Pure neem oil infused with coconut oil for healthy hair growth and nourishment.",
  longDescription: `Experience the power of nature with our Premium Neem Hair Oil, a time-tested Ayurvedic formula that combines pure neem extract with coconut oil. This potent blend is specifically formulated to prevent hair fall, promote hair growth, and improve overall hair health.

Our neem oil is 100% organic and contains no harmful chemicals or additives. It's suitable for all hair types and can be used as a regular scalp treatment or hot oil massage.

Benefits:
- Reduces hair fall by up to 80%
- Promotes natural hair growth
- Prevents dandruff and scalp infections
- Strengthens hair roots
- Adds shine and smoothness
- Improves overall scalp health

How to use:
Apply 2-3 teaspoons of oil to your scalp and massage gently for 5-10 minutes. Leave it on for at least 30 minutes (or overnight for best results) and wash with mild shampoo.`,
  category: "Hair Care",
  inStock: true,
  quantity: 250,
  images: ["/neem-hair-oil-bottle-premium.jpg", "/neem-oil-natural-herbal.jpg", "/neem-oil-packaging.jpg"],
  variants: [
    { id: 1, name: "100ml", price: 249 },
    { id: 2, name: "200ml", price: 399 },
    { id: 3, name: "500ml", price: 799 },
  ],
  keyIngredients: ["Neem Extract", "Coconut Oil", "Sesame Oil", "Brahmi Extract"],
  reviews: [
    {
      id: 1,
      author: "Priya",
      rating: 5,
      title: "Best hair oil!",
      content: "My hair fall has reduced drastically. Highly recommended!",
      helpful: 234,
    },
    {
      id: 2,
      author: "Rajesh",
      rating: 4,
      title: "Good quality",
      content: "Good product, great results after 2 months of use.",
      helpful: 156,
    },
  ],
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(productData.variants[0])
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [isAdding, setIsAdding] = useState(false)
  const router = useRouter()

  const discountPercent = Math.round((1 - productData.price / productData.originalPrice) * 100)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { error } = await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: productData.id.toString(),
        quantity,
      })

      if (error) throw error

      alert(`Added ${quantity} item(s) to cart!`)
      router.refresh()
    } catch (err) {
      console.error("Error adding to cart:", err)
      alert("Failed to add to cart")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <main className="bg-background">
      <Navigation />

      {/* Product Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Image Carousel */}
            <div>
              <ImageCarousel images={productData.images} />
            </div>

            {/* Right: Product Info & Purchase */}
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
                      {productData.category}
                    </p>
                    <h1 className="text-4xl font-bold text-foreground">{productData.name}</h1>
                  </div>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 hover:bg-muted rounded-lg transition"
                  >
                    <Heart
                      className={`w-6 h-6 transition ${
                        isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(productData.rating) ? "fill-secondary text-secondary" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{productData.rating}</span>
                  <span className="text-muted-foreground">({productData.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 p-4 bg-primary/5 rounded-lg">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-3xl font-bold text-primary">₹{selectedVariant.price}</span>
                  <span className="text-xl text-muted-foreground line-through">₹{productData.originalPrice}</span>
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Save {discountPercent}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
              </div>

              {/* Stock Status */}
              {productData.inStock ? (
                <p className="text-green-600 font-semibold mb-6">In Stock • {productData.quantity} available</p>
              ) : (
                <p className="text-red-600 font-semibold mb-6">Out of Stock</p>
              )}

              {/* Variant Selector */}
              <VariantSelector
                variants={productData.variants}
                selectedVariant={selectedVariant}
                onChange={setSelectedVariant}
              />

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block font-semibold mb-3">Quantity</label>
                <div className="flex items-center border border-border rounded-lg w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-muted">
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted">
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-8">
                <Button className="flex-1 gap-2" size="lg" onClick={handleAddToCart} disabled={isAdding}>
                  <ShoppingCart className="w-5 h-5" />
                  {isAdding ? "Adding..." : "Add to Cart"}
                </Button>
                <Button variant="outline" size="lg" className="w-12 bg-transparent">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 border-t border-border pt-6">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm">Free shipping on orders above ₹499</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span className="text-sm">30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm">Secure checkout & payments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16 border-t border-border pt-12">
            <div className="flex gap-8 mb-8 border-b border-border overflow-x-auto">
              {["description", "ingredients", "reviews", "faq"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold capitalize transition whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "description" && (
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground whitespace-pre-wrap">{productData.longDescription}</p>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div>
                <h3 className="font-semibold mb-4">Key Ingredients</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {productData.keyIngredients.map((ingredient) => (
                    <div key={ingredient} className="p-4 bg-muted rounded-lg text-center">
                      <p className="font-medium">{ingredient}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && <ReviewsSection reviews={productData.reviews} rating={productData.rating} />}

            {activeTab === "faq" && (
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-2">How long does one bottle last?</p>
                  <p className="text-muted-foreground">One 100ml bottle typically lasts 2-3 months with regular use.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts category={productData.category} />

      <Footer />
    </main>
  )
}
