import { useNavigate } from 'react-router-dom'
import { formatPrice, toneClasses } from '../lib/serviceDisplay'
import type { Service } from '../mock-data/services'
import RatingBadge from './RatingBadge'

interface ProviderServiceCardProps {
  service: Service
  categoryLabel: string
}

/**
 * Service card variant for the provider's own "خدماتي" list. Distinct from
 * the customer-facing ServiceCard: tapping opens the edit form instead of
 * the public detail page, there's no favorite toggle, and a service with no
 * reviews yet shows "جديد" instead of a fabricated 0.0 rating.
 */
export default function ProviderServiceCard({ service, categoryLabel }: ProviderServiceCardProps) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(`/provider-app/services/${service.id}/edit`)}
      className="flex items-center gap-4 rounded-3xl bg-pure-white p-4 text-right shadow-sm transition-colors hover:shadow-md"
    >
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-arabic text-lg font-semibold text-pure-white ${toneClasses[service.tone]}`}
      >
        {service.name.charAt(0)}
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <span className="font-arabic text-base font-semibold text-charcoal-text">
          {service.name}
        </span>
        <span className="font-arabic text-xs text-charcoal-text/60">{categoryLabel}</span>
        <div className="mt-1 flex items-center justify-between">
          {service.reviewCount > 0 ? (
            <RatingBadge rating={service.rating} reviewCount={service.reviewCount} />
          ) : (
            <span className="inline-flex shrink-0 items-center rounded-full bg-warm-gold/15 px-2.5 py-1 font-arabic text-xs font-semibold text-warm-gold">
              جديد
            </span>
          )}
          <span className="font-arabic text-xs font-semibold text-primary-pink">
            {formatPrice(service.priceFrom)}–{formatPrice(service.priceTo)} دج
          </span>
        </div>
      </div>
      <span className="shrink-0 font-arabic text-xs font-semibold text-primary-pink">تعديل</span>
    </button>
  )
}
