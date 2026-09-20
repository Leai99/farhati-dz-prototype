import { useLocation, useNavigate } from 'react-router-dom'
import { GridIcon, InboxIcon, ListIcon, UserIcon } from './icons'

const items = [
  { path: '/provider-app/dashboard', label: 'الرئيسية', icon: GridIcon },
  { path: '/provider-app/services', label: 'خدماتي', icon: ListIcon },
  { path: '/provider-app/requests', label: 'الطلبات', icon: InboxIcon },
  { path: '/provider-app/profile', label: 'الملف الشخصي', icon: UserIcon },
] as const

/**
 * Sidebar navigation for the Service Provider App.
 *
 * Section 4 specifies sidebar navigation (not the Customer App's bottom
 * nav) for the Service Provider and Admin dashboards, so this follows that
 * rather than the bottom-nav pattern. As the first DOM child inside a flex
 * row under the global dir="rtl", it renders on the right (start) side
 * automatically — no manual mirroring needed.
 */
export default function ProviderSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside className="flex w-20 shrink-0 flex-col items-center gap-2 bg-sidebar-dark py-6">
      {items.map(({ path, label, icon: ItemIcon }) => {
        // startsWith covers sub-routes too (e.g. /provider-app/services/new
        // and /provider-app/services/:id/edit should still highlight "خدماتي").
        const active =
          location.pathname === path || location.pathname.startsWith(`${path}/`)
        return (
          <button
            key={path}
            type="button"
            onClick={() => navigate(path)}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className={`flex w-16 flex-col items-center gap-1 rounded-2xl py-2 font-arabic text-[10px] transition-colors ${
              active ? 'bg-warm-gold text-sidebar-dark' : 'text-pure-white/60 hover:text-pure-white'
            }`}
          >
            <ItemIcon className="h-5 w-5" />
            {label}
          </button>
        )
      })}
    </aside>
  )
}
