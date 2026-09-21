/**
 * Shared motion config (Framer Motion) — the one place timing, easing and
 * offsets live, so every screen moves the same way.
 *
 * Reduced motion: <MotionConfig reducedMotion="user"> in main.tsx makes
 * Framer skip transform animations (slide, scale) for users with
 * prefers-reduced-motion set; opacity fades still run, so nothing pops.
 */
import { useTranslation } from 'react-i18next'
import type { MotionProps, Transition, Variants } from 'framer-motion'

/** ease-out (fast start, soft landing) */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  page: 0.22,
  item: 0.2,
} as const

/** Horizontal page-enter offset in px — subtle, not a full-screen slide. */
export const PAGE_OFFSET = 12

/** Snappy spring used for press/hover feedback. */
export const PRESS_SPRING: Transition = { type: 'spring', stiffness: 500, damping: 30, mass: 0.6 }

/**
 * Page enter transition. New pages come in from the reading-end side and move
 * toward the reading-start side (like a native "push"), so the offset flips
 * with the document direction: RTL enters from the left, LTR from the right.
 */
export function usePageTransition(): MotionProps {
  const { i18n } = useTranslation()
  const offset = i18n.dir() === 'rtl' ? -PAGE_OFFSET : PAGE_OFFSET
  return {
    initial: { opacity: 0, x: offset },
    animate: { opacity: 1, x: 0 },
    transition: { duration: DURATION.page, ease: EASE_OUT },
  }
}

/** Buttons: slight press-down, springs back on release. */
export const pressable: MotionProps = {
  whileTap: { scale: 0.97 },
  transition: PRESS_SPRING,
}

/**
 * Cards/tiles: gentle lift on hover (Framer only fires hover for real mouse
 * pointers, so touch devices don't get a stuck hover) + press-down on tap.
 */
export const liftable: MotionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: PRESS_SPRING,
}

/** Splash logo: quiet first-impression entrance (fade + slight scale-up). */
export const splashEntrance: MotionProps = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.45, ease: EASE_OUT },
}

/** Splash supporting text: fades in just after the logo settles. */
export const splashTextFade: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.35, delay: 0.25, ease: EASE_OUT },
}

/** Staggered list entrance — parent + child variants. */
export const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
}

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.item, ease: EASE_OUT } },
}
