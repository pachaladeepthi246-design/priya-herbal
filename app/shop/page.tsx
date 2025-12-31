"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProductCard from "@/components/shop/product-card"
import CategoryFilter from "@/components/shop/category-filter"
import { ChevronDown } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const categories = ["All", "Hair Care", "Skin Care", "Immunity", "Wellness"]
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rating", value: "rating" },
  { label: "Most Popular", value: "popular" },
]

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false })

        if (error) throw error
        setAllProducts(data || [])
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = allProducts.filter((p) => selectedCategory === "All" || p.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      case "popular":
        return (b.reviews_count || 0) - (a.reviews_count || 0)
      default:
        return 0
    }
  })

  return (
    <main className="bg-background">
      <Navigation />

      <section className="bg-gradient-to-b from-primary/10 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Our Collection</h1>
          <p className="text-muted-foreground text-lg">Discover {sortedProducts.length} premium herbal products</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-48 flex-shrink-0">
            <div className="sticky top-20">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold">{sortedProducts.length}</span> products
              </p>

              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-muted transition"
                >
                  Sort by
                  <ChevronDown className={`w-4 h-4 transition ${isSortOpen ? "rotate-180" : ""}`} />
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-10 min-w-48">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value)
                          setIsSortOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-muted transition ${
                          sortBy === option.value ? "bg-primary/10 text-primary font-semibold" : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading products...</p>
              ) : sortedProducts.length > 0 ? (
                sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)
              ) : (
                <p className="text-muted-foreground">No products found</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
