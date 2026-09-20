import type { InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  /** Inline validation message — shown below the field, and switches the
   * border to the same muted-rose tone the rest of the app uses for
   * negative/declined states (there's no separate "error red" token). */
  error?: string
}

/** Labeled text input, aligned to the reading start (RTL or LTR alike). */
export default function TextField({ label, id, error, ...props }: TextFieldProps) {
  const errorId = error ? `${id}-error` : undefined
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5 text-start font-arabic">
      <span className="text-sm font-medium text-charcoal-text">{label}</span>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`rounded-xl border bg-pure-white px-4 py-3 text-charcoal-text outline-none placeholder:text-charcoal-text/40 ${
          error ? 'border-muted-rose focus:border-muted-rose' : 'border-muted-rose/40 focus:border-wine-primary'
        }`}
        {...props}
      />
      {error && (
        <span id={errorId} className="text-xs font-medium text-muted-rose">
          {error}
        </span>
      )}
    </label>
  )
}
