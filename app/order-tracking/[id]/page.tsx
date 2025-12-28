"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

interface TrackingEvent {
  status: string
  timestamp: string
  location?: string
  notes?: string
}

interface OrderTracking {
  order_number: string
  status: string
  total_amount: number
  tracking_events: TrackingEvent[]
}

const statusSteps = ["pending", "confirmed", "processing", "shipped", "in_transit", "out_for_delivery", "delivered"]

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<OrderTracking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const supabase = createClient()

        const { data: orderData } = await supabase
          .from("orders")
          .select("order_number, status, total_amount")
          .eq("id", orderId)
          .single()

        const { data: eventsData } = await supabase
          .from("order_tracking_events")
          .select("*")
          .eq("order_id", orderId)
          .order("timestamp", { ascending: false })

        if (orderData) {
          setOrder({
            order_number: orderData.order_number,
            status: orderData.status,
            total_amount: orderData.total_amount,
            tracking_events: eventsData || [],
          })
        }
      } catch (error) {
        console.error("Error fetching tracking:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTracking()
  }, [orderId])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!order) return <div className="min-h-screen flex items-center justify-center">Order not found</div>

  const currentStatusIndex = statusSteps.indexOf(order.status)

  return (
    <main className="bg-background">
      <Navigation />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground mb-8">Order #{order.order_number}</p>

          {/* Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Delivery Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {statusSteps.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                          index <= currentStatusIndex ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div className={`w-1 h-12 ${index < currentStatusIndex ? "bg-primary" : "bg-muted"}`} />
                      )}
                    </div>
                    <div className="pb-4">
                      <h3 className="font-semibold capitalize">{step.replace(/_/g, " ")}</h3>
                      {index <= currentStatusIndex && (
                        <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          {order.tracking_events.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.tracking_events.map((event, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                      <h4 className="font-semibold capitalize">{event.status.replace(/_/g, " ")}</h4>
                      <p className="text-sm text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</p>
                      {event.location && <p className="text-sm mt-1">{event.location}</p>}
                      {event.notes && <p className="text-sm text-muted-foreground mt-1">{event.notes}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
