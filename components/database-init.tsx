"use client"

import { useEffect, useState } from "react"

export function DatabaseInit() {
  const [initialized, setInitialized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initDb = async () => {
      try {
        const hasInit = localStorage.getItem("db_initialized")
        if (hasInit) {
          setInitialized(true)
          setLoading(false)
          return
        }

        console.log("[v0] Initializing database...")
        const response = await fetch("/api/setup", {
          method: "POST",
        })

        if (response.ok) {
          localStorage.setItem("db_initialized", "true")
          setInitialized(true)
          console.log("[v0] Database initialized successfully")
        } else {
          console.warn("[v0] Database initialization returned non-200 status")
        }
      } catch (err) {
        console.warn("[v0] Database initialization skipped (normal in development)")
      } finally {
        setLoading(false)
      }
    }

    initDb()
  }, [])

  if (loading) return null
  if (!initialized) return null

  return null
}
