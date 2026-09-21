import type { InputHTMLAttributes, ReactNode } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  /** Inline validation message — shown below the field, and switches the
   * border to the same muted-rose tone the rest of the app uses for
   * negative/declined states (there's no separate "error red" token). */
  error?: string
  /** Optional control pinned inside the field on its logical end side (e.g.
   * a show-password toggle) — mirrors the start-side search icons in
   * Explore/Admin, using logical end-/pe- so it flips correctly under RTL. */
  endAdornment?: ReactNode
}

/** Labeled text input, aligned to the reading start (RTL or LTR alike). */
export default function TextField({ label, id, error, endAdornment, ...props }: TextFieldProps) {
  const errorId = error ? `${id}-error` : undefined
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5 text-start font-arabic">
      <span className="text-sm font-medium text-charcoal-text">{label}</span>
      <div className="relative">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`w-full rounded-xl border bg-pure-white py-3 ps-4 text-charcoal-text outline-none placeholder:text-charcoal-text/40 ${
            endAdornment ? 'pe-12' : 'pe-4'
          } ${error ? 'border-muted-rose focus:border-muted-rose' : 'border-muted-rose/40 focus:border-primary-pink'}`}
          {...props}
        />
        {endAdornment && (
          <span className="absolute inset-y-0 end-0 flex items-center pe-2">{endAdornment}</span>
        )}
      </div>
      {error && (
        <span id={errorId} className="text-xs font-medium text-muted-rose">
          {error}
        </span>
      )}
    </label>
  )
}
