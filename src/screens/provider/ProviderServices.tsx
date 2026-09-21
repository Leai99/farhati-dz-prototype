import { useNavigate } from 'react-router-dom'
import ProviderSidebar from '../../components/ProviderSidebar'
import ProviderServiceCard from '../../components/ProviderServiceCard'
import { useProviderData } from '../../context/ProviderDataContext'
import { CURRENT_PROVIDER_ID } from '../../mock-data/session'
import { categories } from '../../mock-data/services'
import { AnimatedMain } from '../../components/Motion'
import { m } from 'framer-motion'
import { pressable } from '../../lib/motion'

/**
 * Service Provider App — Screen 5/9 (Section 5.B): Services.
 * Route: "/provider-app/services"
 */
export default function ProviderServices() {
  const navigate = useNavigate()
  const { services, providers } = useProviderData()
  const provider = providers.find((p) => p.id === CURRENT_PROVIDER_ID)!
  const myServices = services.filter((s) => provider.serviceIds.includes(s.id))

  return (
    <div className="flex min-h-screen bg-cream-base">
      <ProviderSidebar />

      <AnimatedMain className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-arabic text-2xl font-bold text-primary-pink">خدماتي</h1>
          <m.button
            {...pressable}
            type="button"
            onClick={() => navigate('/provider-app/services/new')}
            className="shrink-0 rounded-full bg-primary-pink px-4 py-2.5 shadow-md shadow-primary-pink/20 font-arabic text-sm font-semibold text-pure-white"
          >
            + إضافة خدمة
          </m.button>
        </div>

        {myServices.length === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl bg-pure-white shadow-sm px-6 py-12 text-center">
            <p className="font-arabic text-sm font-semibold text-charcoal-text">
              لا توجد خدمات بعد
            </p>
            <p className="font-arabic text-xs text-charcoal-text/60">
              أضف أول خدمة لتبدأ استقبال طلبات الحجز
            </p>
          </div>
        ) : (
          <div className="mt-6 flex max-w-md flex-col gap-3">
            {myServices.map((s) => (
              <ProviderServiceCard
                key={s.id}
                service={s}
                categoryLabel={categories.find((c) => c.id === s.categoryId)?.label ?? ''}
              />
            ))}
          </div>
        )}
      </AnimatedMain>
    </div>
  )
}
