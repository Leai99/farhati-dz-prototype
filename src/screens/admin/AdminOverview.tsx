import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminPreviewBanner from '../../components/AdminPreviewBanner'
import AdminSidebar from '../../components/AdminSidebar'
import StatCard from '../../components/StatCard'
import { InboxIcon, ListIcon, StoreIcon, UsersIcon } from '../../components/icons'
import { useProviderData } from '../../context/ProviderDataContext'
import { activityFeed, type ActivityType } from '../../mock-data/adminActivity'
import { adminUsers } from '../../mock-data/adminUsers'

const activityIcon: Record<ActivityType, (props: { className?: string }) => ReactElement> = {
  signup: UsersIcon,
  new_service: ListIcon,
}

/**
 * Admin App — Screen 1/6 (Section 5.C): Overview. Route: "/admin/overview"
 *
 * KPIs are derived from the live mock data (adminUsers.length,
 * ProviderDataContext's providers/services/requests), not invented numbers.
 */
export default function AdminOverview() {
  const navigate = useNavigate()
  const { providers, services, requests } = useProviderData()
  const pendingRequestsCount = requests.filter((r) => r.status === 'pending').length

  return (
    <div className="flex min-h-screen flex-col bg-cream-base">
      <AdminPreviewBanner />

      <div className="flex flex-1">
        <AdminSidebar />

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <header className="text-right">
          <h1 className="font-arabic text-2xl font-bold text-wine-primary">نظرة عامة</h1>
          <p className="font-arabic text-sm text-charcoal-text/70">ملخص سريع لحالة المنصة</p>
        </header>

        <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            label="إجمالي المستخدمين"
            value={String(adminUsers.length)}
            icon={<UsersIcon className="h-4 w-4" />}
            tone="wine"
          />
          <StatCard
            label="مقدّمو الخدمات"
            value={String(providers.length)}
            icon={<StoreIcon className="h-4 w-4" />}
            tone="gold"
          />
          <StatCard
            label="الخدمات المنشورة"
            value={String(services.length)}
            icon={<ListIcon className="h-4 w-4" />}
            tone="rose"
          />
          <StatCard
            label="طلبات معلّقة"
            value={String(pendingRequestsCount)}
            icon={<InboxIcon className="h-4 w-4" />}
            tone="wine"
          />
        </div>

        <section className="mt-8 flex max-w-2xl flex-col gap-3 text-right">
          <div className="flex items-center justify-between">
            <h2 className="font-arabic text-sm font-semibold text-charcoal-text">أحدث النشاطات</h2>
            <button
              type="button"
              onClick={() => navigate('/admin/activity')}
              className="font-arabic text-xs font-semibold text-wine-primary underline-offset-4 hover:underline"
            >
              عرض الكل
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {activityFeed.map((a) => {
              const ItemIcon = activityIcon[a.type]
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-3 rounded-3xl bg-pure-white shadow-sm p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wine-primary/10 text-wine-primary">
                    <ItemIcon className="h-4 w-4" />
                  </span>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="font-arabic text-sm text-charcoal-text">{a.title}</span>
                    <span className="font-arabic text-[11px] text-charcoal-text/50">{a.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
    </div>
  )
}
