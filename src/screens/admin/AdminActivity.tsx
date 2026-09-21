import { useMemo, useState, type ReactElement } from 'react'
import AdminPreviewBanner from '../../components/AdminPreviewBanner'
import AdminSidebar from '../../components/AdminSidebar'
import EmptyState from '../../components/EmptyState'
import { ActivityIcon, InboxIcon, ListIcon, UsersIcon } from '../../components/icons'
import { useProviderData } from '../../context/ProviderDataContext'
import { activityFeed, type ActivityType } from '../../mock-data/adminActivity'
import type { RequestStatus } from '../../mock-data/providerRequests'
import { AnimatedMain } from '../../components/Motion'

type LogType = ActivityType | 'new_request'

interface LogEntry {
  id: string
  type: LogType
  title: string
  time: string
}

const typeLabel: Record<LogType, string> = {
  signup: 'تسجيل جديد',
  new_service: 'خدمة جديدة',
  new_request: 'طلب حجز',
}

const typeIcon: Record<LogType, (props: { className?: string }) => ReactElement> = {
  signup: UsersIcon,
  new_service: ListIcon,
  new_request: InboxIcon,
}

const requestStatusText: Record<RequestStatus, string> = {
  pending: 'بانتظار الرد',
  accepted: 'مقبول',
  declined: 'مرفوض',
}

const tabs: { id: LogType | 'all'; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'signup', label: 'تسجيلات جديدة' },
  { id: 'new_service', label: 'خدمات جديدة' },
  { id: 'new_request', label: 'طلبات حجز' },
]

/**
 * Admin App — Screen 5/6 (Section 5.C): Activity. Route: "/admin/activity"
 *
 * Aggregates providerRequests.ts (all providers, mapped to log entries)
 * with the signup/new-service events from adminActivity.ts — one combined,
 * filterable log rather than two separate lists.
 */
export default function AdminActivity() {
  const { requests, services } = useProviderData()
  const [activeTab, setActiveTab] = useState<LogType | 'all'>('all')

  const combined: LogEntry[] = useMemo(() => {
    const fromRequests: LogEntry[] = requests.map((r) => {
      const service = services.find((s) => s.id === r.serviceId)
      return {
        id: `req-${r.id}`,
        type: 'new_request',
        title: `طلب حجز من ${r.customerName} لخدمة "${service?.name ?? ''}" — ${requestStatusText[r.status]}`,
        time: r.requestedAt,
      }
    })
    return [...activityFeed, ...fromRequests]
  }, [requests, services])

  const visible =
    activeTab === 'all' ? combined : combined.filter((e) => e.type === activeTab)

  return (
    <div className="flex min-h-screen flex-col bg-cream-base">
      <AdminPreviewBanner />

      <div className="flex flex-1">
        <AdminSidebar />

      <AnimatedMain className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <h1 className="font-arabic text-2xl font-bold text-primary-pink">النشاط</h1>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`shrink-0 rounded-full border px-4 py-2 font-arabic text-sm transition-colors ${
                activeTab === t.id
                  ? 'border-primary-pink bg-primary-pink text-pure-white'
                  : 'border-muted-rose/30 bg-pure-white text-charcoal-text'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <EmptyState
            className="mt-6 max-w-2xl"
            icon={<ActivityIcon className="h-6 w-6" />}
            title="لا يوجد نشاط في هذا التصنيف"
            action={
              activeTab !== 'all'
                ? { label: 'عرض كل النشاطات', onClick: () => setActiveTab('all'), variant: 'link' }
                : undefined
            }
          />
        ) : (
          <div className="mt-6 flex max-w-2xl flex-col gap-3">
            {visible.map((e) => {
              const ItemIcon = typeIcon[e.type]
              return (
                <div
                  key={e.id}
                  className="flex items-center gap-3 rounded-3xl bg-pure-white shadow-sm p-4 text-right"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-pink/10 text-primary-pink">
                    <ItemIcon className="h-4 w-4" />
                  </span>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="font-arabic text-sm text-charcoal-text">{e.title}</span>
                    <span className="font-arabic text-[11px] text-charcoal-text/50">{e.time}</span>
                  </div>
                  <span className="shrink-0 font-arabic text-[11px] text-charcoal-text/40">
                    {typeLabel[e.type]}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </AnimatedMain>
    </div>
    </div>
  )
}
