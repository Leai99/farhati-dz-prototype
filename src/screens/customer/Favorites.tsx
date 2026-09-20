import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import EmptyState from '../../components/EmptyState'
import { HeartIcon } from '../../components/icons'
import ServiceCard from '../../components/ServiceCard'
import { useFavorites } from '../../context/FavoritesContext'
import { services } from '../../mock-data/services'

/** Customer App — Screen 13/15 (Section 5.A): Favorites. Route: "/favorites" */
export default function Favorites() {
  const navigate = useNavigate()
  const { savedIds } = useFavorites()
  const savedServices = services.filter((s) => savedIds.includes(s.id))
  const { t } = useTranslation(['favorites', 'mockData'])

  return (
    <main className="min-h-screen bg-cream-base pb-12">
      <div className="px-4 pt-6">
        <BackButton to="/home" />
      </div>

      <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-6 pt-2">
        <h1 className="text-start font-arabic text-2xl font-bold text-wine-primary">
          {t('title')}
        </h1>

        {savedServices.length === 0 ? (
          <EmptyState
            icon={<HeartIcon className="h-6 w-6" />}
            title={t('empty.title')}
            description={t('empty.description')}
            action={{ label: t('empty.cta'), onClick: () => navigate('/explore') }}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {savedServices.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                categoryLabel={t(`mockData:categories.${s.categoryId}.label`)}
                showFavoriteToggle
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
