"use client"

import { useReducedMotion } from "framer-motion"

/**
 * Accessibility-aware Framer Motion helpers.
 *
 * Why this module exists (long form, because the bug class is subtle):
 *
 * Framer's default `reducedMotion: "user"` suppresses transitions for
 * users with `prefers-reduced-motion: reduce`. In isolation that would
 * be fine. But our components use `initial={{opacity: 0}}` +
 * `whileInView` / `variants` as their reveal pattern, and Framer
 * emits that initial state as inline SSR style. At SSR,
 * `useReducedMotion()` returns `null` (no client context yet), so the
 * hooks take the "motion enabled" branch and the HTML ships with
 * `style="opacity:0; transform:translateY(Npx)"` baked in.
 *
 * On the client:
 *   • If the user does NOT have reduced-motion → Framer's IntersectionObserver
 *     fires when the element enters view → element animates to visible. OK.
 *   • If the user HAS reduced-motion → Framer respects that, does nothing,
 *     BUT the SSR opacity:0 is still on the element. Result: invisible
 *     content forever. That's the WCAG 2.3.3 footgun PR #72 tried to
 *     guard against but incompletely — returning `{initial: false}` only
 *     prevents Framer from running the initial animation; it doesn't
 *     force a visible target state, so the DOM stays at whatever SSR
 *     rendered.
 *
 * The fix applied here: under reduced-motion, return both
 * `initial: false` AND an `animate` target that matches the final
 * visible state, with `transition: { duration: 0 }`. This tells
 * Framer "skip initial, snap instantly to target" — overriding
 * whatever the SSR-baked inline style was. Same principle for
 * `useStaggerItem`.
 *
 * Pick the right hook:
 * - `useMotionReveal`  — scroll-triggered reveal (uses `whileInView`)
 * - `useMotionFade`    — mount-triggered fade   (uses `animate`)
 * - `useStaggerContainer` + `useStaggerItem` — parent/child stagger
 */

// ─── Shared ───────────────────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

// Framer "snap instantly to visible" transition — used across hooks when
// `prefers-reduced-motion: reduce` is active.
const INSTANT_VISIBLE = { duration: 0 } as const

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
    // Force visible regardless of SSR baked-in opacity:0 / translate.
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0, x: 0 },
      transition: INSTANT_VISIBLE,
    }
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
    const target: Record<string, number> = { opacity: 1, y: 0, x: 0 }
    if (scale !== undefined) target.scale = 1
    return {
      initial: false as const,
      animate: target,
      transition: INSTANT_VISIBLE,
    }
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
  if (shouldReduce) {
    // Container itself is just a coordinator — no visible props. We still
    // disable its initial variant so Framer doesn't try to hide then show.
    return {
      initial: false as const,
      animate: {},
      transition: INSTANT_VISIBLE,
    }
  }
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
  if (shouldReduce) {
    // Force visible regardless of parent variant / SSR inline style.
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      transition: INSTANT_VISIBLE,
    }
  }
  return {
    variants: {
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
    },
  }
}
