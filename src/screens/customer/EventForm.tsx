import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import EventTypeIcon from '../../components/EventTypeIcon'
import TextField from '../../components/TextField'
import { useEvents } from '../../context/EventsContext'
import { EVENT_TYPES, todayIso, type EventType } from '../../lib/events'

const NAME_MAX = 60

interface FormState {
  /** Preselected on arrival from Select Event Type. */
  eventType?: EventType
  /** Service to add once the event exists (arrival from Service Details with no events yet). */
  addServiceId?: string
}

interface FormErrors {
  name?: string
  date?: string
  eventType?: string
}

/**
 * Customer App — New event form. Route: "/events/new"
 *
 * Name + date + event type. The type picker reuses Select Event Type's
 * five tiles and icons inline, so creating an event is a single screen.
 * On submit the event is created and the user lands in its detail view
 * (history is replaced, so Back from there doesn't reopen a filled form).
 */
export default function EventForm() {
  const navigate = useNavigate()
  const state = (useLocation().state as FormState | null) ?? {}
  const { createEvent } = useEvents()
  const { t } = useTranslation(['eventForm', 'eventType', 'mockData'])

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [eventType, setEventType] = useState<EventType | undefined>(state.eventType)
  const [errors, setErrors] = useState<FormErrors>({})

  const minDate = todayIso()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: FormErrors = {}
    if (!name.trim()) next.name = t('errors.nameRequired')
    if (!date) next.date = t('errors.dateRequired')
    else if (date < minDate) next.date = t('errors.datePast')
    if (!eventType) next.eventType = t('errors.typeRequired')
    setErrors(next)
    if (Object.keys(next).length > 0 || !eventType) return

    const event = createEvent({ name, date, eventType }, state.addServiceId ? [state.addServiceId] : [])
    navigate(`/event/${event.id}`, { replace: true })
  }

  return (
    <main className="flex min-h-full flex-col bg-cream-base px-6 py-6">
      <BackButton />

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 pt-4">
        <div className="flex flex-col gap-2 text-start">
          <h1 className="font-arabic text-2xl font-bold text-primary-pink">{t('title')}</h1>
          <p className="font-arabic text-sm text-charcoal-text/70">{t('subtitle')}</p>
        </div>

        {state.addServiceId && (
          <p className="rounded-xl border border-warm-gold/40 bg-warm-gold/10 px-4 py-3 text-start font-arabic text-xs leading-relaxed text-charcoal-text">
            {t('pendingService', { service: t(`mockData:services.${state.addServiceId}.name`) })}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <TextField
            id="event-name"
            label={t('nameLabel')}
            placeholder={t('namePlaceholder')}
            maxLength={NAME_MAX}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
          <TextField
            id="event-date"
            type="date"
            label={t('dateLabel')}
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={errors.date}
          />

          <fieldset className="flex flex-col gap-2 text-start">
            <legend className="mb-2 font-arabic text-sm font-medium text-charcoal-text">{t('typeLabel')}</legend>
            <div role="radiogroup" aria-label={t('typeLabel')} className="grid grid-cols-2 gap-3">
              {EVENT_TYPES.map((type) => {
                const selected = eventType === type
                return (
                  <button
                    key={type}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      setEventType(type)
                      setErrors((prev) => ({ ...prev, eventType: undefined }))
                    }}
                    className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-start shadow-sm transition-colors ${
                      type === 'other' ? 'col-span-2' : ''
                    } ${
                      selected
                        ? 'border-primary-pink bg-primary-pink/5'
                        : 'border-muted-rose/30 bg-pure-white hover:border-primary-pink'
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-gold/15 text-primary-pink">
                      <EventTypeIcon type={type} className="h-5 w-5" />
                    </span>
                    <span className="font-arabic text-sm font-medium text-charcoal-text">
                      {t(`eventType:types.${type}`)}
                    </span>
                  </button>
                )
              })}
            </div>
            {errors.eventType && (
              <span className="font-arabic text-xs font-medium text-muted-rose">{errors.eventType}</span>
            )}
          </fieldset>

          <Button type="submit" className="mt-2">
            {t('submit')}
          </Button>
        </form>
      </div>
    </main>
  )
}
