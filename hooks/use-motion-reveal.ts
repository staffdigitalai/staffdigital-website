"use client"

import { useReducedMotion } from "framer-motion"

/**
 * Accessibility-aware Framer Motion helpers.
 *
 * The default Framer Motion behavior (reducedMotion: "user") respects
 * `prefers-reduced-motion: reduce` by skipping transitions — but when an
 * element is configured with `initial={{ opacity: 0 }}` it stays stuck at
 * that initial state forever, because the target is never applied. That's a
 * WCAG 2.3.3 violation: users who requested less motion see blank content.
 *
 * These hooks return `{ initial: false }` for reduced-motion users, which
 * tells Framer Motion to skip the initial state entirely. The element
 * renders at its natural visible state — no animation, no invisible stuck
 * elements, no regression.
 *
 * Pick the right hook:
 * - `useMotionReveal` — scroll-triggered reveal (uses `whileInView`)
 * - `useMotionFade`   — mount-triggered fade (uses `animate`)
 * - `useStaggerContainer` + `useStaggerItem` — parent/child stagger patterns
 */

// ─── Shared ───────────────────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

// ─── Viewport-triggered reveal (whileInView) ──────────────────────────────

export interface MotionRevealOptions {
  /** Offset on Y (px) in the hidden state. Default: 20. */
  y?: number
  /** Offset on X (px) in the hidden state. Default: 0. */
  x?: number
  /** Delay before animation starts (s). Default: 0. */
  delay?: number
  /** Animation duration (s). Default: 0.5. */
  duration?: number
  /** Viewport threshold: % of element visible before firing. Default: 0.1. */
  amount?: number
}

export function useMotionReveal(opts: MotionRevealOptions = {}) {
  const shouldReduce = useReducedMotion()
  const { y = 20, x = 0, delay = 0, duration = 0.5, amount = 0.1 } = opts
  if (shouldReduce) {
    return { initial: false as const }
  }
  return {
    initial: { opacity: 0, y, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, amount, margin: "0px 0px -80px 0px" as const },
    transition: { duration, delay, ease: EASE },
  }
}

// ─── Mount-triggered fade (initial + animate) ─────────────────────────────

export interface MotionFadeOptions {
  /** Offset on Y (px) in the hidden state. Default: 0 (pure fade). */
  y?: number
  /** Offset on X (px) in the hidden state. Default: 0 (pure fade). */
  x?: number
  /** Starting scale. Omit for no scale animation. */
  scale?: number
  /** Delay before animation starts (s). Default: 0. */
  delay?: number
  /** Animation duration (s). Default: 0.4. */
  duration?: number
}

export function useMotionFade(opts: MotionFadeOptions = {}) {
  const shouldReduce = useReducedMotion()
  const { y = 0, x = 0, scale, delay = 0, duration = 0.4 } = opts
  if (shouldReduce) {
    return { initial: false as const }
  }
  const initial: Record<string, number> = { opacity: 0 }
  const animate: Record<string, number> = { opacity: 1 }
  if (y) {
    initial.y = y
    animate.y = 0
  }
  if (x) {
    initial.x = x
    animate.x = 0
  }
  if (scale !== undefined) {
    initial.scale = scale
    animate.scale = 1
  }
  return {
    initial,
    animate,
    transition: { duration, delay, ease: EASE },
  }
}

// ─── Stagger patterns ─────────────────────────────────────────────────────

export function useStaggerContainer(staggerChildren = 0.08) {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return { initial: false as const }
  return {
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren } },
    },
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.1 },
  }
}

export function useStaggerItem() {
  const shouldReduce = useReducedMotion()
  return {
    variants: {
      hidden: shouldReduce ? {} : { opacity: 0, y: 16 },
      visible: shouldReduce
        ? {}
        : { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
    },
  }
}
