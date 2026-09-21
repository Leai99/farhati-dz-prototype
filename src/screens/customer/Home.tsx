import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ServiceCard from '../../components/ServiceCard'
import { ForwardArrow, HeartIcon, SearchIcon } from '../../components/icons'
import { categoryImage } from '../../lib/serviceDisplay'
import { categories, services } from '../../mock-data/services'

/**
 * Customer App — Screen 5/15 (Section 5.A): Home. Route: "/home"
 *
 * Content-rich landing matching the reference: greeting header, a search
 * entry point into Explore, the signature "start a new event" card, a
 * photo category strip, and a featured-services list. BottomNav is provided
 * by CustomerLayout, so it isn't rendered here.
 */
export default function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation(['home', 'common', 'mockData'])

  // Top-rated services as the "featured" list — no fabricated popularity data.
  const featured = [...services].sort((a, b) => b.rating - a.rating).slice(0, 3)

  return (
    <main className="flex min-h-full flex-col gap-6 bg-cream-base px-6 pb-28 pt-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 text-start">
          <h1 className="font-arabic text-2xl font-bold text-wine-primary">{t('greeting')}</h1>
          <p className="font-arabic text-sm text-charcoal-text/70">{t('subtitle')}</p>
        </div>

        {/* Favorites isn't one of the 5 bottom-nav tabs, so this stays as its
            only entry point. */}
        <button
          type="button"
          onClick={() => navigate('/favorites')}
          aria-label={t('favoritesAria')}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-rose/30 bg-pure-white text-wine-primary"
        >
          <HeartIcon className="h-5 w-5" />
        </button>
      </header>

      {/* Search entry point — opens the full Explore search/filter screen */}
      <button
        type="button"
        onClick={() => navigate('/explore')}
        aria-label={t('searchAria')}
        className="flex items-center gap-3 rounded-full border border-muted-rose/30 bg-pure-white px-5 py-3.5 text-start shadow-sm"
      >
        <SearchIcon className="h-5 w-5 text-charcoal-text/40" />
        <span className="font-arabic text-sm text-charcoal-text/50">{t('searchAria')}</span>
      </button>

      {/* Signature Event Card — wine base with a soft gold gradient glow */}
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

      {/* Category strip — photo tiles, horizontally scrollable */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-arabic text-base font-bold text-charcoal-text">
            {t('categoriesTitle')}
          </h2>
          <button
            type="button"
            onClick={() => navigate('/categories')}
            className="font-arabic text-xs font-semibold text-wine-primary"
          >
            {t('seeAll')}
          </button>
        </div>

        <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => navigate('/explore', { state: { categoryId: c.id } })}
              className="flex w-[76px] shrink-0 flex-col items-center gap-2"
            >
              <span className="flex h-16 w-16 overflow-hidden rounded-2xl shadow-sm">
                <img
                  src={categoryImage(c.id)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="text-center font-arabic text-[11px] leading-tight text-charcoal-text/70">
                {t(`mockData:categories.${c.id}.label`)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured services */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-arabic text-base font-bold text-charcoal-text">
            {t('popularTitle')}
          </h2>
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="font-arabic text-xs font-semibold text-wine-primary"
          >
            {t('seeAll')}
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {featured.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              categoryLabel={t(`mockData:categories.${s.categoryId}.label`)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
