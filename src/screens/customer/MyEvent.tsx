import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../../components/EmptyState'
import { CalendarIcon } from '../../components/icons'
import ServiceCard from '../../components/ServiceCard'
import { useFavorites } from '../../context/FavoritesContext'
import { formatPrice } from '../../lib/serviceDisplay'
import { services } from '../../mock-data/services'

/**
 * Customer App — Screen 13/15 (Section 5.A): My Event. Route: "/my-event"
 *
 * There's no real event-creation flow yet, so "added to your event" reuses
 * the Favorites store rather than a second, disconnected list — see the
 * assumptions note in the summary for why.
 */
export default function MyEvent() {
  const navigate = useNavigate()
  const { savedIds } = useFavorites()
  const eventServices = services.filter((s) => savedIds.includes(s.id))
  const { t } = useTranslation(['myEvent', 'mockData', 'common'])

  const totalMin = eventServices.reduce((sum, s) => sum + s.priceFrom, 0)
  const totalMax = eventServices.reduce((sum, s) => sum + s.priceTo, 0)

  return (
    <main className="min-h-full bg-cream-base px-6 pb-28 pt-10">
      <h1 className="text-start font-arabic text-2xl font-bold text-primary-pink">
        {t('title')}
      </h1>

      {eventServices.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={<CalendarIcon className="h-6 w-6" />}
          title={t('empty.title')}
          description={t('empty.description')}
          action={{ label: t('empty.cta'), onClick: () => navigate('/explore') }}
        />
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {/* Signature Event Card — same wine + gold edge-glow treatment as Home's CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-primary-pink p-6 text-start shadow-md">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-warm-gold/40 blur-2xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-warm-gold/30 blur-2xl"
            />
            <div className="relative flex flex-col gap-2">
              <p className="font-arabic text-lg font-semibold text-pure-white">
                {t('servicesAdded', { count: eventServices.length })}
              </p>
              <p className="font-arabic text-sm text-pure-white/80">
                {t('estimatedBudget')}: {formatPrice(totalMin)}–{formatPrice(totalMax)}{' '}
                {t('common:currency')}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {eventServices.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                categoryLabel={t(`mockData:categories.${s.categoryId}.label`)}
                showFavoriteToggle
              />
            ))}
          </div>
        </div>
      )}

    </main>
  )
}
