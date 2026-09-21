/**
 * "My Events" data model + shared helpers.
 *
 * An Event is created by the customer, stored in EventsContext (persisted to
 * localStorage) and holds the services they've added to it. Favorites stay a
 * separate, general-purpose "liked services" list.
 */

export type EventType = 'wedding' | 'birthday' | 'graduation' | 'corporate' | 'other'

/** Same 5 types, same order as Select Event Type. */
export const EVENT_TYPES: EventType[] = ['wedding', 'birthday', 'graduation', 'corporate', 'other']

export interface AppEvent {
  id: string
  name: string
  eventType: EventType
  /** Event day, ISO "YYYY-MM-DD" (local date, no time). */
  date: string
  /** ISO timestamp. */
  createdAt: string
  /** Services added to this event (ids into services.ts). */
  linkedServiceIds: string[]
}

/**
 * Suggested service categories per event type (ids from services.ts's 8
 * categories: venues, photography, decor, catering, music, invitations,
 * beauty, planning). A starting checklist, not a rule — any service can
 * still be added to any event.
 */
export const EVENT_CHECKLISTS: Record<EventType, string[]> = {
  wedding: ['venues', 'catering', 'photography', 'decor', 'music', 'invitations', 'beauty'],
  birthday: ['catering', 'decor', 'music', 'photography', 'invitations'],
  graduation: ['venues', 'catering', 'photography', 'decor'],
  corporate: ['venues', 'catering', 'planning', 'photography'],
  other: ['venues', 'catering', 'photography', 'decor'],
}

/** Categories on the event's checklist that have ≥1 linked service. */
export function completedCategories(
  event: AppEvent,
  serviceCategoryOf: (serviceId: string) => string | undefined,
) {
  const linkedCategories = new Set(event.linkedServiceIds.map(serviceCategoryOf))
  return EVENT_CHECKLISTS[event.eventType].filter((c) => linkedCategories.has(c))
}

function parseLocalDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Today as "YYYY-MM-DD" in local time (for <input type="date" min>). */
export function todayIso() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** Whole days from today to the event day (0 = today, negative = past). */
export function daysUntil(iso: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((parseLocalDate(iso).getTime() - today.getTime()) / 86_400_000)
}

/**
 * "18 أكتوبر 2026" in Arabic (Latin digits + the month names already used in
 * the app's copy), or the locale's long date for EN/FR.
 */
export function formatEventDate(iso: string, language: string) {
  const locale = language === 'ar' ? 'ar-u-nu-latn' : language
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(
    parseLocalDate(iso),
  )
}
