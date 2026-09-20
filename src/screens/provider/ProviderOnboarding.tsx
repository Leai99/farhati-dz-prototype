import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { InboxIcon, ListIcon } from '../../components/icons'

const highlights = [
  {
    icon: ListIcon,
    title: 'أدِر خدماتك بسهولة',
    description: 'أضف خدماتك وحدّثها في أي وقت لتظهر أمام عملاء يبحثون عمّن يثقون به',
  },
  {
    icon: InboxIcon,
    title: 'استقبل طلبات الحجز مباشرة',
    description: 'تابع طلبات العملاء وردّ عليها من مكان واحد، بلا وسيط',
  },
] as const

/**
 * Service Provider App — Screen 2/9 (Section 5.B): Provider Onboarding.
 * Route: "/provider-app/onboarding"
 *
 * Brief orientation, not a form — a single screen with two short value
 * props and one CTA into the dashboard.
 */
export default function ProviderOnboarding() {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-cream-base px-6 py-16 text-center">
      <div aria-hidden="true" />

      <div className="flex flex-col items-center gap-6">
        <h1 className="font-arabic text-2xl font-bold text-wine-primary">
          مرحبًا بك، مقدّم الخدمة
        </h1>
        <p className="max-w-sm font-arabic text-sm leading-relaxed text-charcoal-text/70">
          فرحتي DZ يمنحك مساحة لعرض خدماتك واستقبال طلبات الحجز من عملاء يبحثون عن مقدّمي خدمات موثوقين
        </p>

        <div className="mt-2 flex w-full max-w-sm flex-col gap-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="flex items-start gap-3 rounded-3xl bg-pure-white shadow-sm p-4 text-right"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warm-gold/15 text-wine-primary">
                <h.icon className="h-5 w-5" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-arabic text-sm font-semibold text-charcoal-text">
                  {h.title}
                </span>
                <span className="font-arabic text-xs text-charcoal-text/60">{h.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-sm">
        <Button onClick={() => navigate('/provider-app/dashboard')}>
          الانتقال إلى لوحة التحكم
        </Button>
      </div>
    </main>
  )
}
