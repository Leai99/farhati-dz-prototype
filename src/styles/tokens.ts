/**
 * Design tokens — Farhati DZ prototype
 *
 * Source of truth for colors & fonts. Values are copied exactly from
 * Section 4 ("نظام التصميم / Design System") of farhati-dz-prototype-spec.md —
 * do not tweak hex values here without updating the spec (and vice versa).
 *
 * Wired into Tailwind via `@config "../tailwind.config.ts"` in src/index.css,
 * which imports this file and extends theme.colors / theme.fontFamily with it.
 */

export const colors = {
  /** Primary elements, buttons, important headings */
  'wine-primary': '#6E2B45',
  /** General background, white space */
  'cream-base': '#F7EEE4',
  /** Distinctive details, selected icons, subtle borders */
  'warm-gold': '#C9A669',
  /** Primary text */
  'charcoal-text': '#2B2321',
  /** Secondary elements, hover/selected states */
  'muted-rose': '#B98C99',
  /** Cards, elevated surfaces */
  'pure-white': '#FFFFFF',
  /** Dark sidebar background for the Provider + Admin dashboards */
  'sidebar-dark': '#2B1926',
} as const;

export const fonts = {
  /** Arabic display/body copy — modern, non-decorative. Loaded via Google Fonts. */
  arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
  /** Latin content (numbers, EN/FR text) — complements the Arabic face. */
  latin: ['Inter', 'sans-serif'],
} as const;

export type ColorToken = keyof typeof colors;
