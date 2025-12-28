"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface Order {
  id: string
  order_number: string
  total_amount: number
  status: string
  created_at: string
  shipping_address: string
}

interface PaymentTransaction {
  status: string
  gateway: string
  transaction_id: string
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)
  const [payment, setPayment] = useState<PaymentTransaction | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return

      try {
        const supabase = createClient()

        const { data: orderData } = await supabase.from("orders").select("*").eq("id", orderId).single()

        const { data: paymentData } = await supabase
          .from("payment_transactions")
          .select("*")
          .eq("order_id", orderId)
          .single()

        setOrder(orderData)
        setPayment(paymentData)
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">Order not found</Card>
      </div>
    )

  const isSuccessful = payment?.status === "success" || order.status === "paid"

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-6">
          {isSuccessful ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⏳</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Payment Processing</h1>
            </>
          )}

          <p className="text-muted-foreground mb-2">Order #{order.order_number}</p>
          <p className="text-muted-foreground">Total: ₹{order.total_amount.toFixed(2)}</p>
        </div>

        <Card className="p-8 mb-8 text-left">
          <div className="mb-6">
            <h2 className="font-bold mb-4">Order Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span>{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-semibold capitalize">{order.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span>{payment?.gateway?.toUpperCase() || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Address:</span>
                <span>{order.shipping_address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span>{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="font-bold mb-3">Next Steps:</h3>
            <ol className="space-y-2 text-sm text-left">
              <li>1. Confirmation email with tracking details</li>
              <li>2. Your order will be processed within 24 hours</li>
              <li>3. You'll receive SMS updates about your shipment</li>
              <li>4. Track your order anytime in your account</li>
            </ol>
          </div>
        </Card>

        <div className="flex gap-4 justify-center">
          <Link href={`/order-tracking/${orderId}`}>
            <Button>Track Order</Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function OrderConfirmationPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <OrderConfirmationContent />
      </Suspense>
      <Footer />
    </main>
  )
}
