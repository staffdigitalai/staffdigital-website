"use client"

import { useReducedMotion, type Variants, type Transition } from "framer-motion"

/**
 * Accessible motion reveal helper.
 *
 * Framer Motion respects `prefers-reduced-motion: reduce` by default, but
 * when used with `initial={{ opacity: 0 }}` + `whileInView`, it leaves the
 * element stuck at opacity 0 forever instead of snapping to the target.
 *
 * This hook returns props that:
 * - With reduced motion: `initial={false}` → element renders at final state
 * - Otherwise: normal fade-in + slide-up on viewport entry
 *
 * Usage:
 *   const reveal = useMotionReveal()
 *   <motion.div {...reveal}>...</motion.div>
 *
 *   // Or with custom transition:
 *   <motion.div {...reveal({ y: 30, delay: 0.1 })}>...</motion.div>
 */
export interface MotionRevealOptions {
  y?: number
  delay?: number
  duration?: number
  amount?: number // viewport threshold 0–1
}

export function useMotionReveal(opts: MotionRevealOptions = {}) {
  const shouldReduce = useReducedMotion()
  const { y = 20, delay = 0, duration = 0.5, amount = 0.1 } = opts

  if (shouldReduce) {
    return {
      initial: false as const,
      animate: undefined,
      whileInView: undefined,
      transition: undefined,
      viewport: undefined,
    }
  }

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount, margin: "0px 0px -80px 0px" as const },
    transition: { duration, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }
}

/**
 * Stagger container variants with accessibility respect.
 */
export function useStaggerContainer(staggerChildren = 0.08): { variants: Variants; initial: string | false; whileInView: string; viewport: { once: boolean; amount: number } } | { initial: false } {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return { initial: false as const }
  }

  return {
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren } },
    },
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.1 },
  }
}

/**
 * Stagger child variants with accessibility respect.
 */
export function useStaggerItem(): { variants: Variants; transition?: Transition } {
  const shouldReduce = useReducedMotion()

  return {
    variants: {
      hidden: shouldReduce ? {} : { opacity: 0, y: 16 },
      visible: shouldReduce
        ? {}
        : {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
          },
    },
  }
}
