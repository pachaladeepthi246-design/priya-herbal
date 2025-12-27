"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    rating: number
    reviews: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const discountPercent = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-xl bg-muted mb-4 aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition duration-300"
          />

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
              -{discountPercent}%
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
          >
            <Heart className={`w-5 h-5 transition ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </button>

          {/* Hover: Add to Cart */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <Button className="gap-2" onClick={(e) => e.preventDefault()}>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-lg font-bold text-primary">₹{product.price}</span>
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
