import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

/** Customer App — Screen 1/15 (Section 5.A): Splash Screen. Route: "/" */
export default function SplashScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation(['splash', 'common'])

  // Auto-advance like a real splash screen, but the whole screen is also
  // tappable so the flow doesn't force a wait while clicking through.
  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), 1800)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <main
      role="button"
      tabIndex={0}
      onClick={() => navigate('/onboarding')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') navigate('/onboarding')
      }}
      className="flex min-h-screen cursor-pointer flex-col items-center justify-center gap-4 bg-cream-base px-6 text-center outline-none"
    >
      <h1 className="font-arabic text-4xl font-semibold text-wine-primary">
        {t('common:appName')}
      </h1>
      <p className="max-w-xs font-arabic text-base leading-relaxed text-charcoal-text/80">
        {t('splash:tagline')}
      </p>
      <span className="mt-6 font-arabic text-xs text-muted-rose">{t('splash:cta')}</span>
    </main>
  )
}
