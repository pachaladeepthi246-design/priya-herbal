"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface InventoryItem {
  id: string
  product_id: string
  product_name: string
  current_stock: number
  reorder_level: number
  last_updated: string
}

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAdminAndLoadInventory()
  }, [])

  const checkAdminAndLoadInventory = async () => {
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

      const { data } = await supabase.from("inventory").select("*").order("current_stock", { ascending: true })

      setInventory(data || [])
    } catch (error) {
      console.error("Error loading inventory:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading inventory...</p>
        </div>
      </main>
    )
  }

  if (!isAdmin) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <p className="mb-4">You do not have access to inventory management.</p>
            <Button onClick={() => router.push("/")} variant="outline">
              Back to Home
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
        <h1 className="text-4xl font-bold mb-8">Inventory Management</h1>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Product Stock Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Product</th>
                    <th className="text-left py-3 px-4 font-medium">Current Stock</th>
                    <th className="text-left py-3 px-4 font-medium">Reorder Level</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{item.product_name}</td>
                      <td className="py-3 px-4 font-semibold">{item.current_stock}</td>
                      <td className="py-3 px-4">{item.reorder_level}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.current_stock > item.reorder_level
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.current_stock > item.reorder_level ? "In Stock" : "Low Stock"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
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
