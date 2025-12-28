"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id: string
  product_id: string
  quantity: number
  product?: {
    id: string
    name: string
    price: number
    image_url: string
  }
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        setUser(user)

        const { data, error } = await supabase
          .from("cart_items")
          .select("*, product:products(id, name, price, image_url)")
          .eq("user_id", user.id)

        if (error) throw error
        setCart(data || [])
      } catch (err) {
        console.error("Error fetching cart:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [router])

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from("cart_items").update({ quantity: newQuantity }).eq("id", itemId)

      if (error) throw error

      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    } catch (err) {
      console.error("Error updating cart:", err)
      alert("Failed to update cart")
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

      if (error) throw error

      setCart(cart.filter((item) => item.id !== itemId))
    } catch (err) {
      console.error("Error removing item:", err)
      alert("Failed to remove item")
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
  const shipping = subtotal > 499 ? 0 : 49
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading cart...</div>

  return (
    <main className="bg-background">
      <Navigation />

      <section className="bg-gradient-to-b from-primary/10 to-transparent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{cart.length} items in your cart</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.product?.image_url || "/placeholder.svg"}
                          alt={item.product?.name || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.product?.name || "Product"}</h3>
                        <p className="text-lg font-bold text-primary">₹{item.product?.price || 0}</p>
                      </div>

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

                  <Link href="/checkout" className="w-full">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>

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
