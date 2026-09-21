import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { liftable } from '../../lib/motion'
import { categoryImage } from '../../lib/serviceDisplay'
import { categories } from '../../mock-data/services'

/**
 * Customer App — Screen 8/15 (Section 5.A): Categories. Route: "/categories"
 *
 * Fuller category browsing grid than the Explore chip row — photo tiles, one
 * per service category. Tapping a tile navigates back to /explore with that
 * category preselected as the active filter (replacing this entry so
 * Explore's back button still lands on Home, not here).
 */
export default function Categories() {
  const navigate = useNavigate()
  const { t } = useTranslation(['categories', 'mockData'])

  return (
    <main className="flex min-h-full flex-col bg-cream-base px-6 py-6">
      <BackButton to="/explore" />

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-8 pt-4">
        <div className="flex flex-col gap-2 text-start">
          <h1 className="font-arabic text-2xl font-bold text-primary-pink">{t('title')}</h1>
          <p className="font-arabic text-sm text-charcoal-text/70">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((c) => (
            <m.button
              {...liftable}
              key={c.id}
              type="button"
              onClick={() => navigate('/explore', { state: { categoryId: c.id }, replace: true })}
              className="group flex flex-col overflow-hidden rounded-3xl border border-muted-rose/30 bg-pure-white text-center shadow-sm transition-colors hover:border-primary-pink"
            >
              <span className="relative block h-24 w-full overflow-hidden">
                <img
                  src={categoryImage(c.id)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-text/25 to-transparent"
                />
              </span>
              <span className="px-3 py-3 font-arabic text-sm font-medium text-charcoal-text">
                {t(`mockData:categories.${c.id}.label`)}
              </span>
            </m.button>
          ))}
        </div>
      </div>
    </main>
  )
}
