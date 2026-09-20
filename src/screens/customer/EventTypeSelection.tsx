import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

// Neutral, non-literal line icons — deliberately avoid banned imagery from
// Section 2 (no bride/dress, no graduation cap, no birthday cake).
const WeddingIcon = () => (
  <Icon>
    <circle cx="9" cy="14" r="4" />
    <circle cx="15" cy="14" r="4" />
  </Icon>
)

const BirthdayIcon = () => (
  <Icon>
    <rect x="4" y="10" width="16" height="10" rx="1" />
    <path d="M4 14h16" />
    <path d="M12 10V6" />
    <path d="M12 6c-1.4 0-2.5-.9-2.5-2A1.5 1.5 0 0 1 12 2.5c0 1.7 2.5 1.8 2.5 3.5" />
  </Icon>
)

const CertificateIcon = () => (
  <Icon>
    <rect x="5" y="3.5" width="14" height="12" rx="1.5" />
    <path d="M8 7.5h8" />
    <path d="M8 10.5h5" />
    <circle cx="12" cy="18.5" r="2" />
    <path d="M10.3 20.2 9.5 23l2.5-1.3L14.5 23l-.8-2.8" />
  </Icon>
)

const BriefcaseIcon = () => (
  <Icon>
    <rect x="3.5" y="8" width="17" height="11" rx="1.5" />
    <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2" />
    <path d="M3.5 13h17" />
  </Icon>
)

const MoreIcon = () => (
  <Icon>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M17.7 6.3l-2.5 2.5M8.8 15.2l-2.5 2.5" />
  </Icon>
)

const eventTypes = [
  { id: 'wedding', key: 'wedding', icon: WeddingIcon, wide: false },
  { id: 'birthday', key: 'birthday', icon: BirthdayIcon, wide: false },
  { id: 'graduation', key: 'graduation', icon: CertificateIcon, wide: false },
  { id: 'corporate', key: 'corporate', icon: BriefcaseIcon, wide: false },
  { id: 'other', key: 'other', icon: MoreIcon, wide: true },
] as const

/**
 * Customer App — Screen 6/15 (Section 5.A): Event Type Selection.
 * Route: "/select-event-type"
 *
 * All five options render at equal size in the same grid style so no single
 * event type (namely weddings) is visually centered over the others.
 */
export default function EventTypeSelection() {
  const navigate = useNavigate()
  const { t } = useTranslation('eventType')

  return (
    <main className="flex min-h-screen flex-col bg-cream-base px-6 py-6">
      <BackButton />

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-8 pt-4">
        <div className="flex flex-col gap-2 text-start">
          <h1 className="font-arabic text-2xl font-bold text-wine-primary">{t('title')}</h1>
          <p className="font-arabic text-sm text-charcoal-text/70">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {eventTypes.map(({ id, key, icon: TypeIcon, wide }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate('/explore')}
              className={`flex flex-col items-center gap-3 rounded-3xl border border-muted-rose/30 bg-pure-white px-4 py-5 text-center shadow-sm transition-colors hover:border-wine-primary ${
                wide ? 'col-span-2' : ''
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-gold/15 text-wine-primary">
                <TypeIcon />
              </span>
              <span className="font-arabic text-sm font-medium text-charcoal-text">
                {t(`types.${key}`)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
