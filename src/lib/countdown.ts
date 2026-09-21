import type { TFunction } from 'i18next'
import { daysUntil } from './events'

/** "Today" / "Tomorrow" / "In N days" / "Past" for an event date (common:countdown.*). */
export function countdownLabel(t: TFunction, isoDate: string) {
  const days = daysUntil(isoDate)
  if (days < 0) return t('common:countdown.past')
  if (days === 0) return t('common:countdown.today')
  return t('common:countdown.inDays', { count: days })
}
