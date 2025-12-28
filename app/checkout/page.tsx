"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone, Landmark } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id: string
  product_id: string
  quantity: number
  product?: { name: string; price: number }
}

export default function CheckoutPage() {
  const [activePaymentMethod, setActivePaymentMethod] = useState("upi")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [shippingAddress, setShippingAddress] = useState("")
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

        const { data } = await supabase
          .from("cart_items")
          .select("*, product:products(name, price)")
          .eq("user_id", user.id)

        setCartItems(data || [])
        setCustomerEmail(user.email || "")
      } catch (err) {
        console.error("Error fetching cart:", err)
      }
    }

    fetchCart()
  }, [router])

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
  const tax = Math.round(cartTotal * 0.05)
  const shipping = cartTotal >= 499 ? 0 : 50
  const totalAmount = cartTotal + tax + shipping

  const handlePlaceOrder = async () => {
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("User not found")

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: `PH${Date.now()}`,
          total_amount: totalAmount,
          status: "pending",
          shipping_address: shippingAddress,
          shipping_city: city,
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.product?.price || 0,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)
      if (itemsError) throw itemsError

      // Initiate Cashfree payment
      const paymentResponse = await fetch("/api/payments/cashfree/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          orderAmount: totalAmount,
          customerEmail,
          customerPhone,
          returnUrl: `${window.location.origin}/order-confirmation?orderId=${order.id}`,
        }),
      })

      const paymentData = await paymentResponse.json()

      if (!paymentResponse.ok) throw new Error(paymentData.error || "Payment initiation failed")

      // Store payment transaction
      await supabase.from("payment_transactions").insert({
        order_id: order.id,
        user_id: user.id,
        gateway: "cashfree",
        transaction_id: paymentData.order_id,
        amount: totalAmount,
        status: "initiated",
        customer_email: customerEmail,
        customer_phone: customerPhone,
      })

      // Redirect to Cashfree payment link
      if (paymentData.payments?.link_url) {
        window.location.href = paymentData.payments.link_url
      } else {
        throw new Error("No payment link received")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed")
      setLoading(false)
    }
  }

  return (
    <main className="bg-background">
      <Navigation />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer Info */}
              <div className="p-6 border border-border rounded-lg">
                <h3 className="font-bold text-lg mb-4">Customer Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="p-6 border border-border rounded-lg">
                <h3 className="font-bold text-lg mb-4">Shipping Address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Input
                      placeholder="Street address"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-6 border border-border rounded-lg">
                <h3 className="font-bold text-lg mb-6">Payment Method</h3>

                <Tabs value={activePaymentMethod} onValueChange={setActivePaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                  </TabsList>

                  {/* UPI */}
                  <TabsContent value="upi" className="space-y-4">
                    <Smartphone className="w-12 h-12 text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground text-center">
                      You'll be redirected to complete payment via UPI
                    </p>
                  </TabsContent>

                  {/* Card */}
                  <TabsContent value="card" className="space-y-4">
                    <CreditCard className="w-12 h-12 text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground text-center">Secure card payment powered by Cashfree</p>
                  </TabsContent>

                  {/* Net Banking */}
                  <TabsContent value="netbanking" className="space-y-4">
                    <Landmark className="w-12 h-12 text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground text-center">All major banks supported</p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="p-6 border border-border rounded-lg sticky top-20 space-y-4">
                <h3 className="font-bold text-lg">Order Summary</h3>

                <div className="max-h-48 overflow-y-auto space-y-2 border-b border-border pb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.product?.name} x {item.quantity}
                      </span>
                      <span>₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-b border-border pb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={loading}>
                  {loading ? "Processing..." : "Place Order & Pay"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Secured by Cashfree Payment Gateway. 100% Safe & Secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
