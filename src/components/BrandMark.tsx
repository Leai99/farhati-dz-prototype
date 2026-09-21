/**
 * FARHATI DZ brand lockup (Section 28).
 *
 * The brand logo is a raster badge (FD ribbon monogram, "Farhati DZ"
 * wordmark, Arabic tagline and service icons) on an off-white ground.
 * - 'stacked' (splash) shows the full badge, which already carries the
 *   wordmark, so no text is rendered alongside it.
 * - 'inline' (desktop backdrop header) shows the monogram crop in a round
 *   badge beside the "FARHATI / DZ" text wordmark, since the full badge is
 *   illegible at header size. `currentColor` drives the text so it works on
 *   the dark aubergine backdrop (cream text).
 */
import logoFull from '../assets/farhati-logo.jpg'
import logoMonogram from '../assets/farhati-monogram.png'

interface BrandMarkProps {
  /** Sizing/color utility classes applied to the wrapper (text color cascades). */
  className?: string
  /** 'stacked' = full logo badge (splash); 'inline' = monogram beside wordmark (backdrop header). */
  orientation?: 'stacked' | 'inline'
  /** Logo image size. */
  logoClassName?: string
  /** FARHATI wordmark size (inline only). */
  wordmarkClassName?: string
}

export function FarhatiLogo({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <img
      src={logoMonogram}
      alt=""
      aria-hidden="true"
      className={`rounded-full object-cover shadow-sm ring-1 ring-warm-gold/40 ${className}`}
    />
  )
}

export default function BrandMark({
  className = '',
  orientation = 'stacked',
  logoClassName = 'h-14 w-14',
  wordmarkClassName = 'text-3xl',
}: BrandMarkProps) {
  if (orientation === 'stacked') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <img
          src={logoFull}
          alt="Farhati DZ"
          className={`rounded-full object-cover shadow-lg ring-1 ring-warm-gold/30 ${logoClassName}`}
        />
      </div>
    )
  }

  return (
    <div dir="ltr" className={`flex flex-row items-center gap-3 ${className}`}>
      <FarhatiLogo className={logoClassName} />
      <div className="flex flex-col items-start leading-none">
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
