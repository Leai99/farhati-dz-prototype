import AdminPreviewBanner from '../../components/AdminPreviewBanner'
import AdminSidebar from '../../components/AdminSidebar'
import { useProviderData } from '../../context/ProviderDataContext'
import { categories } from '../../mock-data/services'

/**
 * Admin App — Screen 6/6 (Section 5.C): Statistics. Route: "/admin/statistics"
 *
 * Basic CSS-based bars, not a charting library — keeps both visuals on the
 * existing design tokens exactly rather than inheriting a library's own
 * default palette, and avoids a new dependency for two simple
 * distributions. Both are derived live from ProviderDataContext.
 */
export default function AdminStatistics() {
  const { services, requests } = useProviderData()

  const categoryCounts = categories.map((c) => ({
    label: c.label,
    count: services.filter((s) => s.categoryId === c.id).length,
  }))
  const maxCategoryCount = Math.max(1, ...categoryCounts.map((c) => c.count))

  const statusCounts = [
    {
      id: 'pending',
      label: 'قيد الانتظار',
      count: requests.filter((r) => r.status === 'pending').length,
      className: 'bg-warm-gold',
    },
    {
      id: 'accepted',
      label: 'مقبول',
      count: requests.filter((r) => r.status === 'accepted').length,
      className: 'bg-wine-primary',
    },
    {
      id: 'declined',
      label: 'مرفوض',
      count: requests.filter((r) => r.status === 'declined').length,
      className: 'bg-muted-rose',
    },
  ] as const
  const totalRequests = statusCounts.reduce((sum, s) => sum + s.count, 0) || 1

  return (
    <div className="flex min-h-screen flex-col bg-cream-base">
      <AdminPreviewBanner />

      <div className="flex flex-1">
        <AdminSidebar />

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <h1 className="font-arabic text-2xl font-bold text-wine-primary">الإحصائيات</h1>

        <section className="mt-6 max-w-2xl rounded-3xl bg-pure-white shadow-sm p-5 text-right">
          <h2 className="font-arabic text-sm font-semibold text-charcoal-text">
            توزيع الخدمات حسب الفئة
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            {categoryCounts.map((c) => (
              <div key={c.label} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-arabic text-xs text-charcoal-text/70">{c.label}</span>
                  <span className="font-arabic text-xs font-semibold text-wine-primary">
                    {c.count}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted-rose/15">
                  <div
                    className="h-full rounded-full bg-wine-primary"
                    style={{ width: `${(c.count / maxCategoryCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 max-w-2xl rounded-3xl bg-pure-white shadow-sm p-5 text-right">
          <h2 className="font-arabic text-sm font-semibold text-charcoal-text">
            الطلبات حسب الحالة
          </h2>

          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-muted-rose/15">
            {statusCounts.map((s) => (
              <div
                key={s.id}
                className={s.className}
                style={{ width: `${(s.count / totalRequests) * 100}%` }}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            {statusCounts.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${s.className}`} />
                <span className="font-arabic text-xs text-charcoal-text/70">
                  {s.label}: {s.count}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
    </div>
  )
}
