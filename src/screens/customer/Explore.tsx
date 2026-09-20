import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import BottomNav from '../../components/BottomNav'
import EmptyState from '../../components/EmptyState'
import FiltersPanel, { type FiltersState } from '../../components/FiltersPanel'
import { FilterIcon, SearchIcon } from '../../components/icons'
import ServiceCard from '../../components/ServiceCard'
import { categories, services } from '../../mock-data/services'

/** Highest priceTo in the mock dataset — used as the filter slider's ceiling. */
const PRICE_CEILING = 250000

/**
 * Customer App — Screen 7/15 (Section 5.A): Explore / Search. Route: "/explore"
 *
 * Doubles as the landing point for Categories 8/15 and Filters 9/15: the
 * chip row is a quick in-place category filter, "كل الفئات" opens the fuller
 * /categories browsing grid, and the filter icon opens the FiltersPanel
 * bottom sheet. All three share the same `filters` state as their source of
 * truth so there's one filtering result, not three competing ones.
 *
 * Now a bottom-nav tab root (Section 4), so the on-screen BackButton was
 * removed — tabs are peers, not a back chain; the bottom nav is the primary
 * way to leave.
 */
export default function Explore() {
  const navigate = useNavigate()
  const location = useLocation()
  const preselectedCategoryId = (location.state as { categoryId?: string } | null)?.categoryId
  const { t } = useTranslation(['explore', 'mockData'])

  const [query, setQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FiltersState>({
    categoryIds: preselectedCategoryId ? [preselectedCategoryId] : [],
    maxPrice: PRICE_CEILING,
    minRating: 0,
  })

  function toggleChip(id: string) {
    setFilters((f) => ({
      ...f,
      categoryIds: f.categoryIds.includes(id)
        ? f.categoryIds.filter((c) => c !== id)
        : [...f.categoryIds, id],
    }))
  }

  const filteredServices = useMemo(() => {
    const trimmedQuery = query.trim()
    return services.filter((s) => {
      if (filters.categoryIds.length > 0 && !filters.categoryIds.includes(s.categoryId)) {
        return false
      }
      if (s.priceFrom > filters.maxPrice) return false
      if (s.rating < filters.minRating) return false
      // Matches against the *translated* name (not the raw mock-data
      // Arabic string) so search works whichever language is active.
      if (trimmedQuery) {
        const translatedName = t(`mockData:services.${s.id}.name`)
        if (!translatedName.toLowerCase().includes(trimmedQuery.toLowerCase())) return false
      }
      return true
    })
  }, [query, filters, t])

  const activeFilterCount =
    filters.categoryIds.length +
    (filters.maxPrice < PRICE_CEILING ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0)

  function resetAll() {
    setQuery('')
    setFilters({ categoryIds: [], maxPrice: PRICE_CEILING, minRating: 0 })
  }

  return (
    <main className="min-h-screen bg-cream-base pb-28">
      <div className="flex items-center gap-3 px-6 pt-8">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-charcoal-text/40">
            <SearchIcon className="h-4 w-4" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full rounded-full border border-muted-rose/30 bg-pure-white py-3 ps-11 pe-4 font-arabic text-sm text-charcoal-text outline-none placeholder:text-charcoal-text/40 focus:border-wine-primary"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          aria-label={t('filterAria')}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-wine-primary text-wine-primary"
        >
          <FilterIcon className="h-4 w-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full bg-warm-gold text-[10px] font-semibold text-charcoal-text">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto px-6 pb-1">
        {categories.map((c) => {
          const active = filters.categoryIds.includes(c.id)
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggleChip(c.id)}
              className={`shrink-0 rounded-full border px-4 py-2 font-arabic text-sm transition-colors ${
                active
                  ? 'border-wine-primary bg-wine-primary text-pure-white'
                  : 'border-muted-rose/30 bg-pure-white text-charcoal-text'
              }`}
            >
              {t(`mockData:categories.${c.id}.label`)}
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => navigate('/categories')}
          className="shrink-0 rounded-full border border-dashed border-wine-primary/50 px-4 py-2 font-arabic text-sm text-wine-primary"
        >
          {t('allCategories')}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 px-6">
        {filteredServices.length === 0 ? (
          <EmptyState
            icon={<SearchIcon className="h-6 w-6" />}
            title={t('empty.title')}
            description={t('empty.description')}
            action={{ label: t('empty.reset'), onClick: resetAll, variant: 'link' }}
          />
        ) : (
          filteredServices.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              categoryLabel={t(`mockData:categories.${s.categoryId}.label`)}
            />
          ))
        )}
      </div>

      <FiltersPanel
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        priceCeiling={PRICE_CEILING}
        applied={filters}
        onApply={setFilters}
      />

      <BottomNav />
    </main>
  )
}
