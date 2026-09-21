import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../../components/EmptyState'
import EventTypeIcon from '../../components/EventTypeIcon'
import { CalendarIcon } from '../../components/icons'
import { StaggerItem, StaggerList } from '../../components/Motion'
import { useEvents } from '../../context/EventsContext'
import { countdownLabel } from '../../lib/countdown'
import { EVENT_CHECKLISTS, completedCategories, formatEventDate } from '../../lib/events'
import { liftable, pressable } from '../../lib/motion'
import { services } from '../../mock-data/services'

const categoryOf = (serviceId: string) => services.find((s) => s.id === serviceId)?.categoryId

/** Customer App — My Events ("مناسباتي"). Route: "/my-events" (bottom-nav tab). */
export default function MyEvents() {
  const navigate = useNavigate()
  const { events } = useEvents()
  const { t, i18n } = useTranslation(['myEvents', 'eventType', 'common'])

  return (
    <main className="min-h-full bg-cream-base px-6 pb-28 pt-10">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-start font-arabic text-2xl font-bold text-primary-pink">{t('title')}</h1>
        {events.length > 0 && (
          <m.button
            {...pressable}
            type="button"
            onClick={() => navigate('/events/new')}
            className="shrink-0 rounded-full bg-primary-pink px-4 py-2 font-arabic text-sm font-semibold text-pure-white shadow-md shadow-primary-pink/20"
          >
            {t('newEvent')}
          </m.button>
        )}
      </div>

      {events.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={<CalendarIcon className="h-6 w-6" />}
          title={t('empty.title')}
          description={t('empty.description')}
          action={{ label: t('newEvent'), onClick: () => navigate('/events/new') }}
        />
      ) : (
        <StaggerList className="mt-6 flex flex-col gap-3">
          {events.map((event) => {
            const total = EVENT_CHECKLISTS[event.eventType].length
            const done = completedCategories(event, categoryOf).length
            return (
              <StaggerItem key={event.id}>
                <m.button
                  {...liftable}
                  type="button"
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="flex w-full items-center gap-4 rounded-3xl bg-pure-white p-4 text-start shadow-sm"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-warm-gold/15 text-primary-pink">
                    <EventTypeIcon type={event.eventType} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="truncate font-arabic text-base font-semibold text-charcoal-text">
                      {event.name}
                    </span>
                    <span className="font-arabic text-xs text-charcoal-text/60">
                      {t(`eventType:types.${event.eventType}`)} · {formatEventDate(event.date, i18n.language)}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <div
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={total}
                        aria-valuenow={done}
                        aria-label={t('progressAria')}
                        className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted-rose/20"
                      >
                        <div
                          className="h-full rounded-full bg-primary-pink"
                          style={{ width: `${(done / total) * 100}%` }}
                        />
                      </div>
                      <span className="shrink-0 font-arabic text-[11px] font-semibold text-charcoal-text/60">
                        {done}/{total}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 self-start rounded-full bg-primary-pink/10 px-2.5 py-1 font-arabic text-[11px] font-semibold text-primary-pink">
                    {countdownLabel(t, event.date)}
                  </span>
                </m.button>
              </StaggerItem>
            )
          })}
        </StaggerList>
      )}
    </main>
  )
}
