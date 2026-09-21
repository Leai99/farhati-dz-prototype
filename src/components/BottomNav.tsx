import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { BellIcon, CalendarIcon, HomeIcon, SearchIcon, UserIcon } from './icons'

const tabs = [
  { path: '/home', labelKey: 'bottomNav.home', icon: HomeIcon },
  { path: '/explore', labelKey: 'bottomNav.explore', icon: SearchIcon },
  { path: '/my-event', labelKey: 'bottomNav.myEvent', icon: CalendarIcon },
  { path: '/notifications', labelKey: 'bottomNav.notifications', icon: BellIcon },
  { path: '/profile', labelKey: 'bottomNav.profile', icon: UserIcon },
] as const

/**
 * Bottom navigation bar (Section 4's unified Customer App component).
 * Rendered only on the 5 primary tabs — Home / Explore / My Event /
 * Notifications / Profile. Every other screen (Splash, Onboarding, Login,
 * Account Type, Categories, Service Details, Provider Profile, Favorites)
 * keeps the BackButton-driven chain instead, since they're nested/satellite
 * screens rather than tab roots.
 */
export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-muted-rose/20 bg-pure-white px-2 py-2">
      {tabs.map(({ path, labelKey, icon: TabIcon }) => {
        const active = location.pathname === path
        const label = t(labelKey)
        return (
          <button
            key={path}
            type="button"
            onClick={() => navigate(path)}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 font-arabic text-[11px] transition-colors ${
              active ? 'text-wine-primary' : 'text-charcoal-text/50'
            }`}
          >
            <TabIcon className="h-5 w-5" />
            {label}
          </button>
        )
      })}
    </nav>
  )
}
