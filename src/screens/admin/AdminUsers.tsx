import { useMemo, useState } from 'react'
import AdminPreviewBanner from '../../components/AdminPreviewBanner'
import AdminSidebar from '../../components/AdminSidebar'
import Badge from '../../components/Badge'
import EmptyState from '../../components/EmptyState'
import { SearchIcon } from '../../components/icons'
import { adminUsers, type UserStatus } from '../../mock-data/adminUsers'

const statusLabel: Record<UserStatus, string> = { active: 'نشط', suspended: 'موقوف' }
const statusTone: Record<UserStatus, 'positive' | 'neutral'> = {
  active: 'positive',
  suspended: 'neutral',
}

const filters: { id: UserStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'active', label: 'نشط' },
  { id: 'suspended', label: 'موقوف' },
]

/**
 * Admin App — Screen 2/6 (Section 5.C): Users. Route: "/admin/users"
 * Client-side search (name/email) + status filter over the mock user list.
 */
export default function AdminUsers() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim()
    return adminUsers.filter((u) => {
      if (statusFilter !== 'all' && u.status !== statusFilter) return false
      if (q && !u.name.includes(q) && !u.email.includes(q)) return false
      return true
    })
  }, [query, statusFilter])

  const hasActiveFilter = query.trim() !== '' || statusFilter !== 'all'

  function resetFilters() {
    setQuery('')
    setStatusFilter('all')
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream-base">
      <AdminPreviewBanner />

      <div className="flex flex-1">
        <AdminSidebar />

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <h1 className="font-arabic text-2xl font-bold text-wine-primary">المستخدمون</h1>

        <div className="mt-4 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-charcoal-text/40">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث بالاسم أو البريد الإلكتروني"
              className="w-full rounded-full border border-muted-rose/30 bg-pure-white py-2.5 ps-11 pe-4 font-arabic text-sm text-charcoal-text outline-none placeholder:text-charcoal-text/40 focus:border-wine-primary"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setStatusFilter(f.id)}
                className={`shrink-0 rounded-full border px-4 py-2 font-arabic text-sm transition-colors ${
                  statusFilter === f.id
                    ? 'border-wine-primary bg-wine-primary text-pure-white'
                    : 'border-muted-rose/30 bg-pure-white text-charcoal-text'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            className="mt-8 max-w-2xl"
            icon={<SearchIcon className="h-6 w-6" />}
            title="لا يوجد مستخدمون مطابقون"
            description={hasActiveFilter ? 'جرّب تعديل البحث أو الفلتر' : undefined}
            action={
              hasActiveFilter
                ? { label: 'إعادة تعيين الفلاتر', onClick: resetFilters, variant: 'link' }
                : undefined
            }
          />
        ) : (
          <div className="mt-6 flex max-w-2xl flex-col gap-2">
            {filtered.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between gap-3 rounded-3xl bg-pure-white shadow-sm p-4 text-right"
              >
                <div className="flex flex-1 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wine-primary font-arabic text-sm font-semibold text-pure-white">
                    {u.name.charAt(0)}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-arabic text-sm font-semibold text-charcoal-text">
                      {u.name}
                    </span>
                    <span className="font-arabic text-xs text-charcoal-text/60" dir="ltr">
                      {u.email}
                    </span>
                    <span className="font-arabic text-[11px] text-charcoal-text/40">
                      انضم بتاريخ {u.joinedAt}
                    </span>
                  </div>
                </div>
                <Badge tone={statusTone[u.status]}>{statusLabel[u.status]}</Badge>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
    </div>
  )
}
