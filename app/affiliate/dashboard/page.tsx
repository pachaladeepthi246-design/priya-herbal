"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"

interface AffiliateData {
  id: string
  referral_code: string
  referral_link: string
  commission_rate: number
  tier: string
  total_referrals: number
  total_sales: number
  total_commission: number
  withdrawn_amount: number
  available_balance: number
}

interface CommissionData {
  id: string
  commission_amount: number
  status: string
  created_at: string
  order_id: string
  commission_type: string
}

export default function AffiliateDashboard() {
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null)
  const [commissions, setCommissions] = useState<CommissionData[]>([])
  const [stats, setStats] = useState({ total: 0, pending: 0, paid: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchAffiliateData()
  }, [])

  const fetchAffiliateData = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: affiliateData } = await supabase.from("affiliates").select("*").eq("user_id", user.id).single()

      if (!affiliateData) {
        router.push("/auth/role-selection")
        return
      }

      setAffiliate(affiliateData)

      const { data: commissionsData } = await supabase
        .from("affiliate_commissions")
        .select("*")
        .eq("affiliate_id", affiliateData.id)
        .order("created_at", { ascending: false })

      if (commissionsData) {
        setCommissions(commissionsData)

        // Calculate stats
        const total = commissionsData.reduce((sum: number, c) => sum + (c.commission_amount || 0), 0)
        const pending = commissionsData
          .filter((c) => c.status === "pending")
          .reduce((sum: number, c) => sum + (c.commission_amount || 0), 0)
        const paid = commissionsData
          .filter((c) => c.status === "paid")
          .reduce((sum: number, c) => sum + (c.commission_amount || 0), 0)

        setStats({ total, pending, paid })
      }
    } catch (error) {
      console.error("Error fetching affiliate data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = () => {
    if (affiliate?.referral_link) {
      navigator.clipboard.writeText(affiliate.referral_link)
      alert("Referral link copied to clipboard!")
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

  if (!affiliate) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <p className="mb-4">You're not registered as an affiliate.</p>
            <Button asChild>
              <Link href="/auth/role-selection">Become an Affiliate</Link>
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
          <h1 className="text-4xl font-bold mb-2">Affiliate Dashboard</h1>
          <p className="text-muted-foreground">Track your referrals, sales, and earnings</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{affiliate.total_referrals}</div>
              <p className="text-xs text-muted-foreground mt-1">Active customers</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{affiliate.total_sales.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-1">Total value</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">₹{stats.total.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-1">All commissions</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{affiliate.available_balance.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-1">{affiliate.tier} tier</p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>Share this link to start earning commissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input type="text" value={affiliate.referral_link} readOnly className="flex-1 font-mono text-sm" />
              <Button onClick={handleCopyLink} variant="outline">
                Copy Link
              </Button>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">
                Referral Code: <code>{affiliate.referral_code}</code>
              </p>
              <p className="text-sm text-muted-foreground mt-1">Commission Rate: {affiliate.commission_rate}%</p>
            </div>
          </CardContent>
        </Card>

        {/* Commission Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">₹{stats.pending.toFixed(0)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Paid Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{stats.paid.toFixed(0)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Withdrawn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{affiliate.withdrawn_amount.toFixed(0)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Commissions */}
        <Card>
          <CardHeader>
            <CardTitle>Commission History</CardTitle>
            <CardDescription>Your recent commission transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {commissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No commissions yet. Share your referral link to start earning!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium">Commission</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.map((commission) => (
                      <tr key={commission.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-mono text-xs">{commission.order_id.substring(0, 8)}</td>
                        <td className="py-3 px-4 font-semibold">₹{commission.commission_amount.toFixed(2)}</td>
                        <td className="py-3 px-4 capitalize text-xs">{commission.commission_type}</td>
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
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(commission.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
