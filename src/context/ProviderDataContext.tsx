import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { providers as seedProviders, type Provider } from '../mock-data/providers'
import { providerRequests as seedRequests, type ProviderRequest, type RequestStatus } from '../mock-data/providerRequests'
import { services as seedServices, type Service } from '../mock-data/services'

export interface ServiceFormInput {
  name: string
  categoryId: string
  priceFrom: number
  priceTo: number
  description: string
}

interface ProviderDataContextValue {
  services: Service[]
  providers: Provider[]
  requests: ProviderRequest[]
  addService: (providerId: string, input: ServiceFormInput) => Service
  updateService: (id: string, input: ServiceFormInput) => void
  updateProvider: (id: string, patch: Partial<Pick<Provider, 'name' | 'bio' | 'categoryId'>>) => void
  updateRequestStatus: (id: string, status: RequestStatus) => void
}

const ProviderDataContext = createContext<ProviderDataContextValue | null>(null)

const TONES: Service['tone'][] = ['wine', 'gold', 'rose']

/**
 * Session-local mutable copy of the provider-side mock data (services,
 * providers, requests), seeded from the static mock-data files.
 *
 * Scoped to the Service Provider App only — Customer App screens (Explore,
 * Service Details, the public Provider Profile, Favorites, My Event) keep
 * reading the original static files directly, so an edit made here does
 * NOT retroactively update what a customer sees in the same session.
 * Syncing both apps to one live data store would be a bigger refactor than
 * this pass calls for; see the summary for the full note. Not persisted to
 * localStorage (unlike Favorites) — resets on reload, per "no persistence
 * needed beyond the session."
 */
export function ProviderDataProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(seedServices)
  const [providers, setProviders] = useState<Provider[]>(seedProviders)
  const [requests, setRequests] = useState<ProviderRequest[]>(seedRequests)

  const value = useMemo<ProviderDataContextValue>(
    () => ({
      services,
      providers,
      requests,
      addService: (providerId, input) => {
        const newService: Service = {
          id: `s-${crypto.randomUUID().slice(0, 8)}`,
          providerId,
          name: input.name,
          categoryId: input.categoryId,
          priceFrom: input.priceFrom,
          priceTo: input.priceTo,
          description: input.description,
          // A brand-new service has no reviews yet — 0/0 rather than a
          // fabricated rating; the UI shows a "جديد" badge for that case.
          rating: 0,
          reviewCount: 0,
          location:
            services.find((s) => s.providerId === providerId)?.location ?? 'الجزائر العاصمة',
          tone: TONES[services.length % TONES.length],
        }
        setServices((current) => [...current, newService])
        setProviders((current) =>
          current.map((p) =>
            p.id === providerId ? { ...p, serviceIds: [...p.serviceIds, newService.id] } : p,
          ),
        )
        return newService
      },
      updateService: (id, input) => {
        setServices((current) => current.map((s) => (s.id === id ? { ...s, ...input } : s)))
      },
      updateProvider: (id, patch) => {
        setProviders((current) => current.map((p) => (p.id === id ? { ...p, ...patch } : p)))
      },
      updateRequestStatus: (id, status) => {
        setRequests((current) => current.map((r) => (r.id === id ? { ...r, status } : r)))
      },
    }),
    [services, providers, requests],
  )

  return <ProviderDataContext.Provider value={value}>{children}</ProviderDataContext.Provider>
}

export function useProviderData() {
  const ctx = useContext(ProviderDataContext)
  if (!ctx) {
    throw new Error('useProviderData must be used within a ProviderDataProvider')
  }
  return ctx
}
