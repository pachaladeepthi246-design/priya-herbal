"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0b?w=1200&h=600&fit=crop",
    title: "Premium Neem Hair Oil",
    subtitle: "Natural Hair Care",
    description: "Pure neem oil for healthy hair growth",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b61?w=1200&h=600&fit=crop",
    title: "Turmeric Face Masks",
    subtitle: "Skin Wellness",
    description: "Natural glow with organic turmeric",
    cta: "Explore",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1591047990419-19a5f5d0d4df?w=1200&h=600&fit=crop",
    title: "Ashwagandha Supplements",
    subtitle: "Immunity Boost",
    description: "Stress relief and vitality enhancement",
    cta: "Learn More",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1631939458707-e56c3bbb9da7?w=1200&h=600&fit=crop",
    title: "Brahmi Hair Care",
    subtitle: "Traditional Formula",
    description: "Cooling oil for scalp health",
    cta: "Shop Now",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1597318934903-c4b0a1b4e1e6?w=1200&h=600&fit=crop",
    title: "Tulsi Green Tea",
    subtitle: "Daily Wellness",
    description: "Antioxidant-rich for immune support",
    cta: "Buy Now",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1577720643272-265f434d4a84?w=1200&h=600&fit=crop",
    title: "Sandalwood Skincare",
    subtitle: "Luxury Care",
    description: "Premium moisturizing cream",
    cta: "Discover",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 7000)
  }, [])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)
  }, [currentSlide, goToSlide])

  return (
    <section className="relative h-96 md:h-[600px] overflow-hidden rounded-xl">
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              loading={index <= 1 ? "eager" : "lazy"}
              priority={index === 0}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-start">
              <div className="max-w-2xl text-white px-4 sm:px-6 lg:px-8 animate-fade-in-up">
                <p className="text-secondary font-semibold text-sm tracking-wider uppercase mb-2">{slide.subtitle}</p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 text-balance">{slide.title}</h2>
                <p className="text-base md:text-lg text-white/90 mb-6">{slide.description}</p>
                <button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/70 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
