import { InfoIcon } from './icons'

/**
 * Informational notice shown on every /admin/* screen — this app has no
 * real authentication gate (it's reachable via a small link on /login), so
 * this makes that explicit rather than letting the dark sidebar read as a
 * "real", access-controlled admin panel. Styled as a neutral notice (gold
 * tint), not an error/warning color.
 */
export default function AdminPreviewBanner() {
  return (
    <div className="flex items-center gap-2 bg-warm-gold/15 px-6 py-2 text-right">
      <InfoIcon className="h-4 w-4 shrink-0 text-primary-pink" />
      <p className="font-arabic text-xs font-medium text-charcoal-text/80">
        واجهة معاينة للإدارة — بدون مصادقة حقيقية في هذا الـ prototype
      </p>
    </div>
  )
}
