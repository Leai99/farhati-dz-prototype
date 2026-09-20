import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

const accountTypes = [
  { id: 'customer', key: 'customer', destination: '/home' },
  { id: 'provider', key: 'provider', destination: '/provider-app/onboarding' },
] as const

/**
 * Customer App — Screen 4/15 (Section 5.A): Account Type Selection.
 * Route: "/choose-account-type"
 *
 * Customer → /home. Service Provider → /provider-app/onboarding, the start
 * of the separate Service Provider App (Section 5.B).
 */
export default function AccountTypeSelection() {
  const navigate = useNavigate()
  const { t } = useTranslation('accountType')

  return (
    <main className="flex min-h-screen flex-col bg-cream-base px-6 py-6">
      <BackButton />

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-8">
        <div className="flex flex-col gap-2 text-start">
          <h1 className="font-arabic text-2xl font-bold text-wine-primary">{t('title')}</h1>
          <p className="font-arabic text-sm text-charcoal-text/70">{t('subtitle')}</p>
        </div>

        <div className="flex flex-col gap-4">
          {accountTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => navigate(type.destination)}
              className="flex flex-col gap-1 rounded-3xl border border-warm-gold/40 bg-pure-white px-5 py-4 text-start shadow-sm transition-colors hover:border-wine-primary"
            >
              <span className="font-arabic text-lg font-semibold text-wine-primary">
                {t(`${type.key}.title`)}
              </span>
              <span className="font-arabic text-sm text-charcoal-text/70">
                {t(`${type.key}.description`)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
