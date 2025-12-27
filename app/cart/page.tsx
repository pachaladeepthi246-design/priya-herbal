"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Premium Neem Hair Oil",
    price: 249,
    quantity: 1,
    image: "/neem-hair-oil.jpg",
  },
  {
    id: 2,
    name: "Turmeric Face Pack",
    price: 199,
    quantity: 2,
    image: "/turmeric-face-pack.jpg",
  },
]

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 499 ? 0 : 49
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax

  return (
    <main className="bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{cart.length} items in your cart</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-lg font-bold text-primary">₹{item.price}</p>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>

                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/shop" className="inline-block mt-6">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="p-6 border border-border rounded-lg sticky top-20 space-y-4">
                  <h3 className="font-bold text-lg">Order Summary</h3>

                  <div className="space-y-2 border-b border-border pb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {shipping > 0 && (
                      <div className="flex justify-between text-orange-600">
                        <span>Shipping</span>
                        <span>₹{shipping}</span>
                      </div>
                    )}
                    {shipping === 0 && (
                      <div className="flex justify-between text-green-600 text-sm">
                        <span>Free Shipping</span>
                        <span>Applied!</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Tax (5%)</span>
                      <span>₹{tax}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>

                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">Free shipping on orders above ₹499</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Add some herbal products to get started on your wellness journey.
              </p>
              <Link href="/shop">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
