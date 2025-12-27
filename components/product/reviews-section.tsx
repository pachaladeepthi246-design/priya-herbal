import { Star } from "lucide-react"

interface Review {
  id: number
  author: string
  rating: number
  title: string
  content: string
  helpful: number
}

interface ReviewsSectionProps {
  reviews: Review[]
  rating: number
}

export default function ReviewsSection({ reviews, rating }: ReviewsSectionProps) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-8 mb-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-primary">{rating}</p>
            <div className="flex gap-1 my-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-secondary text-secondary" : "text-muted"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Based on 234 reviews</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border border-border rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold">{review.author}</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-secondary text-secondary" : "text-muted"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="font-semibold text-sm mb-2">{review.title}</p>
            <p className="text-sm text-muted-foreground">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
