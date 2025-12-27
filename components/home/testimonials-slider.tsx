"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Mumbai",
    content:
      "The neem hair oil has been a game-changer! My hair fall has reduced significantly and my hair feels so healthy now.",
    rating: 5,
    image: "👩",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Delhi",
    content:
      "Outstanding quality and authentic products. The ashwagandha powder has really helped with my stress levels.",
    rating: 5,
    image: "👨",
  },
  {
    id: 3,
    name: "Sneha Desai",
    role: "Bangalore",
    content: "Been using the turmeric face pack for 3 months. My skin has never looked better. Highly recommended!",
    rating: 5,
    image: "👩",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Hyderabad",
    content: "The best herbal products I have found. Pure ingredients and amazing results. Will keep ordering!",
    rating: 5,
    image: "👨",
  },
]

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoplay])

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">What Customers Say</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative" onMouseEnter={() => setAutoplay(false)} onMouseLeave={() => setAutoplay(true)}>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">{testimonials[activeIndex].image}</div>
              <div>
                <h3 className="font-semibold text-lg">{testimonials[activeIndex].name}</h3>
                <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg text-foreground mb-6 italic">"{testimonials[activeIndex].content}"</p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setAutoplay(false)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-primary w-6" : "bg-muted"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
