import { useNavigate } from 'react-router-dom'
import AdminPreviewBanner from '../../components/AdminPreviewBanner'
import AdminSidebar from '../../components/AdminSidebar'
import Badge from '../../components/Badge'
import EmptyState from '../../components/EmptyState'
import { StoreIcon } from '../../components/icons'
import RatingBadge from '../../components/RatingBadge'
import { useProviderData } from '../../context/ProviderDataContext'
import { categories } from '../../mock-data/services'

/**
 * Admin App — Screen 3/6 (Section 5.C): Providers. Route: "/admin/providers"
 *
 * "View detail" reuses the existing public /provider/:id profile instead of
 * a separate inline expand — same provider record, no duplicate detail UI
 * to maintain, and it shows the admin exactly what a customer would see.
 * "Status" is derived (has at least one service → نشط), not invented.
 */
export default function AdminProviders() {
  const navigate = useNavigate()
  const { providers, services } = useProviderData()

  return (
    <div className="flex min-h-screen flex-col bg-cream-base">
      <AdminPreviewBanner />

      <div className="flex flex-1">
        <AdminSidebar />

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <h1 className="font-arabic text-2xl font-bold text-wine-primary">مقدّمو الخدمات</h1>

        {providers.length === 0 ? (
          <EmptyState
            className="mt-6 max-w-2xl"
            icon={<StoreIcon className="h-6 w-6" />}
            title="لا يوجد مقدّمو خدمات بعد"
            description="سيظهرون هنا فور انضمامهم إلى المنصة"
          />
        ) : (
          <div className="mt-6 flex max-w-2xl flex-col gap-2">
            {providers.map((p) => {
              const categoryLabel = categories.find((c) => c.id === p.categoryId)?.label ?? ''
              const serviceCount = services.filter((s) => p.serviceIds.includes(s.id)).length
              const active = serviceCount > 0
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => navigate(`/provider/${p.id}`)}
                  className="flex items-center justify-between gap-3 rounded-3xl bg-pure-white p-4 text-right shadow-sm transition-colors hover:shadow-md"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wine-primary font-arabic text-sm font-semibold text-pure-white">
                      {p.name.charAt(0)}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-arabic text-sm font-semibold text-charcoal-text">
                        {p.name}
                      </span>
                      <span className="font-arabic text-xs text-charcoal-text/60">
                        {categoryLabel} · {serviceCount} خدمات
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <RatingBadge rating={p.rating} />
                    <Badge tone={active ? 'positive' : 'neutral'}>{active ? 'نشط' : 'غير نشط'}</Badge>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </main>
    </div>
    </div>
  )
}
