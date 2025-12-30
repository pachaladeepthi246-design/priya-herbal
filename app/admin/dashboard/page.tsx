"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"

interface AdminStats {
  totalOrders: number
  totalRevenue: number
  totalAffiliates: number
  pendingCommissions: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalAffiliates: 0,
    pendingCommissions: 0,
  })
  const [orders, setOrders] = useState<any[]>([])
  const [affiliates, setAffiliates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
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

        // Check if user is admin
        const { data: userRole } = await supabase
          .from("user_roles")
          .select("*")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .single()

        if (!userRole) {
          router.push("/")
          return
        }

        setIsAdmin(true)

        // Fetch stats
        const { data: ordersData } = await supabase.from("orders").select("*")
        const { data: affiliatesData } = await supabase.from("affiliates").select("*")
        const { data: commissionsData } = await supabase
          .from("commission_transactions")
          .select("*")
          .eq("status", "pending")

        const totalRevenue = (ordersData || []).reduce((sum: number, o: any) => sum + o.total_amount, 0)
        const pendingCommissions = (commissionsData || []).reduce((sum: number, c: any) => sum + c.commission_amount, 0)

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

    checkAdminAccess()
  }, [router])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!isAdmin)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">Access Denied</Card>
      </div>
    )

  return (
    <main className="bg-background">
      <Navigation />

      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-12">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Affiliates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAffiliates}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">₹{stats.pendingCommissions.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 10).map((order: any) => (
                        <tr key={order.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{order.order_number}</td>
                          <td className="py-3 px-4">₹{order.total_amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
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
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Code</th>
                        <th className="text-left py-3 px-4">Referrals</th>
                        <th className="text-left py-3 px-4">Earnings</th>
                        <th className="text-left py-3 px-4">Tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliates.map((affiliate: any) => (
                        <tr key={affiliate.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{affiliate.affiliate_code}</td>
                          <td className="py-3 px-4">{affiliate.total_referrals}</td>
                          <td className="py-3 px-4">₹{affiliate.total_commissions.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className="capitalize text-xs">{affiliate.tier}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Payment management interface coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
