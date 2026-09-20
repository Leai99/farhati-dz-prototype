import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import BottomNav from '../../components/BottomNav'
import EmptyState from '../../components/EmptyState'
import { BellIcon, CalendarIcon, InfoIcon, MessageIcon } from '../../components/icons'
import { notifications, type AppNotification } from '../../mock-data/notifications'

const kindIcon: Record<AppNotification['kind'], (props: { className?: string }) => ReactElement> = {
  booking: CalendarIcon,
  message: MessageIcon,
  reminder: BellIcon,
  system: InfoIcon,
}

/** Customer App — Screen 14/15 (Section 5.A): Notifications. Route: "/notifications" */
export default function Notifications() {
  const { t } = useTranslation(['notifications', 'mockData'])

  return (
    <main className="min-h-screen bg-cream-base px-6 pb-28 pt-10">
      <h1 className="text-start font-arabic text-2xl font-bold text-wine-primary">
        {t('title')}
      </h1>

      <div className="mt-6 flex flex-col gap-3">
        {notifications.length === 0 && (
          <EmptyState
            icon={<BellIcon className="h-6 w-6" />}
            title={t('empty.title')}
            description={t('empty.description')}
          />
        )}
        {notifications.map((n) => {
          const NotifIcon = kindIcon[n.kind]
          return (
            <div
              key={n.id}
              className={`flex items-start gap-3 rounded-3xl p-4 text-start ${
                n.read ? 'bg-pure-white shadow-sm' : 'border border-warm-gold/40 bg-warm-gold/10'
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-2 h-2 w-2 shrink-0 rounded-full bg-wine-primary ${
                  n.read ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wine-primary/10 text-wine-primary">
                <NotifIcon className="h-5 w-5" />
              </span>
              <div className="flex flex-1 flex-col gap-1">
                <p
                  className={`font-arabic text-sm ${
                    n.read ? 'text-charcoal-text/80' : 'font-semibold text-charcoal-text'
                  }`}
                >
                  {t(`mockData:notifications.${n.id}.title`)}
                </p>
                <span className="font-arabic text-xs text-charcoal-text/50">
                  {t(`mockData:notifications.${n.id}.time`)}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <BottomNav />
    </main>
  )
}
