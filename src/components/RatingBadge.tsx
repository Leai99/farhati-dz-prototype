import { StarIcon } from './icons'

interface RatingBadgeProps {
  rating: number
  reviewCount?: number
  className?: string
}

/**
 * Small rounded pill showing a star rating (and, when known, the review
 * count) with a light gold-tinted background — shared by every place a
 * service/provider rating is displayed so it reads as one consistent chip.
 */
export default function RatingBadge({ rating, reviewCount, className = '' }: RatingBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full bg-warm-gold/15 px-2.5 py-1 font-arabic text-xs font-semibold text-charcoal-text/80 ${className}`}
    >
      <StarIcon className="h-3.5 w-3.5 text-warm-gold" />
      {rating.toFixed(1)}
      {reviewCount !== undefined && <span className="text-charcoal-text/40">({reviewCount})</span>}
    </span>
  )
}
