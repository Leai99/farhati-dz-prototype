import { useState } from 'react'
import Badge from '../../components/Badge'
import EmptyState from '../../components/EmptyState'
import { InboxIcon } from '../../components/icons'
import ProviderSidebar from '../../components/ProviderSidebar'
import { useProviderData } from '../../context/ProviderDataContext'
import { CURRENT_PROVIDER_ID } from '../../mock-data/session'
import type { RequestStatus } from '../../mock-data/providerRequests'

const tabs: { id: RequestStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'pending', label: 'قيد الانتظار' },
  { id: 'accepted', label: 'مقبولة' },
  { id: 'declined', label: 'مرفوضة' },
]

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
 * Service Provider App — Screen 7/9 (Section 5.B): Requests/Bookings.
 * Route: "/provider-app/requests"
 */
export default function ProviderRequests() {
  const { requests, services, updateRequestStatus } = useProviderData()
  const [activeTab, setActiveTab] = useState<RequestStatus | 'all'>('all')

  const myRequests = requests.filter((r) => r.providerId === CURRENT_PROVIDER_ID)
  const visibleRequests =
    activeTab === 'all' ? myRequests : myRequests.filter((r) => r.status === activeTab)

  return (
    <div className="flex min-h-screen bg-cream-base">
      <ProviderSidebar />

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <h1 className="font-arabic text-2xl font-bold text-wine-primary">الطلبات</h1>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`shrink-0 rounded-full border px-4 py-2 font-arabic text-sm transition-colors ${
                activeTab === t.id
                  ? 'border-wine-primary bg-wine-primary text-pure-white'
                  : 'border-muted-rose/30 bg-pure-white text-charcoal-text'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {visibleRequests.length === 0 ? (
          <EmptyState
            className="mt-8 max-w-md"
            icon={<InboxIcon className="h-6 w-6" />}
            title="لا توجد طلبات في هذا التصنيف"
            description={
              myRequests.length === 0
                ? 'ستظهر هنا طلبات الحجز الواردة من العملاء'
                : undefined
            }
            action={
              activeTab !== 'all'
                ? { label: 'عرض كل الطلبات', onClick: () => setActiveTab('all'), variant: 'link' }
                : undefined
            }
          />
        ) : (
          <div className="mt-6 flex max-w-md flex-col gap-3">
            {visibleRequests.map((r) => {
              const service = services.find((s) => s.id === r.serviceId)
              return (
                <div
                  key={r.id}
                  className="flex flex-col gap-3 rounded-3xl bg-pure-white p-4 text-right shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
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

                  {r.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateRequestStatus(r.id, 'accepted')}
                        className="flex-1 rounded-full bg-wine-primary px-4 py-2 font-arabic text-sm font-semibold text-pure-white"
                      >
                        قبول
                      </button>
                      <button
                        type="button"
                        onClick={() => updateRequestStatus(r.id, 'declined')}
                        className="flex-1 rounded-full border border-wine-primary px-4 py-2 font-arabic text-sm font-semibold text-wine-primary"
                      >
                        رفض
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
