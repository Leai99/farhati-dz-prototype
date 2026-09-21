import { m, type HTMLMotionProps } from 'framer-motion'
import { pressable } from '../lib/motion'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant
}

const base =
  'w-full rounded-full px-6 py-3 font-arabic text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-pink text-pure-white shadow-md shadow-primary-pink/20 hover:bg-primary-pink/90',
  outline:
    'border border-primary-pink bg-transparent text-primary-pink hover:bg-primary-pink/5',
}

/** Primary/outline button using the Primary Pink token — no ad-hoc colors.
 * Presses down slightly on tap (shared `pressable` config). */
export default function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <m.button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...pressable}
      {...props}
    />
  )
}
