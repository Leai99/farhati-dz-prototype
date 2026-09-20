import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { ForwardArrow, HeartIcon, StarIcon } from '../../components/icons'
import { useFavorites } from '../../context/FavoritesContext'
import { formatPrice, toneClasses } from '../../lib/serviceDisplay'
import { services } from '../../mock-data/services'

/**
 * Customer App — Screen 10/15 (Section 5.A): Service Details.
 * Route: "/service/:id"
 */
export default function ServiceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isSaved, toggleFavorite } = useFavorites()
  const { t } = useTranslation(['serviceDetails', 'mockData', 'common'])

  const service = services.find((s) => s.id === id)

  if (!service) {
    return (
      <main className="flex min-h-screen flex-col bg-cream-base px-6 py-6">
        <BackButton to="/explore" />
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <p className="font-arabic text-lg font-semibold text-wine-primary">
            {t('notFoundTitle')}
          </p>
          <p className="font-arabic text-sm text-charcoal-text/70">{t('notFoundBody')}</p>
        </div>
      </main>
    )
  }

  const name = t(`mockData:services.${service.id}.name`)
  const location = t(`mockData:services.${service.id}.location`)
  const description = t(`mockData:services.${service.id}.description`)
  const categoryLabel = t(`mockData:categories.${service.categoryId}.label`)
  const saved = isSaved(service.id)

  return (
    <main className="min-h-screen bg-cream-base pb-12">
      <div className="px-4 pt-6">
        {/* Always leads back to Explore, regardless of entry path. */}
        <BackButton to="/explore" />
      </div>

      <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-6 pt-4">
        <div className="flex items-center gap-4">
          <span
            className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl font-arabic text-3xl font-semibold text-pure-white ${toneClasses[service.tone]}`}
          >
            {name.charAt(0)}
          </span>
          <div className="flex flex-1 flex-col gap-1 text-start">
            <h1 className="font-arabic text-xl font-semibold text-charcoal-text">{name}</h1>
            <span className="font-arabic text-sm text-charcoal-text/60">
              {categoryLabel} · {location}
            </span>
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-warm-gold/15 px-2.5 py-1 font-arabic text-sm font-semibold text-charcoal-text/80">
              <StarIcon className="h-4 w-4 text-warm-gold" />
              {service.rating.toFixed(1)}
              <span className="text-charcoal-text/40">
                ({t('reviewsCount', { count: service.reviewCount })})
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-3xl bg-pure-white shadow-sm px-5 py-4">
          <span className="font-arabic text-sm text-charcoal-text/70">{t('priceRange')}</span>
          <span className="font-arabic text-base font-semibold text-wine-primary">
            {formatPrice(service.priceFrom)}–{formatPrice(service.priceTo)}{' '}
            {t('common:currency')}
          </span>
        </div>

        <section className="flex flex-col gap-2 text-start">
          <h2 className="font-arabic text-sm font-semibold text-charcoal-text">{t('about')}</h2>
          <p className="font-arabic text-sm leading-relaxed text-charcoal-text/80">
            {description}
          </p>
        </section>

        <button
          type="button"
          onClick={() => toggleFavorite(service.id)}
          className={`flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-arabic text-sm font-semibold transition-colors ${
            saved
              ? 'border-wine-primary bg-wine-primary text-pure-white shadow-md shadow-wine-primary/20'
              : 'border-wine-primary bg-transparent text-wine-primary'
          }`}
        >
          <HeartIcon filled={saved} className="h-4 w-4" />
          {saved ? t('saved') : t('save')}
        </button>

        <button
          type="button"
          onClick={() => navigate(`/provider/${service.providerId}`)}
          className="flex items-center justify-between rounded-3xl bg-pure-white shadow-sm px-5 py-4 text-start"
        >
          <span className="font-arabic text-sm font-semibold text-charcoal-text">
            {t('viewProvider')}
          </span>
          <ForwardArrow className="h-4 w-4 text-wine-primary" />
        </button>
      </div>
    </main>
  )
}
