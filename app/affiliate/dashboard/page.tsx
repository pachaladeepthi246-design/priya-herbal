"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface AffiliateData {
  affiliate_code: string
  affiliate_url: string
  commission_rate: number
  tier: string
  total_referrals: number
  total_commissions: number
  active: boolean
}

interface CommissionData {
  id: string
  commission_amount: number
  status: string
  created_at: string
  order_amount: number
}

export default function AffiliateDashboard() {
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null)
  const [commissions, setCommissions] = useState<CommissionData[]>([])
  const [stats, setStats] = useState({ total: 0, pending: 0, paid: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        // Fetch affiliate data
        const { data: affiliateData } = await supabase.from("affiliates").select("*").eq("user_id", user.id).single()

        if (affiliateData) {
          setAffiliate(affiliateData)

          // Fetch commissions
          const { data: commissionsData } = await supabase
            .from("commission_transactions")
            .select("*")
            .eq("affiliate_id", affiliateData.id)
            .order("created_at", { ascending: false })

          if (commissionsData) {
            setCommissions(commissionsData)

            // Calculate stats
            const total = commissionsData.reduce((sum: number, c: CommissionData) => sum + c.commission_amount, 0)
            const pending = commissionsData.reduce(
              (sum: number, c: CommissionData) => (c.status === "pending" ? sum + c.commission_amount : sum),
              0,
            )
            const paid = commissionsData.reduce(
              (sum: number, c: CommissionData) => (c.status === "paid" ? sum + c.commission_amount : sum),
              0,
            )
            setStats({ total, pending, paid })
          }
        }
      } catch (error) {
        console.error("Error fetching affiliate data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!affiliate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>
              You're not registered as an affiliate.{" "}
              <Link href="/auth/role-selection" className="text-primary">
                Become an affiliate
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="bg-background">
      <Navigation />

      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Affiliate Dashboard</h1>
          <p className="text-muted-foreground">Manage your referrals and track earnings</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliate.total_referrals}</div>
              <p className="text-xs text-muted-foreground mt-1">Active customers</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.total.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">₹{stats.pending.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Commission Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliate.commission_rate}%</div>
              <p className="text-xs text-muted-foreground mt-1">{affiliate.tier} tier</p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>Share this link to earn commissions on every sale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <input
                type="text"
                value={affiliate.affiliate_url}
                readOnly
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-muted"
              />
              <Button onClick={() => navigator.clipboard.writeText(affiliate.affiliate_url)} variant="outline">
                Copy Link
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Code: <code className="bg-muted px-2 py-1 rounded">{affiliate.affiliate_code}</code>
            </p>
          </CardContent>
        </Card>

        {/* Recent Commissions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Commissions</CardTitle>
            <CardDescription>Your commission history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Order</th>
                    <th className="text-left py-3 px-4 font-medium">Order Amount</th>
                    <th className="text-left py-3 px-4 font-medium">Commission</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {commissions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-muted-foreground">
                        No commissions yet. Share your link to earn!
                      </td>
                    </tr>
                  ) : (
                    commissions.map((commission) => (
                      <tr key={commission.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm">{commission.id.substring(0, 8)}</td>
                        <td className="py-3 px-4 text-sm">₹{commission.order_amount?.toFixed(2) || "N/A"}</td>
                        <td className="py-3 px-4 text-sm font-semibold">₹{commission.commission_amount.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              commission.status === "paid"
                                ? "bg-green-100 text-green-700"
                                : commission.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {commission.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">{new Date(commission.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
