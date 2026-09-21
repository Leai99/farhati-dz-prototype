import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useReviews } from '../context/ReviewsContext'
import { relativeTime } from '../lib/relativeTime'
import type { Service } from '../mock-data/services'
import Button from './Button'
import { StarIcon } from './icons'
import { StaggerItem, StaggerList } from './Motion'

const COMMENT_MAX = 300

/** Read-only row of 5 stars; follows the page direction (first star on the right in Arabic). */
function Stars({ rating, className = 'h-3.5 w-3.5' }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          filled={n <= Math.round(rating)}
          className={`${className} ${n <= Math.round(rating) ? 'text-warm-gold' : 'text-muted-rose/40'}`}
        />
      ))}
    </span>
  )
}

/**
 * Service Details — Reviews: overall rating, the latest reviews, and a
 * session-only "add your review" form (1–5 star picker + comment).
 */
export default function ReviewsSection({ service }: { service: Service }) {
  const { t } = useTranslation(['serviceDetails', 'mockData', 'common'])
  const { reviewsFor, statsFor, addReview } = useReviews()
  const reviews = reviewsFor(service.id)
  const stats = statsFor(service)

  const [formOpen, setFormOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>({})
  const [submitted, setSubmitted] = useState(false)

  function openForm() {
    setFormOpen(true)
    setSubmitted(false)
  }

  function closeForm() {
    setFormOpen(false)
    setRating(0)
    setHovered(0)
    setComment('')
    setErrors({})
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (rating === 0) next.rating = t('reviews.errors.ratingRequired')
    if (!comment.trim()) next.comment = t('reviews.errors.commentRequired')
    setErrors(next)
    if (Object.keys(next).length > 0) return

    addReview(service.id, {
      reviewerName: t('mockData:currentUser.name'),
      rating,
      comment: comment.trim(),
    })
    closeForm()
    setSubmitted(true)
  }

  const shownRating = hovered || rating

  return (
    <section className="flex flex-col gap-4 text-start">
      <h2 className="font-arabic text-sm font-semibold text-charcoal-text">{t('reviews.title')}</h2>

      {/* Overall rating — live, includes this session's reviews */}
      <div className="flex items-center gap-4 rounded-3xl bg-pure-white px-5 py-4 shadow-sm">
        <span className="font-arabic text-3xl font-bold text-primary-pink">{stats.rating.toFixed(1)}</span>
        <div className="flex flex-col gap-1">
          <Stars rating={stats.rating} className="h-4 w-4" />
          <span className="font-arabic text-xs text-charcoal-text/60">
            {t('reviewsCount', { count: stats.reviewCount })}
          </span>
        </div>
      </div>

      {submitted && (
        <p
          role="status"
          className="rounded-xl border border-warm-gold/40 bg-warm-gold/10 px-4 py-3 font-arabic text-sm text-charcoal-text"
        >
          {t('reviews.success')}
        </p>
      )}

      {formOpen ? (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4 rounded-3xl bg-pure-white p-5 shadow-sm"
        >
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 font-arabic text-sm font-medium text-charcoal-text">
              {t('reviews.yourRating')}
            </legend>
            <div
              role="radiogroup"
              aria-label={t('reviews.yourRating')}
              className="flex gap-1"
              onMouseLeave={() => setHovered(0)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={t('reviews.starOption', { count: n })}
                  onClick={() => {
                    setRating(n)
                    setErrors((prev) => ({ ...prev, rating: undefined }))
                  }}
                  onMouseEnter={() => setHovered(n)}
                  className="rounded-full p-1"
                >
                  <StarIcon
                    filled={n <= shownRating}
                    className={`h-7 w-7 ${n <= shownRating ? 'text-warm-gold' : 'text-muted-rose/40'}`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <span className="font-arabic text-xs font-medium text-muted-rose">{errors.rating}</span>
            )}
          </fieldset>

          <label htmlFor="review-comment" className="flex flex-col gap-1.5 font-arabic">
            <span className="text-sm font-medium text-charcoal-text">{t('reviews.commentLabel')}</span>
            <textarea
              id="review-comment"
              rows={3}
              maxLength={COMMENT_MAX}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
                if (errors.comment) setErrors((prev) => ({ ...prev, comment: undefined }))
              }}
              placeholder={t('reviews.commentPlaceholder')}
              aria-invalid={errors.comment ? true : undefined}
              className={`resize-none rounded-xl border bg-pure-white px-4 py-3 text-sm text-charcoal-text outline-none placeholder:text-charcoal-text/40 ${
                errors.comment ? 'border-muted-rose' : 'border-muted-rose/40 focus:border-primary-pink'
              }`}
            />
            <span className="flex justify-between gap-2 text-xs">
              <span className="font-medium text-muted-rose">{errors.comment}</span>
              <span className="text-charcoal-text/40">
                {comment.length}/{COMMENT_MAX}
              </span>
            </span>
          </label>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              {t('reviews.submit')}
            </Button>
            <Button variant="outline" className="flex-1" onClick={closeForm}>
              {t('reviews.cancel')}
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="outline" onClick={openForm}>
          {t('reviews.add')}
        </Button>
      )}

      <StaggerList className="flex flex-col gap-3">
        {reviews.map((r) => (
          <StaggerItem key={r.id} className="flex flex-col gap-2 rounded-3xl bg-pure-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-pink font-arabic text-sm font-semibold text-pure-white">
                {r.reviewerName.charAt(0)}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex items-center gap-2 font-arabic text-sm font-semibold text-charcoal-text">
                  <span className="truncate">{r.reviewerName}</span>
                  {r.isNew && (
                    <span className="shrink-0 rounded-full bg-primary-pink/10 px-2 py-0.5 text-[10px] font-semibold text-primary-pink">
                      {t('reviews.yours')}
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-2">
                  <Stars rating={r.rating} />
                  <span className="sr-only">{t('reviews.starOption', { count: r.rating })}</span>
                  <span className="font-arabic text-[11px] text-charcoal-text/40">
                    {r.isNew ? t('common:time.justNow') : relativeTime(t, r.daysAgo)}
                  </span>
                </span>
              </div>
            </div>
            <p className="font-arabic text-sm leading-relaxed text-charcoal-text/80">{r.comment}</p>
          </StaggerItem>
        ))}
      </StaggerList>
    </section>
  )
}
