import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import EventTypeIcon from '../../components/EventTypeIcon'
import { EVENT_TYPES } from '../../lib/events'
import { liftable } from '../../lib/motion'

/**
 * Customer App — Screen 6/15 (Section 5.A): Event Type Selection.
 * Route: "/select-event-type"
 *
 * All five options render at equal size in the same grid style so no single
 * event type (namely weddings) is visually centered over the others.
 * Picking a type opens the new-event form with that type preselected.
 */
export default function EventTypeSelection() {
  const navigate = useNavigate()
  const { t } = useTranslation('eventType')

  return (
    <main className="flex min-h-full flex-col bg-cream-base px-6 py-6">
      <BackButton />

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-8 pt-4">
        <div className="flex flex-col gap-2 text-start">
          <h1 className="font-arabic text-2xl font-bold text-primary-pink">{t('title')}</h1>
          <p className="font-arabic text-sm text-charcoal-text/70">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {EVENT_TYPES.map((type) => (
            <m.button
              {...liftable}
              key={type}
              type="button"
              onClick={() => navigate('/events/new', { state: { eventType: type } })}
              className={`flex flex-col items-center gap-3 rounded-3xl border border-muted-rose/30 bg-pure-white px-4 py-5 text-center shadow-sm transition-colors hover:border-primary-pink ${
                type === 'other' ? 'col-span-2' : ''
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-gold/15 text-primary-pink">
                <EventTypeIcon type={type} />
              </span>
              <span className="font-arabic text-sm font-medium text-charcoal-text">
                {t(`types.${type}`)}
              </span>
            </m.button>
          ))}
        </div>
      </div>
    </main>
  )
}
