import type { TFunction } from 'i18next'

/**
 * "days ago" → localized relative time: today, N days, N weeks, N months.
 * Uses the common:time.* keys, which carry full Arabic plural forms
 * (منذ يوم / منذ يومين / منذ 3 أيام / منذ 11 يومًا …).
 */
export function relativeTime(t: TFunction, daysAgo: number) {
  if (daysAgo <= 0) return t('common:time.today')
  if (daysAgo < 7) return t('common:time.daysAgo', { count: daysAgo })
  if (daysAgo < 30) return t('common:time.weeksAgo', { count: Math.floor(daysAgo / 7) })
  return t('common:time.monthsAgo', { count: Math.floor(daysAgo / 30) })
}
