import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <main className="bg-background">
      <Navigation />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground mb-8">Welcome back, {user.email}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile */}
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-bold mb-4">Profile Information</h3>
              <p className="text-muted-foreground mb-4">Email: {user.email}</p>
              <Button variant="outline">Edit Profile</Button>
            </div>

            {/* Orders */}
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-bold mb-4">My Orders</h3>
              <p className="text-muted-foreground mb-4">View and track your orders</p>
              <Button variant="outline">View Orders</Button>
            </div>

            {/* Wishlist */}
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-bold mb-4">Wishlist</h3>
              <p className="text-muted-foreground mb-4">Your saved items</p>
              <Button variant="outline">View Wishlist</Button>
            </div>

            {/* Addresses */}
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-bold mb-4">Addresses</h3>
              <p className="text-muted-foreground mb-4">Manage delivery addresses</p>
              <Button variant="outline">Manage Addresses</Button>
            </div>

            {/* Referrals */}
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-bold mb-4">Refer & Earn</h3>
              <p className="text-muted-foreground mb-4">Share and earn rewards</p>
              <Button variant="outline">View Referrals</Button>
            </div>

            {/* Settings */}
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-bold mb-4">Settings</h3>
              <p className="text-muted-foreground mb-4">Account preferences</p>
              <Button variant="outline">Account Settings</Button>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
            <p className="text-muted-foreground">
              Need help?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact support
              </Link>
            </p>
            <Button variant="outline">Sign Out</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
