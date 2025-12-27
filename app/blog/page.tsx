import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Ayurvedic Hair Care",
    excerpt:
      "Discover ancient Ayurvedic secrets for thick, healthy hair. Learn how neem and brahmi oils can transform your hair care routine.",
    content: "Full article content here...",
    author: "Dr. Priya Sharma",
    date: "Dec 15, 2024",
    category: "Ayurveda",
    image: "/ayurvedic-hair-care-herbs.jpg",
    slug: "ayurvedic-hair-care-guide",
  },
  {
    id: 2,
    title: "Turmeric: The Golden Root of Wellness",
    excerpt:
      "Explore the incredible health benefits of turmeric. From anti-inflammation to skin health, learn why this spice is called liquid gold.",
    content: "Full article content here...",
    author: "Rajesh Kumar",
    date: "Dec 10, 2024",
    category: "Wellness",
    image: "/turmeric-golden-spice-wellness.jpg",
    slug: "turmeric-golden-root",
  },
  {
    id: 3,
    title: "Natural Skincare with Ashwagandha",
    excerpt:
      "How this adaptogenic herb can reduce stress and improve skin health. A complete guide to Ashwagandha benefits for glowing skin.",
    content: "Full article content here...",
    author: "Sneha Desai",
    date: "Dec 5, 2024",
    category: "Skin Care",
    image: "/ashwagandha-skin-care-natural.jpg",
    slug: "ashwagandha-skincare",
  },
  {
    id: 4,
    title: "Immunity Boosting Herbs of India",
    excerpt:
      "Build a strong immune system with traditional Indian herbs. Learn about tulsi, neem, and other powerhouse herbs for immunity.",
    content: "Full article content here...",
    author: "Dr. Vikram Singh",
    date: "Nov 28, 2024",
    category: "Immunity",
    image: "/immunity-boosting-herbs-india.jpg",
    slug: "immunity-herbs",
  },
  {
    id: 5,
    title: "The Science Behind Brahmi Oil",
    excerpt:
      "Understanding the neuroscience of Brahmi. How this cooling herb enhances focus, memory, and mental clarity naturally.",
    content: "Full article content here...",
    author: "Dr. Priya Sharma",
    date: "Nov 20, 2024",
    category: "Wellness",
    image: "/brahmi-oil-science-brain-health.jpg",
    slug: "brahmi-science",
  },
]

export default function BlogPage() {
  return (
    <main className="bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wellness Blog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover ancient wisdom and modern insights about herbal wellness, Ayurveda, and natural health.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="group cursor-pointer h-full flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-muted">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-semibold">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-8 text-lg opacity-90">
            Get wellness tips, product recommendations, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-lg text-foreground" />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
