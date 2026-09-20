import type { ReactElement, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { categories } from '../../mock-data/services'

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

// Same neutral line-icon style/tokens as Event Type Selection — one icon per
// service category, all rendered at equal size and weight.
const VenueIcon = () => (
  <Icon>
    <rect x="4" y="9" width="16" height="11" rx="1" />
    <path d="M9 20v-5h6v5" />
    <path d="M4 9l8-5 8 5" />
  </Icon>
)

const CameraIcon = () => (
  <Icon>
    <rect x="3.5" y="7" width="17" height="12" rx="2" />
    <circle cx="12" cy="13" r="3.5" />
    <path d="M8 7l1.5-2.5h5L16 7" />
  </Icon>
)

const BrushIcon = () => (
  <Icon>
    <path d="M14 4 20 10 11 19a3 3 0 0 1-4.2 0L6.5 18.7a3 3 0 0 1 0-4.2Z" />
    <path d="M9 15l-3 3" />
  </Icon>
)

const UtensilsIcon = () => (
  <Icon>
    <path d="M7 3v7a2 2 0 0 0 4 0V3" />
    <path d="M9 10v11" />
    <path d="M16 3c-1.5 0-2.5 1.8-2.5 4s1 4 2.5 4v10" />
  </Icon>
)

const MusicIcon = () => (
  <Icon>
    <path d="M9 18V5l10-2v13" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="16" r="2.5" />
  </Icon>
)

const EnvelopeIcon = () => (
  <Icon>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
    <path d="M4 6.5 12 13l8-6.5" />
  </Icon>
)

const MirrorIcon = () => (
  <Icon>
    <circle cx="12" cy="10" r="6" />
    <path d="M12 16v6" />
    <path d="M9 22h6" />
  </Icon>
)

const ClipboardIcon = () => (
  <Icon>
    <rect x="6" y="4" width="12" height="17" rx="1.5" />
    <rect x="9" y="2.5" width="6" height="3" rx="1" />
    <path d="M9 11h6" />
    <path d="M9 15h4" />
  </Icon>
)

const categoryIcons: Record<string, () => ReactElement> = {
  venues: VenueIcon,
  photography: CameraIcon,
  decor: BrushIcon,
  catering: UtensilsIcon,
  music: MusicIcon,
  invitations: EnvelopeIcon,
  beauty: MirrorIcon,
  planning: ClipboardIcon,
}

/**
 * Customer App — Screen 8/15 (Section 5.A): Categories. Route: "/categories"
 *
 * Fuller category browsing grid than the Explore chip row. Tapping a tile
 * navigates back to /explore with that category preselected as the active
 * filter (replacing this entry so Explore's back button still lands on
 * Home, not here).
 */
export default function Categories() {
  const navigate = useNavigate()
  const { t } = useTranslation(['categories', 'mockData'])

  return (
    <main className="flex min-h-screen flex-col bg-cream-base px-6 py-6">
      <BackButton to="/explore" />

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-8 pt-4">
        <div className="flex flex-col gap-2 text-start">
          <h1 className="font-arabic text-2xl font-bold text-wine-primary">{t('title')}</h1>
          <p className="font-arabic text-sm text-charcoal-text/70">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((c) => {
            const TypeIcon = categoryIcons[c.id]
            return (
              <button
                key={c.id}
                type="button"
                onClick={() =>
                  navigate('/explore', { state: { categoryId: c.id }, replace: true })
                }
                className="flex flex-col items-center gap-3 rounded-3xl border border-muted-rose/30 bg-pure-white px-4 py-5 text-center shadow-sm transition-colors hover:border-wine-primary"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-gold/15 text-wine-primary">
                  {TypeIcon ? <TypeIcon /> : null}
                </span>
                <span className="font-arabic text-sm font-medium text-charcoal-text">
                  {t(`mockData:categories.${c.id}.label`)}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </main>
  )
}
