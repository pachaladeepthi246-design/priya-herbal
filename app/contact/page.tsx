"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Will integrate with Supabase in next phase
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <main className="bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-lg">
            Have questions? We'd love to hear from you. Reach out and let's start a conversation.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Email */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="p-3 bg-primary/10 backdrop-blur-md rounded-lg h-fit border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Email</h3>
                  <p className="text-muted-foreground">hello@priyaherbal.com</p>
                  <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="p-3 bg-primary/10 backdrop-blur-md rounded-lg h-fit border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Phone</h3>
                  <p className="text-muted-foreground">+91 8500 647 979</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM IST</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="p-3 bg-primary/10 backdrop-blur-md rounded-lg h-fit border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Office</h3>
                  <p className="text-muted-foreground">
                    Mumbai, Maharashtra
                    <br />
                    India
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="p-3 bg-[#25D366]/10 backdrop-blur-md rounded-lg h-fit border border-[#25D366]/20 group-hover:border-[#25D366]/40 transition-all duration-300">
                  <MessageSquare className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground">+91 8500 647 979</p>
                  <p className="text-sm text-muted-foreground">For quick orders</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-8 bg-card/50 backdrop-blur-md border border-primary/10 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    placeholder="Tell us more..."
                    rows={6}
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
