import BackButton from './BackButton'

interface ScreenStubProps {
  title: string
  message?: string
  /** Optional fixed back destination — see BackButton's `to` prop. */
  backTo?: string
}

/**
 * Generic placeholder for a route whose real screen isn't built yet.
 * Reused across route stubs (e.g. /explore, /provider-app/services) so the
 * navigation chain stays fully clickable without inventing screen content
 * ahead of scope.
 */
export default function ScreenStub({
  title,
  message = 'هذه الشاشة لم تُبنَ بعد — إنها فقط نقطة وصول مؤقتة',
  backTo,
}: ScreenStubProps) {
  return (
    <main className="flex min-h-screen flex-col bg-cream-base px-6 py-6">
      <BackButton to={backTo} />
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
        <p className="font-arabic text-xl font-semibold text-primary-pink">{title}</p>
        <p className="font-arabic text-sm text-charcoal-text/70">{message}</p>
      </div>
    </main>
  )
}
