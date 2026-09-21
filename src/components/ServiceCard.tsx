import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { liftable } from '../lib/motion'
import { categoryImage, formatPrice, toneClasses } from '../lib/serviceDisplay'
import type { Service } from '../mock-data/services'
import { HeartIcon } from './icons'
import RatingBadge from './RatingBadge'

interface ServiceCardProps {
  service: Service
  categoryLabel: string
  /** Shows an inline save/unsave heart button (used on Favorites). */
  showFavoriteToggle?: boolean
}

/**
 * Service list-item card — shared by Explore, Favorites and Provider
 * Profile's "other services" list so all three read as one product.
 */
export default function ServiceCard({
  service,
  categoryLabel,
  showFavoriteToggle = false,
}: ServiceCardProps) {
  const navigate = useNavigate()
  const { isSaved, toggleFavorite } = useFavorites()
  const saved = isSaved(service.id)
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
          <span className="font-arabic text-base font-semibold text-charcoal-text">{name}</span>
          <span className="font-arabic text-xs text-charcoal-text/60">
            {categoryLabel} · {location}
          </span>
          <div className="mt-1 flex items-center justify-between">
            <RatingBadge rating={service.rating} reviewCount={service.reviewCount} />
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
    </m.div>
  )
}
