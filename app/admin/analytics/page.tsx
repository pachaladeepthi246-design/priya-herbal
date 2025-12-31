"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export default function Analytics() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    uniqueVisitors: 0,
    affiliateEarnings: 0,
  })
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAdminAndLoadAnalytics()
  }, [])

  const checkAdminAndLoadAnalytics = async () => {
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

      if (userProfile?.role !== "admin") {
        router.push("/")
        return
      }

      setIsAdmin(true)

      const { data: ordersData } = await supabase.from("orders").select("*")
      const { data: affiliateData } = await supabase.from("affiliate_commissions").select("*")

      const totalSales = (ordersData || []).reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0)
      const totalOrders = ordersData?.length || 0
      const avgOrder = totalOrders > 0 ? totalSales / totalOrders : 0
      const affiliateEarnings = (affiliateData || []).reduce(
        (sum: number, a: any) => sum + (a.commission_amount || 0),
        0,
      )

      setStats({
        totalSales,
        totalOrders,
        averageOrderValue: avgOrder,
        conversionRate: 2.5,
        uniqueVisitors: 1240,
        affiliateEarnings,
      })
    } catch (error) {
      console.error("Error loading analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !isAdmin) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading analytics...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background">
      <Navigation />

      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{stats.totalSales.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{stats.averageOrderValue.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.conversionRate}%</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Unique Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.uniqueVisitors}</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Affiliate Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{stats.affiliateEarnings.toFixed(0)}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
