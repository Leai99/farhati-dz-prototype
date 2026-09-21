/**
 * FARHATI DZ brand lockup (Section 28).
 *
 * A stylized "F" glyph in the current text color with a small warm-gold
 * accent flourish, plus the two-line "FARHATI / DZ" wordmark. `currentColor`
 * drives the F + FARHATI so the same mark works on the cream splash (wine
 * text) and on the dark aubergine desktop backdrop (cream text).
 */

interface BrandMarkProps {
  /** Sizing/color utility classes applied to the wrapper (text color cascades). */
  className?: string
  /** 'stacked' = logo above wordmark (splash); 'inline' = logo beside wordmark (backdrop header). */
  orientation?: 'stacked' | 'inline'
  /** Logo glyph size. */
  logoClassName?: string
  /** FARHATI wordmark size. */
  wordmarkClassName?: string
}

export function FarhatiLogo({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* Stylized F — inherits currentColor */}
      <path d="M24 13 H46" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M24 13 V51" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M24 31 H42" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      {/* Warm-gold accent sparkle */}
      <path
        d="M50 9 l1.7 4.1 4.1 1.7 -4.1 1.7 -1.7 4.1 -1.7 -4.1 -4.1 -1.7 4.1 -1.7 z"
        fill="#C9A669"
      />
    </svg>
  )
}

export default function BrandMark({
  className = '',
  orientation = 'stacked',
  logoClassName = 'h-14 w-14',
  wordmarkClassName = 'text-3xl',
}: BrandMarkProps) {
  return (
    <div
      dir="ltr"
      className={`flex ${
        orientation === 'stacked' ? 'flex-col items-center gap-3' : 'flex-row items-center gap-3'
      } ${className}`}
    >
      <FarhatiLogo className={logoClassName} />
      <div
        className={`flex flex-col leading-none ${
          orientation === 'stacked' ? 'items-center' : 'items-start'
        }`}
      >
        <span className={`font-latin font-bold tracking-[0.18em] ${wordmarkClassName}`}>
          FARHATI
        </span>
        <span className="font-latin text-[0.7em] font-semibold tracking-[0.5em] text-warm-gold">
          DZ
        </span>
      </div>
    </div>
  )
}
