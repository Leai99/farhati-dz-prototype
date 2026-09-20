import type { ServiceTone } from '../mock-data/services'

/** Shared between Explore, Service Details, Provider Profile and Favorites. */
export const toneClasses: Record<ServiceTone, string> = {
  wine: 'bg-wine-primary',
  gold: 'bg-warm-gold',
  rose: 'bg-muted-rose',
}

export function formatPrice(value: number) {
  return value.toLocaleString('en-US')
}
