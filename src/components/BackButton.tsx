import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface BackButtonProps {
  /**
   * Optional fixed destination for flows that must always land on a
   * specific screen regardless of how the user arrived (e.g. Explore must
   * always go back to Home, not to whichever screen happened to link into
   * it). Falls back to plain history back (navigate(-1)) when omitted.
   */
  to?: string
}

/**
 * Back navigation icon. Points left by default and mirrors to point right
 * under dir="rtl" via Tailwind's `rtl:` variant — satisfies the spec's
 * "أيقونات الرجوع" mirroring requirement without hardcoding direction.
 */
export default function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  return (
    <button
      type="button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      aria-label={t('back')}
      className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-text transition-colors hover:bg-muted-rose/10"
    >
      <svg
        className="h-5 w-5 rtl:rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  )
}
