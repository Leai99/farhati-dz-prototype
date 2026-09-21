import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import { pressable } from '../lib/motion'

interface EmptyStateAction {
  label: string
  onClick: () => void
  /** 'button' (solid pill CTA, e.g. "Explore services") or 'link' (subtle
   * underlined text, e.g. "Reset filters") — matches how strongly the
   * action should be pushed on a given screen. Defaults to 'button'. */
  variant?: 'button' | 'link'
}

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description?: string
  action?: EmptyStateAction
  className?: string
}

/**
 * Shared zero-result/empty-list placeholder — an icon-in-circle chip, a
 * short message (per Section 6's copy guideline: empty states double as a
 * call to action, phrased event-neutral), and an optional next step.
 * Reused by every screen with a search, filter, or list that can
 * legitimately come up empty, so they all read as one consistent pattern.
 */
export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-3xl bg-pure-white px-6 py-10 text-center shadow-sm ${className}`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-warm-gold/15 text-primary-pink">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-arabic text-sm font-semibold text-charcoal-text">{title}</p>
        {description && (
          <p className="font-arabic text-xs text-charcoal-text/60">{description}</p>
        )}
      </div>
      {action &&
        (action.variant === 'link' ? (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-1 font-arabic text-xs font-semibold text-primary-pink underline-offset-4 hover:underline"
          >
            {action.label}
          </button>
        ) : (
          <m.button
            {...pressable}
            type="button"
            onClick={action.onClick}
            className="mt-2 rounded-full bg-primary-pink px-6 py-2.5 font-arabic text-sm font-semibold text-pure-white shadow-md shadow-primary-pink/20"
          >
            {action.label}
          </m.button>
        ))}
    </div>
  )
}
