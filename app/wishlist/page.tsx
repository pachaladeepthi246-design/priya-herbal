"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"

interface WishlistItem {
  id: string
  product_id: string
  created_at: string
  product?: any
}

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        router.push("/auth/login")
        return
      }

      setUser(authUser)

      const { data } = await supabase
        .from("wishlist_items")
        .select("*, product:products(*)")
        .eq("user_id", authUser.id)
        .order("created_at", { ascending: false })

      setItems(data || [])
    } catch (error) {
      console.error("Error loading wishlist:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (itemId: string) => {
    try {
      const supabase = createClient()
      await supabase.from("wishlist_items").delete().eq("id", itemId)
      setItems(items.filter((item) => item.id !== itemId))
    } catch (error) {
      console.error("Error removing from wishlist:", error)
    }
  }

  if (loading) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading wishlist...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background">
      <Navigation />

      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

        {items.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="pt-12 text-center">
              <p className="text-muted-foreground mb-6">Your wishlist is empty</p>
              <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="glass-card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-muted">
                  {item.product?.image_url && (
                    <Image
                      src={item.product.image_url || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-base line-clamp-2">{item.product?.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-2xl font-bold text-primary">₹{item.product?.price}</p>
                  <div className="flex gap-2">
                    <Button asChild variant="default" className="flex-1">
                      <Link href={`/product/${item.product?.slug}`}>View</Link>
                    </Button>
                    <Button variant="outline" onClick={() => removeFromWishlist(item.id)} className="flex-1">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
