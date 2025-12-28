"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface SetupStatus {
  ready: boolean
  environment: {
    supabaseUrl: boolean
    supabaseKey: boolean
    cashfreeKeyId: boolean
    cashfreeSecret: boolean
    cashfreeMode: string
  }
  database: {
    connected: boolean
    productsCount: number
    error?: string
  }
}

export default function SetupPage() {
  const [status, setStatus] = useState<SetupStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSetupStatus() {
      try {
        const response = await fetch("/api/setup/status")
        const data = await response.json()
        setStatus(data)
      } catch (error) {
        console.error("Failed to check setup status:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSetupStatus()
    const interval = setInterval(checkSetupStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Checking Setup Status...</h1>
          <p className="text-gray-600">Please wait while we verify your configuration</p>
        </div>
      </div>
    )
  }

  if (!status) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error Checking Setup</h1>
          <p className="text-gray-600 mb-4">Could not check your setup status. Please try refreshing.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Refresh
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">PriyaHerbal Setup</h1>
        <p className="text-gray-600 mb-8">Configuration Status & Getting Started</p>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Environment Variables */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-emerald-600">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Environment Variables</h2>
            <div className="space-y-2 text-sm">
              <StatusItem name="Supabase URL" status={status.environment.supabaseUrl} />
              <StatusItem name="Supabase Key" status={status.environment.supabaseKey} />
              <StatusItem name="Cashfree Key ID" status={status.environment.cashfreeKeyId} />
              <StatusItem name="Cashfree Secret" status={status.environment.cashfreeSecret} />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cashfree Mode:</span>
                <span
                  className={`px-3 py-1 rounded ${status.environment.cashfreeMode === "TEST" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                >
                  {status.environment.cashfreeMode}
                </span>
              </div>
            </div>
          </div>

          {/* Database Status */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-600">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Database</h2>
            <div className="space-y-2">
              <StatusItem name="Connected" status={status.database.connected} />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Products:</span>
                <span className="font-bold text-amber-600">{status.database.productsCount} items</span>
              </div>
              {status.database.error && <p className="text-red-600 text-sm mt-2">{status.database.error}</p>}
            </div>
          </div>
        </div>

        {/* Ready Status */}
        <div
          className={`rounded-lg shadow-lg p-6 mb-8 ${status.ready ? "bg-green-50 border-l-4 border-green-600" : "bg-yellow-50 border-l-4 border-yellow-600"}`}
        >
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className={`text-lg font-bold ${status.ready ? "text-green-900" : "text-yellow-900"}`}>
                {status.ready ? "✓ Ready to Launch!" : "⚠ Setup Incomplete"}
              </h3>
              <p className={status.ready ? "text-green-700" : "text-yellow-700"}>
                {status.ready
                  ? "All systems configured. You can start using the platform now."
                  : "Please complete the setup steps below before launching."}
              </p>
            </div>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Setup Checklist</h2>
          <div className="space-y-3">
            <SetupStep
              number={1}
              title="Add Environment Variables"
              completed={
                status.environment.supabaseUrl &&
                status.environment.supabaseKey &&
                status.environment.cashfreeKeyId &&
                status.environment.cashfreeSecret
              }
              description="Set Supabase and Cashfree credentials in Vercel"
            />
            <SetupStep
              number={2}
              title="Connect Database"
              completed={status.database.connected}
              description="Run SQL scripts in Supabase"
            />
            <SetupStep
              number={3}
              title="Seed Products"
              completed={status.database.productsCount > 0}
              description="Load product catalog"
            />
            <SetupStep
              number={4}
              title="Test Payment Gateway"
              completed={status.ready}
              description="Verify Cashfree integration"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 text-center"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 text-center"
          >
            Browse Products
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8 border-l-4 border-blue-600">
          <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800 text-sm mb-3">Check our setup documentation:</p>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• START_HERE.md - Quick start guide</li>
            <li>• SETUP_FOR_NON_TECHNICAL.md - Step-by-step instructions</li>
            <li>• PRODUCTION_READY_CHECKLIST.md - Verification steps</li>
          </ul>
          <p className="text-blue-800 text-sm mt-3">
            WhatsApp: <strong>+91 8500 647 979</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

function StatusItem({ name, status }: { name: string; status: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{name}:</span>
      <span
        className={`px-3 py-1 rounded text-sm font-semibold ${
          status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {status ? "✓ Set" : "✗ Missing"}
      </span>
    </div>
  )
}

function SetupStep({
  number,
  title,
  completed,
  description,
}: { number: number; title: string; completed: boolean; description: string }) {
  return (
    <div className={`flex items-start p-3 rounded ${completed ? "bg-green-50" : "bg-gray-50"}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 ${
          completed ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
        }`}
      >
        {completed ? "✓" : number}
      </div>
      <div className="flex-1">
        <h4 className={`font-semibold ${completed ? "text-green-900" : "text-gray-900"}`}>{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
