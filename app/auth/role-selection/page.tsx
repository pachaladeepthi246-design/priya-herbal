"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const roles = [
  {
    id: "customer",
    title: "Customer",
    description: "Shop for herbal products and wellness items",
    icon: "🛒",
  },
  {
    id: "affiliate",
    title: "Affiliate Partner",
    description: "Earn commissions by referring others",
    icon: "💰",
  },
  {
    id: "agent",
    title: "Sales Agent",
    description: "Manage sales and customer relationships",
    icon: "📊",
  },
]

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRoleSelection = async () => {
    if (!selectedRole) return

    setLoading(true)
    try {
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) throw new Error("User not found")

      // Create user role record
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: user.id,
        role: selectedRole,
        is_verified: false,
        email_verified: false,
      })

      if (roleError) throw roleError

      // If affiliate is selected, create affiliate record
      if (selectedRole === "affiliate") {
        const affiliateCode = `PRIYA${user.id.substring(0, 8).toUpperCase()}`
        const { error: affiliateError } = await supabase.from("affiliates").insert({
          user_id: user.id,
          affiliate_code: affiliateCode,
          affiliate_url: `${window.location.origin}/ref/${affiliateCode}`,
          commission_rate: 10.0,
          tier: "silver",
        })

        if (affiliateError) throw affiliateError
      }

      router.push("/protected/account")
    } catch (error) {
      console.error("Role selection error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                PH
              </div>
              <span className="font-bold text-2xl">PriyaHerbal</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-4">Choose Your Role</h1>
          <p className="text-muted-foreground">Select how you'd like to use PriyaHerbal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedRole === role.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="text-4xl mb-3">{role.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </button>
          ))}
        </div>

        <Button onClick={handleRoleSelection} disabled={!selectedRole || loading} className="w-full" size="lg">
          {loading ? "Setting Up Your Account..." : "Continue"}
        </Button>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          You can change your role later in account settings
        </p>
      </div>
    </div>
  )
}
