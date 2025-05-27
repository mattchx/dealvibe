import { useParams } from 'react-router-dom'
import { mockDeals } from '@/lib/mock-data'

export default function DealPage() {
  const { id } = useParams()
  const deal = mockDeals.find(d => d.id === id)

  if (!deal) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Deal Not Found</h1>
        <p className="text-muted-foreground">The deal you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card rounded-lg overflow-hidden shadow-lg">
        <div className="aspect-video relative">
          <img
            src={deal.imageUrl || "/placeholder.svg"}
            alt={deal.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{deal.title}</h1>
          
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span>{deal.merchant}</span>
            <span className="mx-2">•</span>
            <span>{deal.category}</span>
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl font-bold text-green-600 dark:text-green-500">
              ${deal.price.toFixed(2)}
            </span>
            {deal.originalPrice > deal.price && (
              <span className="text-lg line-through text-muted-foreground">
                ${deal.originalPrice.toFixed(2)}
              </span>
            )}
            {deal.discount > 0 && (
              <span className="text-green-600 dark:text-green-500 font-medium">
                {deal.discount}% OFF
              </span>
            )}
          </div>

          <p className="text-lg mb-6">{deal.description}</p>

          <div className="flex gap-2 mb-6">
            {deal.tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1">
                <span>👍 {deal.votes.up}</span>
              </button>
              <button className="flex items-center gap-1">
                <span>👎 {deal.votes.down}</span>
              </button>
              <span>💬 {deal.commentsCount} comments</span>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">
                Posted by {deal.postedBy.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}