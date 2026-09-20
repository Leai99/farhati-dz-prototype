import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../../components/BottomNav'
import { HeartIcon } from '../../components/icons'

function ForwardArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 rtl:rotate-180"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

/**
 * Customer App — Screen 5/15 (Section 5.A): Home. Route: "/home"
 *
 * The "Event Card" signature element (Section 4) doubles as the entry point
 * into event creation: since no event exists yet at this point in the flow,
 * the card itself is the "start a new event" CTA rather than a fabricated
 * sample event.
 */
export default function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation(['home', 'common'])

  return (
    <main className="flex min-h-screen flex-col gap-8 bg-cream-base px-6 pb-28 pt-10">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 text-start">
          <h1 className="font-arabic text-2xl font-bold text-wine-primary">{t('greeting')}</h1>
          <p className="font-arabic text-sm text-charcoal-text/70">{t('subtitle')}</p>
        </div>

        {/* Favorites isn't one of the 5 bottom-nav tabs (Section 4 lists
            only Home/Explore/My Event/Notifications/Profile), so this stays
            as its only entry point rather than being replaced by the nav. */}
        <button
          type="button"
          onClick={() => navigate('/favorites')}
          aria-label={t('favoritesAria')}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-rose/30 bg-pure-white text-wine-primary"
        >
          <HeartIcon className="h-5 w-5" />
        </button>
      </header>

      {/* Signature Event Card — wine base with a soft gold gradient glow at the edges */}
      <button
        type="button"
        onClick={() => navigate('/select-event-type')}
        className="group relative w-full overflow-hidden rounded-3xl bg-wine-primary p-6 text-start shadow-md transition-colors hover:bg-wine-primary/95"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-warm-gold/40 blur-2xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-warm-gold/30 blur-2xl"
        />

        <div className="relative flex flex-col gap-3">
          <p className="font-arabic text-lg font-semibold text-pure-white">
            {t('eventCard.title')}
          </p>
          <p className="font-arabic text-sm leading-relaxed text-pure-white/80">
            {t('eventCard.body')}
          </p>
          <span className="mt-1 inline-flex items-center gap-1.5 self-start font-arabic text-sm font-semibold text-warm-gold">
            {t('common:startNow')}
            <ForwardArrow />
          </span>
        </div>
      </button>

      <BottomNav />
    </main>
  )
}
