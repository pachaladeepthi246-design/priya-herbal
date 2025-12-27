import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <main className="bg-background">
      <Navigation />
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Sorry, we couldn't find the page you're looking for. Let's get you back on track.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
