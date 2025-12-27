"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProductCard from "@/components/shop/product-card"
import CategoryFilter from "@/components/shop/category-filter"
import { ChevronDown } from "lucide-react"

// Sample products - will be fetched from Supabase
const allProducts = [
  {
    id: 1,
    name: "Premium Neem Hair Oil",
    price: 249,
    originalPrice: 399,
    category: "Hair Care",
    rating: 4.7,
    reviews: 234,
    image: "/placeholder.svg?key=1k3c0",
  },
  {
    id: 2,
    name: "Turmeric Face Pack",
    price: 199,
    originalPrice: 299,
    category: "Skin Care",
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?key=w4lh8",
  },
  {
    id: 3,
    name: "Ashwagandha Powder",
    price: 399,
    originalPrice: 599,
    category: "Immunity",
    rating: 4.8,
    reviews: 312,
    image: "/placeholder.svg?key=mwcem",
  },
  {
    id: 4,
    name: "Tulsi Green Tea",
    price: 179,
    originalPrice: 259,
    category: "Immunity",
    rating: 4.5,
    reviews: 156,
    image: "/placeholder.svg?key=dcyjf",
  },
  {
    id: 5,
    name: "Brahmi Hair Oil",
    price: 229,
    originalPrice: 349,
    category: "Hair Care",
    rating: 4.7,
    reviews: 198,
    image: "/placeholder.svg?key=4nssk",
  },
  {
    id: 6,
    name: "Hibiscus Face Mask",
    price: 249,
    originalPrice: 399,
    category: "Skin Care",
    rating: 4.4,
    reviews: 142,
    image: "/placeholder.svg?key=kmw5x",
  },
  {
    id: 7,
    name: "Triphala Powder",
    price: 349,
    originalPrice: 499,
    category: "Wellness",
    rating: 4.9,
    reviews: 276,
    image: "/placeholder.svg?key=8ttpt",
  },
  {
    id: 8,
    name: "Aloe Vera Gel",
    price: 199,
    originalPrice: 299,
    category: "Skin Care",
    rating: 4.6,
    reviews: 201,
    image: "/placeholder.svg?key=rolqq",
  },
  {
    id: 9,
    name: "Bhringraj Oil",
    price: 269,
    originalPrice: 429,
    category: "Hair Care",
    rating: 4.8,
    reviews: 267,
    image: "/placeholder.svg?key=ajljq",
  },
  {
    id: 10,
    name: "Sandalwood Face Cream",
    price: 499,
    originalPrice: 799,
    category: "Skin Care",
    rating: 4.7,
    reviews: 189,
    image: "/placeholder.svg?key=r3wzp",
  },
  {
    id: 11,
    name: "Moringa Protein Powder",
    price: 599,
    originalPrice: 899,
    category: "Wellness",
    rating: 4.5,
    reviews: 134,
    image: "/placeholder.svg?key=qbtcp",
  },
  {
    id: 12,
    name: "Neem Soap",
    price: 89,
    originalPrice: 149,
    category: "Skin Care",
    rating: 4.6,
    reviews: 223,
    image: "/placeholder.svg?key=cs67m",
  },
]

const categories = ["All", "Hair Care", "Skin Care", "Immunity", "Wellness"]
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rating", value: "rating" },
  { label: "Most Popular", value: "popular" },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [isSortOpen, setIsSortOpen] = useState(false)

  // Filter products
  const filteredProducts =
    selectedCategory === "All" ? allProducts : allProducts.filter((p) => p.category === selectedCategory)

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "popular":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  return (
    <main className="bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Our Collection</h1>
          <p className="text-muted-foreground text-lg">Discover premium herbal products for your wellness</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
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

          {/* Main Content - Products */}
          <div className="flex-1">
            {/* Sort and Filter Bar */}
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold">{sortedProducts.length}</span> products
              </p>

              {/* Sort Dropdown */}
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

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
