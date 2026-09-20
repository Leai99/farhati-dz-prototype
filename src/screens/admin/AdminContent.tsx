import { useState } from 'react'
import AdminPreviewBanner from '../../components/AdminPreviewBanner'
import AdminSidebar from '../../components/AdminSidebar'
import Badge from '../../components/Badge'
import EmptyState from '../../components/EmptyState'
import { ListIcon } from '../../components/icons'
import { useProviderData } from '../../context/ProviderDataContext'
import { categories } from '../../mock-data/services'

type ModerationStatus = 'approved' | 'pending' | 'flagged'

/** Seeded per known seed service id; any service added later (e.g. via the
 * Provider App this session) defaults to "pending" — see statusOf below. */
const INITIAL_STATUSES: Record<string, ModerationStatus> = {
  s1: 'approved',
  s2: 'approved',
  s3: 'approved',
  s4: 'approved',
  s5: 'approved',
  s6: 'approved',
  s7: 'approved',
  s8: 'approved',
  s9: 'approved',
  s10: 'pending',
  s11: 'approved',
  s12: 'flagged',
}

const statusLabel: Record<ModerationStatus, string> = {
  approved: 'معتمدة',
  pending: 'قيد المراجعة',
  flagged: 'مبلّغ عنها',
}
const statusTone: Record<ModerationStatus, 'positive' | 'warning' | 'neutral'> = {
  approved: 'positive',
  pending: 'warning',
  flagged: 'neutral',
}

const tabs: { id: ModerationStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'approved', label: 'معتمدة' },
  { id: 'pending', label: 'قيد المراجعة' },
  { id: 'flagged', label: 'مبلّغ عنها' },
]

/**
 * Admin App — Screen 4/6 (Section 5.C): Content moderation.
 * Route: "/admin/content"
 *
 * Moderation status is admin-only and doesn't exist on the shared Service
 * type, so it's kept as a local map here (seeded per known service id)
 * rather than adding a field to services.ts that every other screen would
 * have to account for.
 */
export default function AdminContent() {
  const { services } = useProviderData()
  const [statuses, setStatuses] = useState<Record<string, ModerationStatus>>(INITIAL_STATUSES)
  const [activeTab, setActiveTab] = useState<ModerationStatus | 'all'>('all')

  function statusOf(id: string): ModerationStatus {
    return statuses[id] ?? 'pending'
  }

  function setStatus(id: string, status: ModerationStatus) {
    setStatuses((current) => ({ ...current, [id]: status }))
  }

  const visible =
    activeTab === 'all' ? services : services.filter((s) => statusOf(s.id) === activeTab)

  return (
    <div className="flex min-h-screen flex-col bg-cream-base">
      <AdminPreviewBanner />

      <div className="flex flex-1">
        <AdminSidebar />

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <h1 className="font-arabic text-2xl font-bold text-wine-primary">المحتوى</h1>

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

        {visible.length === 0 ? (
          <EmptyState
            className="mt-6 max-w-2xl"
            icon={<ListIcon className="h-6 w-6" />}
            title="لا توجد خدمات في هذا التصنيف"
            action={
              activeTab !== 'all'
                ? { label: 'عرض كل الخدمات', onClick: () => setActiveTab('all'), variant: 'link' }
                : undefined
            }
          />
        ) : (
          <div className="mt-6 flex max-w-2xl flex-col gap-3">
            {visible.map((s) => {
              const status = statusOf(s.id)
              const categoryLabel = categories.find((c) => c.id === s.categoryId)?.label ?? ''
              return (
                <div
                  key={s.id}
                  className="flex flex-col gap-3 rounded-3xl bg-pure-white p-4 text-right shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-arabic text-sm font-semibold text-charcoal-text">
                        {s.name}
                      </span>
                      <span className="font-arabic text-xs text-charcoal-text/60">
                        {categoryLabel}
                      </span>
                    </div>
                    <Badge tone={statusTone[status]}>{statusLabel[status]}</Badge>
                  </div>

                  <div className="flex gap-2">
                    {status !== 'approved' && (
                      <button
                        type="button"
                        onClick={() => setStatus(s.id, 'approved')}
                        className="flex-1 rounded-full bg-wine-primary px-4 py-2 font-arabic text-sm font-semibold text-pure-white"
                      >
                        اعتماد
                      </button>
                    )}
                    {status !== 'flagged' && (
                      <button
                        type="button"
                        onClick={() => setStatus(s.id, 'flagged')}
                        className="flex-1 rounded-full border border-wine-primary px-4 py-2 font-arabic text-sm font-semibold text-wine-primary"
                      >
                        إبلاغ
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
    </div>
  )
}
