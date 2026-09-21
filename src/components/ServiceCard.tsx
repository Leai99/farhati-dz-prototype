import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useReviews } from '../context/ReviewsContext'
import { liftable } from '../lib/motion'
import { categoryImage, formatPrice, toneClasses } from '../lib/serviceDisplay'
import { providers } from '../mock-data/providers'
import type { Service } from '../mock-data/services'
import { CloseIcon, HeartIcon } from './icons'
import RatingBadge from './RatingBadge'
import VerifiedBadge from './VerifiedBadge'

interface ServiceCardProps {
  service: Service
  categoryLabel: string
  /** Shows an inline save/unsave heart button (used on Favorites). */
  showFavoriteToggle?: boolean
  /** Shows an inline remove (×) button — used on Event Detail to unlink a service. */
  onRemove?: () => void
  /** Accessible label for the remove button. */
  removeLabel?: string
}

/**
 * Service list-item card — shared by Explore, Favorites and Provider
 * Profile's "other services" list so all three read as one product.
 */
export default function ServiceCard({
  service,
  categoryLabel,
  showFavoriteToggle = false,
  onRemove,
  removeLabel,
}: ServiceCardProps) {
  const navigate = useNavigate()
  const { isSaved, toggleFavorite } = useFavorites()
  const saved = isSaved(service.id)
  // Live figures, so a review added this session shows on cards too.
  const stats = useReviews().statsFor(service)
  const verified = providers.find((p) => p.id === service.providerId)?.verified ?? false
  const { t } = useTranslation(['common', 'mockData'])
  const name = t(`mockData:services.${service.id}.name`)
  const location = t(`mockData:services.${service.id}.location`)

  return (
    <m.div {...liftable} className="flex items-center gap-1 rounded-3xl bg-pure-white p-4 shadow-sm">
      <button
        type="button"
        onClick={() => navigate(`/service/${service.id}`)}
        className="flex flex-1 items-center gap-4 text-start"
      >
        <span
          className={`relative flex h-16 w-16 shrink-0 overflow-hidden rounded-2xl ${toneClasses[service.tone]}`}
        >
          <img
            src={categoryImage(service.categoryId)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </span>
        <div className="flex flex-1 flex-col gap-1">
          <span className="flex items-center gap-1.5 font-arabic text-base font-semibold text-charcoal-text">
            {name}
            {verified && <VerifiedBadge variant="icon" />}
          </span>
          <span className="font-arabic text-xs text-charcoal-text/60">
            {categoryLabel} · {location}
          </span>
          <div className="mt-1 flex items-center justify-between">
            <RatingBadge rating={stats.rating} reviewCount={stats.reviewCount} />
            <span className="font-arabic text-xs font-semibold text-primary-pink">
              {formatPrice(service.priceFrom)}–{formatPrice(service.priceTo)} {t('common:currency')}
            </span>
          </div>
        </div>
      </button>

      {showFavoriteToggle && (
        <button
          type="button"
          onClick={() => toggleFavorite(service.id)}
          aria-label={saved ? t('common:removeFromFavorites') : t('common:saveToFavorites')}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary-pink hover:bg-muted-rose/10"
        >
          <HeartIcon filled={saved} />
        </button>
      )}

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          title={removeLabel}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-charcoal-text/50 hover:bg-muted-rose/10 hover:text-primary-pink"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </m.div>
  )
}
