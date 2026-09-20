import { useLocation, useNavigate } from 'react-router-dom'
import { ActivityIcon, ChartIcon, GridIcon, ListIcon, StoreIcon, UsersIcon } from './icons'

const items = [
  { path: '/admin/overview', label: 'نظرة عامة', icon: GridIcon },
  { path: '/admin/users', label: 'المستخدمون', icon: UsersIcon },
  { path: '/admin/providers', label: 'مقدّمو الخدمات', icon: StoreIcon },
  { path: '/admin/content', label: 'المحتوى', icon: ListIcon },
  { path: '/admin/activity', label: 'النشاط', icon: ActivityIcon },
  { path: '/admin/statistics', label: 'الإحصائيات', icon: ChartIcon },
] as const

/** Sidebar navigation for the Admin App — same pattern as ProviderSidebar. */
export default function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside className="flex w-20 shrink-0 flex-col items-center gap-2 bg-sidebar-dark py-6">
      {items.map(({ path, label, icon: ItemIcon }) => {
        const active =
          location.pathname === path || location.pathname.startsWith(`${path}/`)
        return (
          <button
            key={path}
            type="button"
            onClick={() => navigate(path)}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className={`flex w-16 flex-col items-center gap-1 rounded-2xl py-2 text-center font-arabic text-[10px] leading-tight transition-colors ${
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
