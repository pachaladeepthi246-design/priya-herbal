"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBag, User } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PH</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline">PriyaHerbal</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium hover:text-primary transition">
              Shop
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/protected/account">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              <Link href="/" className="px-4 py-2 hover:bg-muted rounded transition">
                Home
              </Link>
              <Link href="/shop" className="px-4 py-2 hover:bg-muted rounded transition">
                Shop
              </Link>
              <Link href="/blog" className="px-4 py-2 hover:bg-muted rounded transition">
                Blog
              </Link>
              <Link href="/about" className="px-4 py-2 hover:bg-muted rounded transition">
                About
              </Link>
              <Link href="/contact" className="px-4 py-2 hover:bg-muted rounded transition">
                Contact
              </Link>
              <Link href="/auth/login" className="px-4 py-2">
                <Button className="w-full">Sign In</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
