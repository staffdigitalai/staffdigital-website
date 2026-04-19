"use client"

import { useEffect } from "react"
import { useReducedMotion } from "framer-motion"

/**
 * Runtime guard for users with `prefers-reduced-motion: reduce`.
 *
 * Background (long form, because the failure class is subtle):
 * our motion hooks emit `initial={{opacity:0,…}}` as their reveal
 * starting state. At SSR `useReducedMotion()` returns `null`, so the
 * hook takes the motion-enabled branch and Framer writes
 * `style="opacity:0; transform:translate(…)"` into the server HTML.
 *
 * On the client, reduced-motion users get back `{ initial: false,
 * animate: target, transition: { duration: 0 } }` from the updated
 * hook — which should snap to visible. That works for plain
 * `useMotionReveal` / `useMotionFade` call-sites. But anywhere the
 * old `variants`-based `useStaggerContainer` + `useStaggerItem`
 * pattern is in play, Framer's parent↔child variant orchestration
 * persists the "hidden" variant state into the child's MotionValue
 * across re-renders — the new config doesn't retroactively unstick
 * it, so those cards stay invisible. (Observed: inline style says
 * `opacity:1; transform:none`, computed says `opacity:0;
 * transform:matrix(…,16)`.)
 *
 * Rather than rewrite every call-site, this component runs one tiny
 * effect after hydration: when reduced-motion is active, it finds
 * any element with inline `opacity:0` (left by SSR or the variant
 * system) and forces it back to the visible baseline. No animation,
 * no flicker, no accessibility violation — just removes the stuck
 * state.
 *
 * Mount once at the locale layout level so every page benefits.
 */
export function ReducedMotionBaselineGuard() {
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (!shouldReduce) return

    const reset = () => {
      const stuck = document.querySelectorAll<HTMLElement>(
        '[style*="opacity: 0"], [style*="opacity:0"]',
      )
      for (const el of stuck) {
        // Preserve any non-opacity/transform inline styles; only flip
        // the two properties we know break reveal under reduced motion.
        el.style.opacity = "1"
        el.style.transform = "none"
      }
    }

    // First pass immediately after hydration.
    reset()

    // Second pass on the next animation frame — some Framer updates
    // happen in an rAF after the initial render, and without this
    // follow-up the variant system would re-paint opacity:0 after
    // we cleared it.
    const raf = requestAnimationFrame(reset)

    // Third safety net ~200ms out for stagger orchestrations that
    // schedule their own micro-delays.
    const timer = window.setTimeout(reset, 200)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [shouldReduce])

  return null
}
