import type { ServiceTone } from '../mock-data/services'

/** Shared between Explore, Service Details, Provider Profile and Favorites. */
export const toneClasses: Record<ServiceTone, string> = {
  wine: 'bg-primary-pink',
  gold: 'bg-warm-gold',
  rose: 'bg-muted-rose',
}

export function formatPrice(value: number) {
  return value.toLocaleString('en-US')
}

/**
 * Category thumbnail photo (served from public/images/<categoryId>.jpg).
 * Filenames deliberately mirror the ServiceCategory ids in mock-data/services.
 * Kept as one source of truth so cards, hero images and category tiles all
 * resolve the same photo per category.
 */
export function categoryImage(categoryId: string) {
  return `/images/${categoryId}.jpg`
}
