import Image from "next/image"
import Link from "next/link"

const relatedProducts = [
  { id: 2, name: "Brahmi Hair Oil", price: 229, image: "/brahmi-hair-oil.jpg" },
  { id: 3, name: "Bhringraj Oil", price: 269, image: "/bhringraj-oil.jpg" },
  { id: 4, name: "Turmeric Face Pack", price: 199, image: "/turmeric-face-pack.jpg" },
]

interface RelatedProductsProps {
  category: string
}

export default function RelatedProducts({ category }: RelatedProductsProps) {
  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-muted mb-4 aspect-square">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition"
                  />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition">{product.name}</h3>
                <p className="text-lg font-bold text-primary">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
