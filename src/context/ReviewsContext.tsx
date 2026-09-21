import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { reviewsByService, type Review } from '../mock-data/reviews'
import type { Service } from '../mock-data/services'

interface NewReviewInput {
  reviewerName: string
  rating: number
  comment: string
}

interface ReviewsContextValue {
  /** Newest first: this session's reviews, then the mock sample. */
  reviewsFor: (serviceId: string) => Review[]
  /** Live overall rating + total count, including this session's reviews. */
  statsFor: (service: Service) => { rating: number; reviewCount: number }
  addReview: (serviceId: string, input: NewReviewInput) => void
}

const ReviewsContext = createContext<ReviewsContextValue | null>(null)

/**
 * Session-only reviews store. Reviews submitted on Service Details live in
 * memory for the session (reset on reload), like the rest of the
 * prototype's editable state.
 *
 * `services.ts` keeps each service's all-time `rating` + `reviewCount`; the
 * mock reviews are only a sample of those. A new review is folded into the
 * all-time figures as a weighted average: (rating × count + new) / (count + 1).
 */
export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [added, setAdded] = useState<Record<string, Review[]>>({})

  const value = useMemo<ReviewsContextValue>(
    () => ({
      reviewsFor: (serviceId) => [...(added[serviceId] ?? []), ...(reviewsByService[serviceId] ?? [])],
      statsFor: (service) => {
        const extra = added[service.id] ?? []
        if (extra.length === 0) return { rating: service.rating, reviewCount: service.reviewCount }
        const reviewCount = service.reviewCount + extra.length
        const total = service.rating * service.reviewCount + extra.reduce((sum, r) => sum + r.rating, 0)
        return { rating: total / reviewCount, reviewCount }
      },
      addReview: (serviceId, input) =>
        setAdded((current) => {
          const list = current[serviceId] ?? []
          const review: Review = {
            id: `${serviceId}-new-${list.length + 1}`,
            serviceId,
            reviewerName: input.reviewerName,
            rating: input.rating,
            comment: input.comment,
            daysAgo: 0,
            isNew: true,
          }
          return { ...current, [serviceId]: [review, ...list] }
        }),
    }),
    [added],
  )

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}

export function useReviews() {
  const ctx = useContext(ReviewsContext)
  if (!ctx) {
    throw new Error('useReviews must be used within a ReviewsProvider')
  }
  return ctx
}
