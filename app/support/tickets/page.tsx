"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

interface SupportTicket {
  id: string
  ticket_number: string
  subject: string
  status: string
  priority: string
  created_at: string
  updated_at: string
}

export default function SupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadUserAndTickets()
  }, [])

  const loadUserAndTickets = async () => {
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
        .from("support_tickets")
        .select("*")
        .eq("user_id", authUser.id)
        .order("created_at", { ascending: false })

      setTickets(data || [])
    } catch (error) {
      console.error("Error loading tickets:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) return

    setSubmitting(true)
    try {
      const supabase = createClient()
      const ticketNumber = `TKT-${Date.now()}`

      const { error } = await supabase.from("support_tickets").insert([
        {
          user_id: user.id,
          ticket_number: ticketNumber,
          subject,
          message,
          status: "open",
          priority: "normal",
        },
      ])

      if (error) throw error

      setSubject("")
      setMessage("")
      await loadUserAndTickets()
    } catch (error) {
      console.error("Error submitting ticket:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading support tickets...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background">
      <Navigation />

      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Support Tickets</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* New Ticket Form */}
          <div className="md:col-span-1">
            <Card className="glass-card sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg">New Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                  <Textarea
                    placeholder="Describe your issue..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting ? "Creating..." : "Create Ticket"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Tickets List */}
          <div className="md:col-span-2 space-y-4">
            {tickets.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="pt-6 text-center text-muted-foreground">No support tickets yet</CardContent>
              </Card>
            ) : (
              tickets.map((ticket) => (
                <Card key={ticket.id} className="glass-card hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{ticket.subject}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{ticket.ticket_number}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs capitalize ${
                          ticket.status === "resolved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(ticket.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
