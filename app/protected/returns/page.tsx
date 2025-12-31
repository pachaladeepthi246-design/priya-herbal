"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

interface Return {
  id: string
  order_id: string
  reason: string
  status: string
  created_at: string
}

interface OrderForReturn {
  id: string
  order_number: string
  total_amount: number
  created_at: string
}

export default function Returns() {
  const [orders, setOrders] = useState<OrderForReturn[]>([])
  const [returns, setReturns] = useState<Return[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrderId, setSelectedOrderId] = useState<string>("")
  const [reason, setReason] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: ordersData } = await supabase
        .from("orders")
        .select("id, order_number, total_amount, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      const { data: returnsData } = await supabase
        .from("returns")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setOrders(ordersData || [])
      setReturns(returnsData || [])
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOrderId || !reason.trim()) return

    setSubmitting(true)
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      await supabase.from("returns").insert([
        {
          user_id: user?.id,
          order_id: selectedOrderId,
          reason: reason,
          status: "pending",
        },
      ])

      setSelectedOrderId("")
      setReason("")
      await loadData()
    } catch (error) {
      console.error("Error submitting return:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading returns...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background">
      <Navigation />

      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Returns & Refunds</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* New Return Form */}
          <div className="md:col-span-1">
            <Card className="glass-card sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg">Request Return</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Order</label>
                    <select
                      value={selectedOrderId}
                      onChange={(e) => setSelectedOrderId(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Choose an order...</option>
                      {orders.map((order) => (
                        <option key={order.id} value={order.id}>
                          {order.order_number} - ₹{order.total_amount}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Textarea
                    placeholder="Reason for return..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                  />
                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting ? "Submitting..." : "Request Return"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Returns List */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Returns</h2>
            {returns.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="pt-6 text-center text-muted-foreground">No returns requested yet</CardContent>
              </Card>
            ) : (
              returns.map((ret) => (
                <Card key={ret.id} className="glass-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Return Request</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{ret.reason}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs capitalize ${
                          ret.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : ret.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {ret.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Requested {new Date(ret.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
