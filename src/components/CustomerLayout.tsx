import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router-dom'
import { m } from 'framer-motion'
import { usePageTransition } from '../lib/motion'
import BottomNav from './BottomNav'
import BrandMark from './BrandMark'

/**
 * Customer App shell (Section 24 — Responsive Design).
 *
 * Desktop / tablet: the mobile customer experience is displayed inside a
 * centered phone frame on the deep-aubergine brand backdrop — matching the
 * reference board. A subtle brand strip (Section 29) sits under the frame;
 * it is part of the presentation backdrop, NOT the in-phone bottom nav.
 *
 * Mobile: the frame drops its chrome (border/rounding/backdrop) via the
 * responsive classes and the customer experience fills the viewport.
 *
 * BottomNav is rendered here (absolute within the frame) rather than by each
 * screen, so it stays pinned to the frame bottom while content scrolls. It
 * only appears on the five primary tab roots.
 */

const TAB_ROUTES = new Set(['/home', '/explore', '/my-event', '/notifications', '/profile'])

export default function CustomerLayout() {
  const location = useLocation()
  const { t } = useTranslation('common')
  const showBottomNav = TAB_ROUTES.has(location.pathname)
  const pageTransition = usePageTransition()

  const brandMessages = [
    t('brandStrip.easy', 'تجربة سهلة وذكية'),
    t('brandStrip.trusted', 'خدمات موثوقة ومميزة'),
    t('brandStrip.oneplace', 'كل مناسبتك في مكان واحد'),
    t('brandStrip.premium', 'تصميم عصري وفاخر'),
  ]

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-sidebar-dark">
      {/* Ambient warm glow — premium depth on the aubergine backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 hidden h-96 w-96 rounded-full bg-warm-gold/10 blur-3xl sm:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/4 hidden h-96 w-96 rounded-full bg-muted-rose/10 blur-3xl sm:block"
      />

      {/* Desktop backdrop brand lockup (Section 28) — top corner overlay */}
      <div className="absolute top-6 right-8 z-10 hidden text-cream-base sm:block">
        <BrandMark orientation="inline" logoClassName="h-9 w-9" wordmarkClassName="text-xl" />
      </div>

      {/* Phone frame — full viewport on mobile, framed mockup on ≥sm */}
      <div className="relative flex h-dvh w-full max-w-[420px] flex-col overflow-hidden bg-cream-base shadow-2xl sm:h-[820px] sm:max-h-[84dvh] sm:rounded-[2.75rem] sm:border-[10px] sm:border-[#1b0e17]">
        <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
          {/* Page enter transition, keyed per route. The splash is left static
              so its auto-advance screen behaves exactly as before. */}
          {location.pathname === '/' ? (
            <Outlet />
          ) : (
            <m.div key={location.pathname} className="h-full" {...pageTransition}>
              <Outlet />
            </m.div>
          )}
        </div>
        {showBottomNav && <BottomNav />}
      </div>

      {/* Brand-message strip (Section 29) — presentation backdrop only */}
      <div className="absolute inset-x-0 bottom-4 z-10 hidden flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 text-center font-arabic text-xs text-cream-base/60 sm:flex">
        {brandMessages.map((msg, i) => (
          <span key={msg} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden="true" className="text-warm-gold/50">•</span>}
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}
