"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface AdminStats {
  totalOrders: number
  totalRevenue: number
  totalAffiliates: number
  pendingCommissions: number
}

interface OrderData {
  id: string
  order_number: string
  total_amount: number
  delivery_status: string
  payment_status: string
  created_at: string
  customer_email: string
}

interface AffiliateData {
  id: string
  user_id: string
  referral_code: string
  tier: string
  total_referrals: number
  total_commission: number
  commission_rate: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalAffiliates: 0,
    pendingCommissions: 0,
  })
  const [orders, setOrders] = useState<OrderData[]>([])
  const [affiliates, setAffiliates] = useState<AffiliateData[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

      if (!userProfile || userProfile.role !== "admin") {
        router.push("/")
        return
      }

      setIsAdmin(true)

      const { data: ordersData } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

      const { data: affiliatesData } = await supabase.from("affiliates").select("*")

      const { data: commissionsData } = await supabase.from("affiliate_commissions").select("*").eq("status", "pending")

      const totalRevenue = (ordersData || []).reduce((sum: number, o) => sum + (o.total_amount || 0), 0)
      const pendingCommissions = (commissionsData || []).reduce((sum: number, c) => sum + (c.commission_amount || 0), 0)

      setStats({
        totalOrders: ordersData?.length || 0,
        totalRevenue,
        totalAffiliates: affiliatesData?.length || 0,
        pendingCommissions,
      })

      setOrders(ordersData || [])
      setAffiliates(affiliatesData || [])
    } catch (error) {
      console.error("Admin access error:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </main>
    )
  }

  if (!isAdmin) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <p className="mb-4">You do not have admin access.</p>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="bg-background">
      <Navigation />

      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage orders, affiliates, and platform analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{stats.totalRevenue.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-1">Combined sales</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Affiliates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalAffiliates}</div>
              <p className="text-xs text-muted-foreground mt-1">Partners</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">₹{stats.pendingCommissions.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-1">To be approved</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="affiliates">Affiliate Partners</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium">Customer</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 10).map((order) => (
                        <tr key={order.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-mono text-xs">{order.order_number}</td>
                          <td className="py-3 px-4">{order.customer_email}</td>
                          <td className="py-3 px-4 font-semibold">₹{order.total_amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs capitalize ${
                                order.delivery_status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.delivery_status === "shipped"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.delivery_status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="affiliates">
            <Card>
              <CardHeader>
                <CardTitle>Affiliate Partners</CardTitle>
                <CardDescription>Active affiliate programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Code</th>
                        <th className="text-left py-3 px-4 font-medium">Tier</th>
                        <th className="text-left py-3 px-4 font-medium">Referrals</th>
                        <th className="text-left py-3 px-4 font-medium">Total Commission</th>
                        <th className="text-left py-3 px-4 font-medium">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliates.map((affiliate) => (
                        <tr key={affiliate.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-mono">{affiliate.referral_code}</td>
                          <td className="py-3 px-4 capitalize">{affiliate.tier}</td>
                          <td className="py-3 px-4">{affiliate.total_referrals}</td>
                          <td className="py-3 px-4 font-semibold">₹{affiliate.total_commission.toFixed(2)}</td>
                          <td className="py-3 px-4">{affiliate.commission_rate}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commissions">
            <Card>
              <CardHeader>
                <CardTitle>Commission Management</CardTitle>
                <CardDescription>Approve and manage affiliate commissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    {stats.pendingCommissions > 0
                      ? `${stats.pendingCommissions} pending commissions for approval`
                      : "All commissions are processed"}
                  </p>
                  <Button disabled={stats.pendingCommissions === 0}>
                    {stats.pendingCommissions > 0 ? "Approve All" : "No Pending"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
