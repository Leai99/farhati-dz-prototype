import type { ReactNode } from 'react'

type BadgeTone = 'positive' | 'warning' | 'neutral'

interface BadgeProps {
  tone: BadgeTone
  children: ReactNode
}

const toneClasses: Record<BadgeTone, string> = {
  positive: 'bg-primary-pink/10 text-primary-pink',
  warning: 'bg-warm-gold/15 text-primary-pink',
  neutral: 'bg-muted-rose/20 text-charcoal-text/70',
}

/**
 * Small rounded status pill — light tinted background matching a semantic
 * tone, used for request/moderation/account statuses (pending, accepted,
 * declined, approved, flagged, active, suspended, …) across the Provider
 * and Admin dashboards so every status reads the same way.
 */
export default function Badge({ tone, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 font-arabic text-xs font-semibold ${toneClasses[tone]}`}
    >
      {children}
    </span>
  )
}
