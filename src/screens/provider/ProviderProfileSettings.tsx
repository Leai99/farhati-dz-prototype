import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import ProviderSidebar from '../../components/ProviderSidebar'
import { useProviderData } from '../../context/ProviderDataContext'
import { CURRENT_PROVIDER_ID } from '../../mock-data/session'
import { categories } from '../../mock-data/services'

const languages = [
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
] as const

/**
 * Service Provider App — Screens 8-9/9 (Section 5.B): Profile, folded
 * together with Notifications and Settings. Route: "/provider-app/profile"
 *
 * Structural deviation from the spec's screen list, which names Profile,
 * Notifications and Settings as three separate items: each would be a very
 * thin screen alone (a language switch, one toggle), so they're merged into
 * this one screen instead. Flagging explicitly since it collapses screen
 * count, not just wording — split them back out if the app grows enough
 * settings to justify it.
 */
export default function ProviderProfileSettings() {
  const navigate = useNavigate()
  const { providers, updateProvider } = useProviderData()
  const provider = providers.find((p) => p.id === CURRENT_PROVIDER_ID)!

  const [name, setName] = useState(provider.name)
  const [categoryId, setCategoryId] = useState(provider.categoryId)
  const [bio, setBio] = useState(provider.bio)
  const [language, setLanguage] = useState<(typeof languages)[number]['code']>('ar')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [savedJustNow, setSavedJustNow] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateProvider(provider.id, { name: name.trim(), categoryId, bio: bio.trim() })
    setSavedJustNow(true)
    window.setTimeout(() => setSavedJustNow(false), 2000)
  }

  return (
    <div className="flex min-h-screen bg-cream-base">
      <ProviderSidebar />

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-wine-primary font-arabic text-2xl font-semibold text-pure-white">
            {provider.name.charAt(0)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-right font-arabic">
            <span className="text-sm font-medium text-charcoal-text">اسم النشاط</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-xl border border-muted-rose/40 bg-pure-white px-4 py-3 text-charcoal-text outline-none focus:border-wine-primary"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-right font-arabic">
            <span className="text-sm font-medium text-charcoal-text">الفئة</span>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="rounded-xl border border-muted-rose/40 bg-pure-white px-4 py-3 text-charcoal-text outline-none focus:border-wine-primary"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-right font-arabic">
            <span className="text-sm font-medium text-charcoal-text">نبذة</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              required
              className="resize-none rounded-xl border border-muted-rose/40 bg-pure-white px-4 py-3 text-charcoal-text outline-none focus:border-wine-primary"
            />
          </label>

          <Button type="submit">{savedJustNow ? 'تم الحفظ ✓' : 'حفظ التغييرات'}</Button>
        </form>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-4">
          <section className="flex flex-col gap-3 rounded-3xl bg-pure-white shadow-sm p-4 text-right">
            <h2 className="font-arabic text-sm font-semibold text-charcoal-text">اللغة</h2>
            <div className="flex gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`flex-1 rounded-xl border px-3 py-2 font-arabic text-sm transition-colors ${
                    language === l.code
                      ? 'border-wine-primary bg-wine-primary text-pure-white'
                      : 'border-muted-rose/30 bg-cream-base text-charcoal-text'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </section>

          <section className="flex items-center justify-between rounded-3xl bg-pure-white shadow-sm p-4">
            <span className="font-arabic text-sm font-medium text-charcoal-text">
              تفعيل الإشعارات
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={notificationsEnabled}
              aria-label="تفعيل الإشعارات"
              onClick={() => setNotificationsEnabled((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                notificationsEnabled ? 'bg-wine-primary' : 'bg-muted-rose/30'
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-0.5 start-0.5 h-5 w-5 rounded-full bg-pure-white shadow transition-transform duration-200 ${
                  notificationsEnabled ? 'translate-x-5 rtl:-translate-x-5' : ''
                }`}
              />
            </button>
          </section>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="rounded-full border border-wine-primary px-6 py-3 font-arabic text-sm font-semibold text-wine-primary"
          >
            تسجيل الخروج
          </button>
        </div>
      </main>
    </div>
  )
}
