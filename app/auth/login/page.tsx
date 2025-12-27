"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) throw loginError
      router.push("/protected/account")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Panel - Form */}
      <div className="flex items-center justify-center p-4 md:p-8 order-2 md:order-1">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  PH
                </div>
                <span className="font-bold text-xl">PriyaHerbal</span>
              </div>
            </Link>
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <Button variant="outline" className="w-full bg-transparent" disabled>
            Continue with Google
          </Button>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-primary hover:underline font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Hero Image */}
      <div className="hidden md:block relative overflow-hidden bg-primary order-1 md:order-2">
        <Image src="/hero-banner.jpg" alt="Wellness" fill className="object-cover opacity-40" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center p-8">
          <div className="max-w-sm">
            <h1 className="text-4xl font-bold mb-4">Welcome to Wellness</h1>
            <p className="text-lg opacity-90 mb-8">
              Access your account to track orders, manage wishlist, and enjoy exclusive benefits.
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                <span>Track Your Orders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                <span>Exclusive Member Offers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                <span>Refer & Earn Rewards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
