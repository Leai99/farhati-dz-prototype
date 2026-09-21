import { useEffect, useState } from 'react'
import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'
import BrandMark from '../../components/BrandMark'
import { splashEntrance, splashTextFade } from '../../lib/motion'

/** Where the app continues after the splash. */
const NEXT_ROUTE = '/onboarding'

/** sessionStorage (not localStorage): resets with each new tab / browser session. */
const SPLASH_SEEN_KEY = 'farhati-dz:splash-seen'

function hasSeenSplash() {
  try {
    return sessionStorage.getItem(SPLASH_SEEN_KEY) === '1'
  } catch {
    return false // storage unavailable — just show the splash
  }
}

function markSplashSeen() {
  try {
    sessionStorage.setItem(SPLASH_SEEN_KEY, '1')
  } catch {
    // best-effort only
  }
}

/** Customer App — Screen 1/15 (Section 5.A): Splash Screen. Route: "/" */
export default function SplashScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation(['splash', 'common'])
  // Read once on mount, so marking it seen below doesn't redirect this very view.
  const [seenBefore] = useState(hasSeenSplash)

  // replace: the splash doesn't stay in history, so Back from onboarding
  // leaves the app instead of bouncing off the splash redirect.
  const advance = () => navigate(NEXT_ROUTE, { replace: true })

  // Auto-advance like a real splash screen, but the whole screen is also
  // tappable so the flow doesn't force a wait while clicking through.
  useEffect(() => {
    if (seenBefore) return
    markSplashSeen()
    const timer = setTimeout(() => navigate(NEXT_ROUTE, { replace: true }), 1800)
    return () => clearTimeout(timer)
  }, [navigate, seenBefore])

  // Already shown this session: skip straight on — no wait, no animation.
  if (seenBefore) return <Navigate to={NEXT_ROUTE} replace />

  return (
    <main
      role="button"
      tabIndex={0}
      onClick={advance}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') advance()
      }}
      className="flex min-h-full cursor-pointer flex-col items-center justify-center gap-4 bg-cream-base px-6 text-center outline-none"
    >
      <m.div {...splashEntrance}>
        <BrandMark orientation="stacked" logoClassName="h-64 w-64" />
      </m.div>
      <m.p
        {...splashTextFade}
        className="mt-2 max-w-xs font-arabic text-base leading-relaxed text-charcoal-text/80"
      >
        {t('splash:tagline')}
      </m.p>
      <m.span {...splashTextFade} className="mt-6 font-arabic text-xs text-muted-rose">
        {t('splash:cta')}
      </m.span>
    </main>
  )
}
