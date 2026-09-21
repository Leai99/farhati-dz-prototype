import { useState } from 'react'
import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useEvents } from '../context/EventsContext'
import { formatEventDate, type AppEvent } from '../lib/events'
import { pressable } from '../lib/motion'
import EventTypeIcon from './EventTypeIcon'
import { CalendarIcon, CheckIcon, CloseIcon } from './icons'

interface Feedback {
  kind: 'added' | 'already'
  event: AppEvent
}

/**
 * Service Details — "إضافة إلى مناسبة" (separate from Favorites).
 * - 0 events: opens the new-event form, carrying this service so it's
 *   added as soon as the event is created.
 * - 1 event: adds directly, with an inline confirmation.
 * - 2+ events: bottom-sheet picker (vertical slide — same pattern as the
 *   Explore filters sheet, so there's no left/right direction to get wrong
 *   under RTL).
 */
export default function AddToEventButton({ serviceId }: { serviceId: string }) {
  const navigate = useNavigate()
  const { events, addServiceToEvent } = useEvents()
  const { t, i18n } = useTranslation(['serviceDetails', 'common'])
  const [sheetOpen, setSheetOpen] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  function addTo(event: AppEvent) {
    if (event.linkedServiceIds.includes(serviceId)) {
      setFeedback({ kind: 'already', event })
    } else {
      addServiceToEvent(event.id, serviceId)
      setFeedback({ kind: 'added', event })
    }
    setSheetOpen(false)
  }

  function handleClick() {
    if (events.length === 0) {
      navigate('/events/new', { state: { addServiceId: serviceId } })
    } else if (events.length === 1) {
      addTo(events[0])
    } else {
      setFeedback(null)
      setSheetOpen(true)
    }
  }

  return (
    <>
      <m.button
        {...pressable}
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center gap-2 rounded-full border border-primary-pink bg-transparent px-6 py-3 font-arabic text-sm font-semibold text-primary-pink transition-colors hover:bg-primary-pink/5"
      >
        <CalendarIcon className="h-4 w-4" />
        {t('addToEvent.button')}
      </m.button>

      {feedback && (
        <div
          role="status"
          className="-mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-warm-gold/40 bg-warm-gold/10 px-4 py-3 text-start"
        >
          <span className="font-arabic text-xs leading-relaxed text-charcoal-text">
            {t(feedback.kind === 'added' ? 'addToEvent.added' : 'addToEvent.already', {
              event: feedback.event.name,
            })}
          </span>
          <button
            type="button"
            onClick={() => navigate(`/event/${feedback.event.id}`)}
            className="font-arabic text-xs font-semibold text-primary-pink underline-offset-4 hover:underline"
          >
            {t('addToEvent.viewEvent')}
          </button>
        </div>
      )}

      {/* Event picker bottom sheet (2+ events) */}
      <div
        aria-hidden="true"
        onClick={() => setSheetOpen(false)}
        className={`fixed inset-0 z-40 bg-charcoal-text/40 transition-opacity ${
          sheetOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('addToEvent.pickerTitle')}
        aria-hidden={!sheetOpen}
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream-base p-6 shadow-lg motion-safe:transition-transform motion-safe:duration-300 ${
          sheetOpen ? 'translate-y-0' : 'pointer-events-none translate-y-full'
        }`}
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-muted-rose/30" aria-hidden="true" />
        <div className="flex items-center justify-between">
          <h2 className="font-arabic text-lg font-semibold text-primary-pink">{t('addToEvent.pickerTitle')}</h2>
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            aria-label={t('addToEvent.close')}
            tabIndex={sheetOpen ? 0 : -1}
            className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-text hover:bg-muted-rose/10"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mx-auto mt-5 flex max-w-md flex-col gap-2">
          {events.map((event) => {
            const already = event.linkedServiceIds.includes(serviceId)
            return (
              <button
                key={event.id}
                type="button"
                disabled={already}
                tabIndex={sheetOpen ? 0 : -1}
                onClick={() => addTo(event)}
                className="flex items-center gap-3 rounded-2xl bg-pure-white px-4 py-3 text-start shadow-sm transition-colors enabled:hover:bg-primary-pink/5 disabled:cursor-default"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warm-gold/15 text-primary-pink">
                  <EventTypeIcon type={event.eventType} className="h-5 w-5" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-arabic text-sm font-semibold text-charcoal-text">{event.name}</span>
                  <span className="font-arabic text-xs text-charcoal-text/60">
                    {formatEventDate(event.date, i18n.language)}
                  </span>
                </span>
                {already && (
                  <span className="inline-flex shrink-0 items-center gap-1 font-arabic text-[11px] font-semibold text-charcoal-text/60">
                    <CheckIcon className="h-3 w-3" />
                    {t('addToEvent.alreadyShort')}
                  </span>
                )}
              </button>
            )
          })}

          <button
            type="button"
            tabIndex={sheetOpen ? 0 : -1}
            onClick={() => navigate('/events/new', { state: { addServiceId: serviceId } })}
            className="mt-2 font-arabic text-sm font-semibold text-primary-pink underline-offset-4 hover:underline"
          >
            {t('addToEvent.newEvent')}
          </button>
        </div>
      </div>
    </>
  )
}
