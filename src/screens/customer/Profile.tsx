import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { setLanguage, type AppLanguage } from '../../i18n'

// Language option labels are intentionally NOT translated — a language
// switcher conventionally shows each language's name in its own native
// script regardless of the currently active UI language (so "Français"
// always reads as "Français", even while the UI is in Arabic or English).
const languages: { code: AppLanguage; label: string }[] = [
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
]

/** Customer App — Screen 15/15 (Section 5.A): Profile / Settings. Route: "/profile" */
export default function Profile() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation(['profile', 'mockData'])
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const userName = t('mockData:currentUser.name')
  const userTitle = t('mockData:currentUser.title')

  return (
    <main className="min-h-full bg-cream-base px-6 pb-28 pt-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-wine-primary font-arabic text-2xl font-semibold text-pure-white">
          {userName.charAt(0)}
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="font-arabic text-xl font-semibold text-charcoal-text">{userName}</h1>
          <p className="font-arabic text-sm text-charcoal-text/60">{userTitle}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <section className="flex flex-col gap-3 rounded-3xl bg-pure-white shadow-sm p-4 text-start">
          <h2 className="font-arabic text-sm font-semibold text-charcoal-text">
            {t('languageHeading')}
          </h2>
          <div className="flex gap-2">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLanguage(l.code)}
                className={`flex-1 rounded-xl border px-3 py-2 font-arabic text-sm transition-colors ${
                  i18n.language === l.code
                    ? 'border-wine-primary bg-wine-primary text-pure-white'
                    : 'border-muted-rose/30 bg-cream-base text-charcoal-text'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-between rounded-3xl bg-pure-white shadow-sm p-4">
          <span className="font-arabic text-sm font-medium text-charcoal-text">
            {t('notificationsToggle')}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={notificationsEnabled}
            aria-label={t('notificationsToggle')}
            onClick={() => setNotificationsEnabled((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              notificationsEnabled ? 'bg-wine-primary' : 'bg-muted-rose/30'
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute top-0.5 start-0.5 h-5 w-5 rounded-full bg-pure-white shadow transition-transform duration-200 ${
                notificationsEnabled ? 'translate-x-5 rtl:-translate-x-5' : ''
              }`}
            />
          </button>
        </section>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="rounded-full border border-wine-primary px-6 py-3 font-arabic text-sm font-semibold text-wine-primary"
        >
          {t('logout')}
        </button>
      </div>

    </main>
  )
}
