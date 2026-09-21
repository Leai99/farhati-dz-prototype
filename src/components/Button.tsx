import type { ReactNode } from 'react'
import { m, type HTMLMotionProps } from 'framer-motion'
import { pressable } from '../lib/motion'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: ReactNode
  variant?: ButtonVariant
  /** Shows a spinner, disables the button and marks it busy. Stays at (near)
   * full opacity so it reads as "working", not "unavailable". */
  loading?: boolean
}

const base = 'w-full rounded-full px-6 py-3 font-arabic text-base font-semibold transition-colors'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-pink text-pure-white shadow-md shadow-primary-pink/20 hover:bg-primary-pink/90',
  outline:
    'border border-primary-pink bg-transparent text-primary-pink hover:bg-primary-pink/5',
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/** Primary/outline button using the Primary Pink token — no ad-hoc colors.
 * Presses down slightly on tap (shared `pressable` config). */
export default function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const state = loading
    ? 'cursor-wait opacity-90'
    : 'disabled:cursor-not-allowed disabled:opacity-50'
  return (
    <m.button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${base} ${variants[variant]} ${state} ${className}`}
      {...pressable}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center justify-center gap-2">
          <Spinner />
          {children}
        </span>
      ) : (
        children
      )}
    </m.button>
  )
}
