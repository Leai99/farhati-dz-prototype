import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const base =
  'w-full rounded-full px-6 py-3 font-arabic text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-wine-primary text-pure-white shadow-md shadow-wine-primary/20 hover:bg-wine-primary/90',
  outline:
    'border border-wine-primary bg-transparent text-wine-primary hover:bg-wine-primary/5',
}

/** Primary/outline button using the Wine Primary token — no ad-hoc colors. */
export default function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props} />
  )
}
