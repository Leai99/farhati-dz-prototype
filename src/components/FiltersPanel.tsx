import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ServiceCategory } from '../mock-data/services'
import { CloseIcon, StarIcon } from './icons'
import { m } from 'framer-motion'
import { pressable } from '../lib/motion'

export interface FiltersState {
  categoryIds: string[]
  maxPrice: number
  minRating: number
}

interface FiltersPanelProps {
  open: boolean
  onClose: () => void
  categories: readonly ServiceCategory[]
  priceCeiling: number
  applied: FiltersState
  onApply: (filters: FiltersState) => void
}

/**
 * Filters bottom sheet for /explore.
 *
 * Chosen as a bottom sheet (not a left/right slide-in panel) specifically to
 * sidestep RTL slide-direction ambiguity — it only ever moves along the
 * vertical axis, so there's no "which side" question to get wrong. This
 * held up unchanged when adding i18n/RTL-LTR switching: a vertical
 * translate-y slide has no direction to flip.
 *
 * Edits are provisional: the sheet works on a local draft seeded from the
 * currently applied filters each time it opens, and only commits back to
 * Explore when "تطبيق الفلاتر" is pressed.
 */
export default function FiltersPanel({
  open,
  onClose,
  categories,
  priceCeiling,
  applied,
  onApply,
}: FiltersPanelProps) {
  const [draft, setDraft] = useState<FiltersState>(applied)
  const { t } = useTranslation(['filters', 'mockData', 'common'])

  useEffect(() => {
    if (open) setDraft(applied)
  }, [open, applied])

  function toggleCategory(id: string) {
    setDraft((d) => ({
      ...d,
      categoryIds: d.categoryIds.includes(id)
        ? d.categoryIds.filter((c) => c !== id)
        : [...d.categoryIds, id],
    }))
  }

  function reset() {
    setDraft({ categoryIds: [], maxPrice: priceCeiling, minRating: 0 })
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-charcoal-text/40 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('dialogAria')}
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream-base p-6 shadow-lg transition-transform duration-300 ${
          open ? 'translate-y-0' : 'pointer-events-none translate-y-full'
        }`}
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-muted-rose/30" aria-hidden="true" />

        <div className="flex items-center justify-between">
          <h2 className="font-arabic text-lg font-semibold text-primary-pink">{t('title')}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('closeAria')}
            className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-text hover:bg-muted-rose/10"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <section className="flex flex-col gap-3 text-start">
            <h3 className="font-arabic text-sm font-semibold text-charcoal-text">
              {t('categoryHeading')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const active = draft.categoryIds.includes(c.id)
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCategory(c.id)}
                    className={`rounded-full border px-4 py-2 font-arabic text-sm transition-colors ${
                      active
                        ? 'border-primary-pink bg-primary-pink text-pure-white'
                        : 'border-muted-rose/30 bg-pure-white text-charcoal-text'
                    }`}
                  >
                    {t(`mockData:categories.${c.id}.label`)}
                  </button>
                )
              })}
            </div>
          </section>

          <section className="flex flex-col gap-3 text-start">
            <h3 className="font-arabic text-sm font-semibold text-charcoal-text">
              {t('maxPriceHeading', {
                price: draft.maxPrice.toLocaleString('en-US'),
                currency: t('common:currency'),
              })}
            </h3>
            <input
              type="range"
              min={0}
              max={priceCeiling}
              step={5000}
              value={draft.maxPrice}
              onChange={(e) => setDraft((d) => ({ ...d, maxPrice: Number(e.target.value) }))}
              className="w-full accent-primary-pink"
              aria-label={t('maxPriceAria')}
            />
          </section>

          <section className="flex flex-col gap-3 text-start">
            <h3 className="font-arabic text-sm font-semibold text-charcoal-text">
              {t('minRatingHeading')}
            </h3>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={t('starAria', { count: star })}
                  onClick={() =>
                    setDraft((d) => ({ ...d, minRating: d.minRating === star ? 0 : star }))
                  }
                  className="p-0.5"
                >
                  <StarIcon
                    className={`h-6 w-6 ${
                      star <= draft.minRating ? 'text-warm-gold' : 'text-muted-rose/30'
                    }`}
                    filled={star <= draft.minRating}
                  />
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 flex gap-3">
          <m.button
            {...pressable}
            type="button"
            onClick={reset}
            className="flex-1 rounded-full border border-primary-pink px-6 py-3 font-arabic text-sm font-semibold text-primary-pink"
          >
            {t('reset')}
          </m.button>
          <m.button
            {...pressable}
            type="button"
            onClick={() => {
              onApply(draft)
              onClose()
            }}
            className="flex-1 rounded-full bg-primary-pink px-6 py-3 shadow-md shadow-primary-pink/20 font-arabic text-sm font-semibold text-pure-white"
          >
            {t('apply')}
          </m.button>
        </div>
      </div>
    </>
  )
}
