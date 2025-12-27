import Link from "next/link"
import { Facebook, Instagram, Twitter, Leaf } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6" />
              <span className="font-bold text-lg">PriyaHerbal</span>
            </div>
            <p className="text-sm opacity-90">Premium Indian herbal products for wellness, beauty, and health.</p>
            <p className="text-sm opacity-90 mt-2">
              <a href="https://wa.me/918500647979" className="hover:opacity-100 transition">
                WhatsApp: +91 8500 647 979
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=Hair" className="opacity-90 hover:opacity-100">
                  Hair Care
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Skin" className="opacity-90 hover:opacity-100">
                  Skin Care
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Immunity" className="opacity-90 hover:opacity-100">
                  Immunity
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Wellness" className="opacity-90 hover:opacity-100">
                  Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="opacity-90 hover:opacity-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-90 hover:opacity-100">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="opacity-90 hover:opacity-100">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="opacity-90 hover:opacity-100">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="opacity-90 hover:opacity-100 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="opacity-90 hover:opacity-100 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="opacity-90 hover:opacity-100 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
          <p>&copy; {currentYear} PriyaHerbal. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:opacity-100 transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:opacity-100 transition">
              Terms of Service
            </Link>
            <Link href="#" className="hover:opacity-100 transition">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
