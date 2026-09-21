import { useTranslation } from 'react-i18next'
import { CheckCircleIcon, CheckIcon } from './icons'

interface VerifiedBadgeProps {
  /**
   * 'pill' (default): gold chip with icon + "موثّق" — Provider Profile, Admin.
   * 'icon': compact gold check disc for dense spots like ServiceCard; the
   * word is still announced to screen readers and shown as a hover title.
   */
  variant?: 'pill' | 'icon'
  /** Overrides the translated label (the Admin App is Arabic-only copy). */
  label?: string
  className?: string
}

/**
 * "Verified provider" trust signal, in the warm-gold accent (pink is kept
 * for actions/selection). Text is charcoal on solid gold for contrast —
 * gold text on white/cream would be too faint to read.
 */
export default function VerifiedBadge({ variant = 'pill', label, className = '' }: VerifiedBadgeProps) {
  const { t } = useTranslation('common')
  const text = label ?? t('verified')

  if (variant === 'icon') {
    return (
      <span
        title={text}
        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-warm-gold text-charcoal-text ${className}`}
      >
        <CheckIcon className="h-2.5 w-2.5" />
        <span className="sr-only">{text}</span>
      </span>
    )
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full bg-warm-gold px-2.5 py-0.5 font-arabic text-xs font-semibold text-charcoal-text ${className}`}
    >
      <CheckCircleIcon className="h-3.5 w-3.5" />
      {text}
    </span>
  )
}
