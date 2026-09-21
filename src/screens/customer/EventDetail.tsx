import { useState } from 'react'
import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import EmptyState from '../../components/EmptyState'
import EventTypeIcon from '../../components/EventTypeIcon'
import { CalendarIcon, CheckIcon, ForwardArrow, SearchIcon } from '../../components/icons'
import ServiceCard from '../../components/ServiceCard'
import { useEvents } from '../../context/EventsContext'
import { countdownLabel } from '../../lib/countdown'
import { EVENT_CHECKLISTS, formatEventDate } from '../../lib/events'
import { liftable } from '../../lib/motion'
import { formatPrice } from '../../lib/serviceDisplay'
import { services } from '../../mock-data/services'

/**
 * Customer App — Event Detail. Route: "/event/:id"
 *
 * Signature Event Card (name, date, countdown) → the event type's category
 * checklist (✓ once a linked service covers the category; unchecked rows
 * open Explore pre-filtered to that category) → the linked services,
 * each removable from this event.
 */
export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getEvent, removeServiceFromEvent, deleteEvent } = useEvents()
  const { t, i18n } = useTranslation(['eventDetail', 'eventType', 'mockData', 'common'])
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  const event = id ? getEvent(id) : undefined

  if (!event) {
    return (
      <main className="flex min-h-full flex-col bg-cream-base px-6 py-6">
        <BackButton to="/my-events" />
        <EmptyState
          className="mt-8"
          icon={<CalendarIcon className="h-6 w-6" />}
          title={t('notFound.title')}
          description={t('notFound.description')}
          action={{ label: t('notFound.cta'), onClick: () => navigate('/my-events') }}
        />
      </main>
    )
  }

  const linkedServices = services.filter((s) => event.linkedServiceIds.includes(s.id))
  const coveredCategories = new Set(linkedServices.map((s) => s.categoryId))
  const checklist = EVENT_CHECKLISTS[event.eventType]
  const doneCount = checklist.filter((c) => coveredCategories.has(c)).length
  const totalMin = linkedServices.reduce((sum, s) => sum + s.priceFrom, 0)
  const totalMax = linkedServices.reduce((sum, s) => sum + s.priceTo, 0)

  function handleDelete() {
    if (!event) return
    deleteEvent(event.id)
    navigate('/my-events', { replace: true })
  }

  return (
    <main className="min-h-full bg-cream-base pb-12">
      <div className="px-4 pt-6">
        {/* Always back to the list: arriving from the create form replaces history. */}
        <BackButton to="/my-events" />
      </div>

      <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-6 pt-2">
        {/* Signature Event Card — same pink + gold edge-glow treatment as Home */}
        <div className="relative overflow-hidden rounded-3xl bg-primary-pink p-6 text-start shadow-md">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-warm-gold/40 blur-2xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-warm-gold/30 blur-2xl"
          />
          <div className="relative flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-pure-white/15 px-2.5 py-1 font-arabic text-xs font-semibold text-pure-white">
                <EventTypeIcon type={event.eventType} className="h-4 w-4" />
                {t(`eventType:types.${event.eventType}`)}
              </span>
              <span className="rounded-full bg-pure-white px-2.5 py-1 font-arabic text-xs font-semibold text-primary-pink">
                {countdownLabel(t, event.date)}
              </span>
            </div>
            <h1 className="font-arabic text-xl font-bold text-pure-white">{event.name}</h1>
            <p className="font-arabic text-sm text-pure-white">{formatEventDate(event.date, i18n.language)}</p>
            {linkedServices.length > 0 && (
              <p className="font-arabic text-xs text-pure-white">
                {t('estimatedBudget')}: {formatPrice(totalMin)}–{formatPrice(totalMax)} {t('common:currency')}
              </p>
            )}
          </div>
        </div>

        {/* Category checklist */}
        <section className="flex flex-col gap-3 text-start">
          <div className="flex items-center justify-between">
            <h2 className="font-arabic text-sm font-semibold text-charcoal-text">{t('checklistTitle')}</h2>
            <span className="font-arabic text-xs font-semibold text-charcoal-text/60">
              {doneCount}/{checklist.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {checklist.map((categoryId) => {
              const label = t(`mockData:categories.${categoryId}.label`)
              return coveredCategories.has(categoryId) ? (
                <div
                  key={categoryId}
                  className="flex items-center gap-3 rounded-2xl bg-pure-white px-4 py-3 shadow-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warm-gold text-charcoal-text">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex-1 font-arabic text-sm font-medium text-charcoal-text">{label}</span>
                  <span className="font-arabic text-[11px] text-charcoal-text/50">{t('checklistDone')}</span>
                </div>
              ) : (
                <m.button
                  {...liftable}
                  key={categoryId}
                  type="button"
                  onClick={() => navigate('/explore', { state: { categoryId } })}
                  className="flex items-center gap-3 rounded-2xl border border-dashed border-muted-rose/50 bg-pure-white/60 px-4 py-3 text-start"
                >
                  <span className="h-6 w-6 shrink-0 rounded-full border-2 border-muted-rose/40" aria-hidden="true" />
                  <span className="flex-1 font-arabic text-sm text-charcoal-text/80">{label}</span>
                  <span className="inline-flex items-center gap-1 font-arabic text-[11px] font-semibold text-primary-pink">
                    <SearchIcon className="h-3.5 w-3.5" />
                    {t('checklistFind')}
                    <ForwardArrow className="h-3 w-3" />
                  </span>
                </m.button>
              )
            })}
          </div>
        </section>

        {/* Linked services */}
        <section className="flex flex-col gap-3 text-start">
          <h2 className="font-arabic text-sm font-semibold text-charcoal-text">{t('servicesTitle')}</h2>
          {linkedServices.length === 0 ? (
            <EmptyState
              icon={<SearchIcon className="h-6 w-6" />}
              title={t('noServices.title')}
              description={t('noServices.description')}
              action={{ label: t('noServices.cta'), onClick: () => navigate('/explore') }}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {linkedServices.map((s) => (
                <ServiceCard
                  key={s.id}
                  service={s}
                  categoryLabel={t(`mockData:categories.${s.categoryId}.label`)}
                  onRemove={() => removeServiceFromEvent(event.id, s.id)}
                  removeLabel={t('removeService')}
                />
              ))}
            </div>
          )}
        </section>

        {/* Delete — two-step inline confirm (no browser dialog) */}
        <div className="flex flex-col items-center gap-2 pt-2">
          {confirmingDelete ? (
            <div className="flex w-full flex-col gap-3 rounded-3xl bg-pure-white p-4 text-center shadow-sm">
              <p className="font-arabic text-sm text-charcoal-text">{t('delete.confirm')}</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 rounded-full bg-primary-pink px-4 py-2.5 font-arabic text-sm font-semibold text-pure-white"
                >
                  {t('delete.yes')}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingDelete(false)}
                  className="flex-1 rounded-full border border-primary-pink px-4 py-2.5 font-arabic text-sm font-semibold text-primary-pink"
                >
                  {t('delete.no')}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="font-arabic text-xs text-charcoal-text/50 underline-offset-4 hover:text-primary-pink hover:underline"
            >
              {t('delete.link')}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
