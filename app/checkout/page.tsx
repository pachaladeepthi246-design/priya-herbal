"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone, Landmark } from "lucide-react"

export default function CheckoutPage() {
  const [activePaymentMethod, setActivePaymentMethod] = useState("upi")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const cartTotal = 648
  const shippingAddress = "123 Main St, Mumbai, MH 400001"

  const handlePlaceOrder = () => {
    // This will integrate with Cashfree Payment Gateway
    // For now, showing success mock
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <main className="bg-background">
        <Navigation />
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
              <p className="text-muted-foreground mb-2">Order #PH20241227001</p>
              <p className="text-muted-foreground">You'll receive a confirmation email shortly.</p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg mb-8 text-left">
              <h3 className="font-bold mb-4">Next Steps:</h3>
              <ol className="space-y-3 text-sm">
                <li>1. Confirmation email with tracking details</li>
                <li>2. Your order will be processed within 24 hours</li>
                <li>3. You'll receive SMS updates about your shipment</li>
                <li>4. Track your order anytime in your account</li>
              </ol>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="outline">View Order</Button>
              <Button>Continue Shopping</Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
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
              {/* Shipping Address */}
              <div className="p-6 border border-border rounded-lg">
                <h3 className="font-bold text-lg mb-4">Shipping Address</h3>
                <p className="text-muted-foreground mb-4">{shippingAddress}</p>
                <Button variant="outline">Change Address</Button>
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
                    <div>
                      <label className="block text-sm font-medium mb-2">UPI ID</label>
                      <Input placeholder="yourname@upi" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You'll be redirected to your UPI app to complete the payment.
                    </p>
                  </TabsContent>

                  {/* Card */}
                  <TabsContent value="card" className="space-y-4">
                    <CreditCard className="w-12 h-12 text-primary mx-auto" />
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry</label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Net Banking */}
                  <TabsContent value="netbanking" className="space-y-4">
                    <Landmark className="w-12 h-12 text-primary mx-auto" />
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Bank</label>
                      <select className="w-full px-4 py-2 border border-border rounded-lg">
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>SBI</option>
                      </select>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="p-6 border border-border rounded-lg sticky top-20 space-y-4">
                <h3 className="font-bold text-lg">Order Summary</h3>

                <div className="space-y-2 border-b border-border pb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹549</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Free Shipping</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹99</span>
                  </div>
                </div>

                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{cartTotal}</span>
                </div>

                <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                  Place Order & Pay
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
