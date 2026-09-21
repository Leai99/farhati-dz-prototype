import { useNavigate } from 'react-router-dom'
import ActivityChart from '../../components/ActivityChart'
import Badge from '../../components/Badge'
import ProviderSidebar from '../../components/ProviderSidebar'
import StatCard from '../../components/StatCard'
import { InboxIcon, ListIcon, StarIcon } from '../../components/icons'
import { useProviderData } from '../../context/ProviderDataContext'
import { CURRENT_PROVIDER_ID } from '../../mock-data/session'
import type { RequestStatus } from '../../mock-data/providerRequests'
import { AnimatedMain } from '../../components/Motion'

const statusLabel: Record<RequestStatus, string> = {
  pending: 'قيد الانتظار',
  accepted: 'مقبول',
  declined: 'مرفوض',
}

const statusTone: Record<RequestStatus, 'positive' | 'warning' | 'neutral'> = {
  pending: 'warning',
  accepted: 'positive',
  declined: 'neutral',
}

/**
 * Service Provider App — Screen 3/9 (Section 5.B): Dashboard.
 * Route: "/provider-app/dashboard"
 *
 * Reads from ProviderDataContext (not the static mock-data files directly)
 * so its stats stay live with edits made on Services/Requests/Profile
 * within the same session.
 */
export default function ProviderDashboard() {
  const navigate = useNavigate()
  const { services, providers, requests } = useProviderData()
  const provider = providers.find((p) => p.id === CURRENT_PROVIDER_ID)!
  const providerServices = services.filter((s) => provider.serviceIds.includes(s.id))
  const avgRating = providerServices.length
    ? providerServices.reduce((sum, s) => sum + s.rating, 0) / providerServices.length
    : 0
  const myRequests = requests.filter((r) => r.providerId === provider.id)
  const pendingCount = myRequests.filter((r) => r.status === 'pending').length

  return (
    <div className="flex min-h-screen bg-cream-base">
      <ProviderSidebar />

      <AnimatedMain className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <header className="text-right">
          <h1 className="font-arabic text-2xl font-bold text-primary-pink">
            مرحبًا، {provider.name}
          </h1>
          <p className="font-arabic text-sm text-charcoal-text/70">
            إليك نظرة سريعة على نشاطك
          </p>
        </header>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          <StatCard
            label="خدمات نشطة"
            value={String(providerServices.length)}
            icon={<ListIcon className="h-4 w-4" />}
            tone="wine"
          />
          <StatCard
            label="متوسط التقييم"
            value={avgRating.toFixed(1)}
            icon={<StarIcon className="h-4 w-4" />}
            tone="gold"
          />
          <StatCard
            label="طلبات معلّقة"
            value={String(pendingCount)}
            icon={<InboxIcon className="h-4 w-4" />}
            tone="rose"
          />
        </div>

        <ActivityChart requests={myRequests} services={services} />

        <section className="mt-8 flex flex-col gap-3 text-right">
          <div className="flex items-center justify-between">
            <h2 className="font-arabic text-sm font-semibold text-charcoal-text">أحدث الطلبات</h2>
            <button
              type="button"
              onClick={() => navigate('/provider-app/requests')}
              className="font-arabic text-xs font-semibold text-primary-pink underline-offset-4 hover:underline"
            >
              عرض الكل
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {myRequests.map((r) => {
              const service = services.find((s) => s.id === r.serviceId)
              return (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 rounded-3xl bg-pure-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-arabic text-sm font-semibold text-charcoal-text">
                      {r.customerName}
                    </span>
                    <span className="font-arabic text-xs text-charcoal-text/60">
                      {service?.name} · {r.eventDate}
                    </span>
                    <span className="font-arabic text-[11px] text-charcoal-text/40">
                      {r.requestedAt}
                    </span>
                  </div>
                  <Badge tone={statusTone[r.status]}>{statusLabel[r.status]}</Badge>
                </div>
              )
            })}
          </div>
        </section>
      </AnimatedMain>
    </div>
  )
}
