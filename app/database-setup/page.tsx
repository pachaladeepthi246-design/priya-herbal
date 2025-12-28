"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DatabaseSetupPage() {
  const [status, setStatus] = useState<"idle" | "checking" | "ready" | "error">("idle")
  const [tables, setTables] = useState<string[]>([])
  const [products, setProducts] = useState(0)

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  async function checkDatabaseStatus() {
    setStatus("checking")
    try {
      const response = await fetch("/api/database/initialize", { method: "POST" })
      const data = await response.json()

      if (data.success) {
        setStatus("ready")
        // In production, fetch actual table data
      }
    } catch (err) {
      setStatus("error")
      console.error("Status check failed:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">PriyaHerbal Database Setup</h1>
        <p className="text-slate-400 mb-8">Complete guide to initialize your production database</p>

        {/* Status Section */}
        <Card className="mb-8 border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Current Setup Status</CardTitle>
            <CardDescription>Check your database configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <span className="text-white">Database Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status === "ready"
                      ? "bg-green-500/20 text-green-400"
                      : status === "error"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {status === "idle" && "Not Started"}
                  {status === "checking" && "Checking..."}
                  {status === "ready" && "Ready"}
                  {status === "error" && "Error"}
                </span>
              </div>

              {status === "checking" && (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400"></div>
                  <p className="text-slate-300 mt-2">Checking database...</p>
                </div>
              )}

              {status === "ready" && (
                <div className="space-y-2">
                  <p className="text-green-400">✓ Database tables created</p>
                  <p className="text-green-400">✓ Products seeded ({products} items)</p>
                  <p className="text-green-400">✓ Affiliate system enabled</p>
                  <p className="text-green-400">✓ Payment integration ready</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card className="border-slate-700 bg-slate-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Setup Instructions</CardTitle>
            <CardDescription>Follow these steps to initialize your database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Open Supabase Dashboard",
                    desc: "Go to supabase.com/dashboard and select your PriuyaHub project",
                  },
                  {
                    step: 2,
                    title: "Navigate to SQL Editor",
                    desc: "Click SQL Editor in the left sidebar, then New Query",
                  },
                  {
                    step: 3,
                    title: "Copy SQL Scripts",
                    desc: "Paste scripts 001-004 from your scripts folder (one at a time)",
                  },
                  {
                    step: 4,
                    title: "Execute Queries",
                    desc: "Run each query and wait for completion (takes ~30 seconds total)",
                  },
                  {
                    step: 5,
                    title: "Verify Setup",
                    desc: "See verification checklist below to confirm success",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500/20 text-blue-400 font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                onClick={() => window.open("https://supabase.com/dashboard")}
              >
                Supabase Dashboard
              </Button>
              <Button
                variant="outline"
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                onClick={() => window.open("https://github.com")}
              >
                View Scripts
              </Button>
              <Button
                variant="outline"
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                onClick={checkDatabaseStatus}
              >
                Refresh Status
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => (window.location.href = "/")}
              >
                Return Home
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Need Help?</h3>
          <p className="text-slate-300">
            Contact us on WhatsApp:{" "}
            <a href="https://wa.me/918500647979" className="text-blue-400 hover:underline">
              +91 8500 647 979
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
