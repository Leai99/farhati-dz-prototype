import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

/** Customer App — Screen 2/15 (Section 5.A): Welcome / Onboarding. Route: "/onboarding" */
export default function WelcomeOnboarding() {
  const navigate = useNavigate()
  const { t } = useTranslation(['onboarding', 'common'])

  return (
    <main className="flex min-h-full flex-col items-center justify-between bg-cream-base px-6 py-16 text-center">
      <div aria-hidden="true" />

      <div className="flex flex-col items-center gap-4">
        <div className="relative mb-2 h-48 w-48 overflow-hidden rounded-[2rem] shadow-lg">
          <img
            src="/images/hero.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-primary-pink/30 to-transparent"
          />
        </div>
        <h1 className="font-arabic text-2xl font-bold text-primary-pink">{t('title')}</h1>
        <p className="max-w-sm font-arabic text-base leading-relaxed text-charcoal-text/80">
          {t('body')}
        </p>
      </div>

      <div className="w-full max-w-sm">
        <Button onClick={() => navigate('/login')}>{t('common:startNow')}</Button>
      </div>
    </main>
  )
}
