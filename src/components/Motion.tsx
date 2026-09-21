import { useState } from 'react'
import { m, type HTMLMotionProps } from 'framer-motion'
import { listItemVariants, listVariants, usePageTransition } from '../lib/motion'

/**
 * Drop-in <main> for the Provider/Admin dashboards: fades + slides the page
 * content in on route change while the sidebar next to it stays still.
 */
export function AnimatedMain(props: HTMLMotionProps<'main'>) {
  const pageTransition = usePageTransition()
  return <m.main {...pageTransition} {...props} />
}

/**
 * Staggered fade-in for a list — only on the list's first render. Items added
 * or swapped in later (filters, tab changes) appear instantly instead of
 * re-running the entrance, because `initial` flips to `false` once the first
 * entrance finishes and newly mounted children inherit it.
 */
export function StaggerList(props: HTMLMotionProps<'div'>) {
  const [entered, setEntered] = useState(false)
  return (
    <m.div
      variants={listVariants}
      initial={entered ? false : 'hidden'}
      animate="show"
      onAnimationComplete={() => setEntered(true)}
      {...props}
    />
  )
}

export function StaggerItem(props: HTMLMotionProps<'div'>) {
  return <m.div variants={listItemVariants} {...props} />
}
