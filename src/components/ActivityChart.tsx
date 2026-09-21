import { useState } from 'react'
import { formatPrice } from '../lib/serviceDisplay'
import { CURRENT_REQUEST_DAYS_AGO, historicalRequests } from '../mock-data/providerActivityHistory'
import type { ProviderRequest } from '../mock-data/providerRequests'
import type { Service } from '../mock-data/services'

type Range = 7 | 30

const ranges: { days: Range; label: string }[] = [
  { days: 7, label: 'آخر 7 أيام' },
  { days: 30, label: 'آخر 30 يومًا' },
]

const MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
]

function dateOf(daysAgo: number) {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return d
}

/** Full date for tooltips, e.g. "22 سبتمبر". */
function dayLabel(daysAgo: number) {
  const d = dateOf(daysAgo)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

/** Compact axis label, e.g. "22/9" — full month names collide on narrow screens. */
function axisLabel(daysAgo: number) {
  if (daysAgo === 0) return 'اليوم'
  const d = dateOf(daysAgo)
  return `${d.getDate()}/${d.getMonth() + 1}`
}

interface DayBucket {
  daysAgo: number
  total: number
  accepted: number
}

interface ActivityChartProps {
  /** The signed-in provider's live requests (from ProviderDataContext). */
  requests: ProviderRequest[]
  /** Live services, for the estimated-earnings figure. */
  services: Service[]
}

/**
 * Provider Dashboard — requests per day over the last 7 / 30 days.
 *
 * Hand-built CSS bars in the same visual language as Admin Statistics (no
 * charting library). Each bar stacks accepted requests (pink) under the
 * rest (muted rose). Estimated earnings = accepted requests × the midpoint
 * of their service's price range, shown as a summary figure only.
 *
 * Time runs left → right with the most recent day on the right; the bar
 * row is pinned to dir="ltr" so that holds regardless of the page direction.
 */
export default function ActivityChart({ requests, services }: ActivityChartProps) {
  const [range, setRange] = useState<Range>(7)

  const entries = [
    ...historicalRequests,
    ...requests
      .filter((r) => r.id in CURRENT_REQUEST_DAYS_AGO)
      .map((r) => ({ serviceId: r.serviceId, status: r.status, daysAgo: CURRENT_REQUEST_DAYS_AGO[r.id] })),
  ].filter((e) => e.daysAgo < range)

  // Oldest → newest, so with dir="ltr" today lands on the right.
  const buckets: DayBucket[] = Array.from({ length: range }, (_, i) => {
    const daysAgo = range - 1 - i
    const day = entries.filter((e) => e.daysAgo === daysAgo)
    return { daysAgo, total: day.length, accepted: day.filter((e) => e.status === 'accepted').length }
  })
  const maxTotal = Math.max(1, ...buckets.map((b) => b.total))

  const totalRequests = entries.length
  const acceptedCount = entries.filter((e) => e.status === 'accepted').length
  const estimatedEarnings = entries
    .filter((e) => e.status === 'accepted')
    .reduce((sum, e) => {
      const s = services.find((x) => x.id === e.serviceId)
      return sum + (s ? (s.priceFrom + s.priceTo) / 2 : 0)
    }, 0)

  // 7 days: label every bar. 30 days: every 5th day, counted back from today.
  const showLabel = (b: DayBucket) => range === 7 || b.daysAgo % 5 === 0

  return (
    <section className="mt-6 rounded-3xl bg-pure-white p-5 text-right shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-arabic text-sm font-semibold text-charcoal-text">نشاط الطلبات</h2>
        <div className="flex gap-2">
          {ranges.map((r) => (
            <button
              key={r.days}
              type="button"
              onClick={() => setRange(r.days)}
              aria-pressed={range === r.days}
              className={`rounded-full border px-3 py-1.5 font-arabic text-xs transition-colors ${
                range === r.days
                  ? 'border-primary-pink bg-primary-pink text-pure-white'
                  : 'border-muted-rose/30 bg-pure-white text-charcoal-text'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-0.5">
          <dt className="font-arabic text-[11px] text-charcoal-text/60">الطلبات</dt>
          <dd className="font-arabic text-lg font-bold text-primary-pink">{totalRequests}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="font-arabic text-[11px] text-charcoal-text/60">المقبولة</dt>
          <dd className="font-arabic text-lg font-bold text-primary-pink">{acceptedCount}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="font-arabic text-[11px] text-charcoal-text/60">أرباح تقديرية</dt>
          <dd className="font-arabic text-lg font-bold text-primary-pink">
            {formatPrice(Math.round(estimatedEarnings))} <span className="text-xs font-semibold">دج</span>
          </dd>
        </div>
      </dl>

      <div
        role="img"
        aria-label={`الطلبات اليومية خلال ${range === 7 ? 'آخر 7 أيام' : 'آخر 30 يومًا'} — الطلبات: ${totalRequests}، المقبولة: ${acceptedCount}`}
        className="mt-5"
      >
        <div dir="ltr" className={`flex h-32 items-end border-b border-muted-rose/20 ${range === 7 ? 'gap-3' : 'gap-0.5 sm:gap-1'}`}>
          {buckets.map((b) => (
            <div
              key={b.daysAgo}
              title={`${dayLabel(b.daysAgo)} — الطلبات: ${b.total}، المقبولة: ${b.accepted}`}
              className="flex h-full min-w-0 flex-1 flex-col justify-end"
            >
              {b.total === 0 ? (
                <div className="h-0.5 rounded-full bg-muted-rose/20" />
              ) : (
                <div
                  className="flex flex-col justify-end overflow-hidden rounded-t-md motion-safe:transition-[height] motion-safe:duration-300"
                  style={{ height: `${(b.total / maxTotal) * 100}%` }}
                >
                  <div className="bg-muted-rose/40" style={{ flexGrow: b.total - b.accepted }} />
                  <div className="bg-primary-pink" style={{ flexGrow: b.accepted }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div dir="ltr" className={`mt-1.5 flex ${range === 7 ? 'gap-3' : 'gap-0.5 sm:gap-1'}`}>
          {buckets.map((b) => (
            <span
              key={b.daysAgo}
              className="min-w-0 flex-1 whitespace-nowrap text-center font-arabic text-[10px] text-charcoal-text/50"
            >
              {showLabel(b) ? axisLabel(b.daysAgo) : ''}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary-pink" />
          <span className="font-arabic text-xs text-charcoal-text/70">مقبولة</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-rose/40" />
          <span className="font-arabic text-xs text-charcoal-text/70">قيد الانتظار أو مرفوضة</span>
        </div>
      </div>
      <p className="mt-2 font-arabic text-[11px] text-charcoal-text/50">
        الأرباح التقديرية محسوبة من متوسط سعر الخدمة لكل طلب مقبول.
      </p>
    </section>
  )
}
