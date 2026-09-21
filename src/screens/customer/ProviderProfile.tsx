import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import RatingBadge from '../../components/RatingBadge'
import ServiceCard from '../../components/ServiceCard'
import WhatsAppButton from '../../components/WhatsAppButton'
import { services } from '../../mock-data/services'
import { providers } from '../../mock-data/providers'

/**
 * Customer App — Screen 11/15 (Section 5.A): Service Provider Profile
 * (public view). Route: "/provider/:id"
 */
export default function ProviderProfile() {
  const { id } = useParams()
  const provider = providers.find((p) => p.id === id)
  const { t } = useTranslation(['providerProfile', 'mockData', 'common'])

  if (!provider) {
    return (
      <main className="flex min-h-full flex-col bg-cream-base px-6 py-6">
        {/* Always entered from a Service Details screen, so plain history
            back is correct here. */}
        <BackButton />
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <p className="font-arabic text-lg font-semibold text-primary-pink">{t('notFound')}</p>
        </div>
      </main>
    )
  }

  const name = t(`mockData:providers.${provider.id}.name`)
  const bio = t(`mockData:providers.${provider.id}.bio`)
  const categoryLabel = t(`mockData:categories.${provider.categoryId}.label`)
  const providerServices = services.filter((s) => provider.serviceIds.includes(s.id))

  return (
    <main className="min-h-full bg-cream-base pb-12">
      <div className="px-4 pt-6">
        <BackButton />
      </div>

      <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-6 pt-2">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-pink font-arabic text-2xl font-semibold text-pure-white">
            {name.charAt(0)}
          </span>
          <div className="flex flex-col gap-1">
            <h1 className="font-arabic text-xl font-semibold text-charcoal-text">{name}</h1>
            <span className="font-arabic text-sm text-charcoal-text/60">{categoryLabel}</span>
            <RatingBadge rating={provider.rating} className="text-sm" />
          </div>
        </div>

        <WhatsAppButton
          phone={provider.phone}
          message={t('whatsappMessage', { provider: name })}
          label={t('common:contactWhatsApp')}
        />

        <section className="flex flex-col gap-2 text-start">
          <h2 className="font-arabic text-sm font-semibold text-charcoal-text">{t('about')}</h2>
          <p className="font-arabic text-sm leading-relaxed text-charcoal-text/80">{bio}</p>
        </section>

        <section className="flex flex-col gap-3 text-start">
          <h2 className="font-arabic text-sm font-semibold text-charcoal-text">
            {t('otherServices')}
          </h2>
          <div className="flex flex-col gap-3">
            {providerServices.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                categoryLabel={t(`mockData:categories.${s.categoryId}.label`)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
