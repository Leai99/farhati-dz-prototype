import { useRef, useState } from 'react'
import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { usePageTransition } from '../../lib/motion'

/**
 * Onboarding steps. Photos reuse the app's bundled, event-neutral set (no
 * wedding/graduation/birthday imagery, per Section 2): sparklers (the
 * original onboarding photo), a set table (decor) and a camera with prints
 * (photography).
 */
const steps = [
  { key: 'explore', image: '/images/hero.jpg' },
  { key: 'plan', image: '/images/decor.jpg' },
  { key: 'connect', image: '/images/photography.jpg' },
] as const

/** Minimum horizontal finger travel (px) that counts as a swipe. */
const SWIPE_THRESHOLD = 50

/** Customer App — Screen 2/15 (Section 5.A): Welcome / Onboarding. Route: "/onboarding" */
export default function WelcomeOnboarding() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation(['onboarding', 'common'])
  const [stepIndex, setStepIndex] = useState(0)
  // Same fade + direction-aware slide as page changes, re-run per step.
  const stepTransition = usePageTransition()
  const swipeStartX = useRef<number | null>(null)

  const step = steps[stepIndex]
  const isLast = stepIndex === steps.length - 1
  const goToLogin = () => navigate('/login')
  const goTo = (i: number) => setStepIndex(Math.min(Math.max(i, 0), steps.length - 1))

  // Swipe toward the reading direction's "next" side: in RTL the next step
  // lies to the left, so dragging content rightward advances (and vice versa).
  const onSwipeEnd = (endX: number) => {
    if (swipeStartX.current === null) return
    const dx = endX - swipeStartX.current
    swipeStartX.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    const forward = i18n.dir() === 'rtl' ? dx > 0 : dx < 0
    goTo(stepIndex + (forward ? 1 : -1))
  }

  return (
    <main className="flex min-h-full flex-col items-center justify-between bg-cream-base px-6 pb-16 pt-6 text-center">
      {/* Skip — top end corner (top-left in Arabic), on every step */}
      <div className="flex w-full justify-end">
        <button
          type="button"
          onClick={goToLogin}
          className="rounded-full px-3 py-1.5 font-arabic text-sm text-charcoal-text/60 hover:text-primary-pink"
        >
          {t('skip')}
        </button>
      </div>

      <m.div
        key={step.key}
        {...stepTransition}
        onPointerDown={(e) => {
          swipeStartX.current = e.clientX
        }}
        onPointerUp={(e) => onSwipeEnd(e.clientX)}
        onPointerCancel={() => {
          swipeStartX.current = null
        }}
        className="flex touch-pan-y select-none flex-col items-center gap-4"
      >
        <div className="relative mb-2 h-48 w-48 overflow-hidden rounded-[2rem] shadow-lg">
          <img src={step.image} alt="" draggable={false} className="h-full w-full object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-primary-pink/30 to-transparent"
          />
        </div>
        <h1 className="font-arabic text-2xl font-bold text-primary-pink">
          {t(`steps.${step.key}.title`)}
        </h1>
        <p className="max-w-sm font-arabic text-base leading-relaxed text-charcoal-text/80">
          {t(`steps.${step.key}.body`)}
        </p>
      </m.div>

      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        {/* Progress dots — flex follows the document direction, so step 1
            sits on the right in Arabic and on the left in EN/FR. */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t('stepOf', { current: i + 1, total: steps.length })}
              aria-current={i === stepIndex ? 'step' : undefined}
              className={`h-2 rounded-full motion-safe:transition-all motion-safe:duration-200 ${
                i === stepIndex ? 'w-6 bg-primary-pink' : 'w-2 bg-muted-rose/40'
              }`}
            />
          ))}
        </div>

        <Button onClick={isLast ? goToLogin : () => goTo(stepIndex + 1)}>
          {isLast ? t('common:startNow') : t('next')}
        </Button>
      </div>
    </main>
  )
}
