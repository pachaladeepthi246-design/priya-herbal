"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
  images: string[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl bg-muted aspect-square group">
        <Image src={images[activeIndex] || "/placeholder.svg"} alt="Product image" fill className="object-cover" />

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative overflow-hidden rounded-lg aspect-square w-20 h-20 border-2 transition ${
              activeIndex === index ? "border-primary" : "border-border"
            }`}
          >
            <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
