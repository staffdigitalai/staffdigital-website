"use client"

import { useEffect } from "react"
import { useReducedMotion } from "framer-motion"

/**
 * Runtime guard for users with `prefers-reduced-motion: reduce`.
 *
 * Chrome-MCP diagnostics on PR #84 preview showed two related failure
 * modes under reduced motion:
 *
 *   1. SSR emitted `style="opacity:0; transform:translate(...,N)"` from
 *      the motion hooks' `initial` state (because
 *      `useReducedMotion()` returns `null` at SSR, so the hook took
 *      the motion-enabled branch). Users with reduced motion never
 *      got the reveal transition, so content stayed invisible.
 *
 *   2. For call-sites using Framer's variant-based stagger
 *      (`useStaggerContainer` + `useStaggerItem`), the updated hook
 *      returns new non-variant props, BUT Framer's parent↔child
 *      variant orchestration keeps a MotionValue in the "hidden"
 *      state across re-renders. The inline style reads `opacity:1;
 *      transform:none` (what the hook wrote) but the computed style
 *      is `opacity:0; transform:matrix(...,16)` (what the persistent
 *      MotionValue paints). Inline-style-based reset doesn't help
 *      because the inline is already correct.
 *
 * Fix here: on mount (and on rAF, and once more ~200ms later for
 * stagger delays), walk every element that Framer might have stuck
 * and stamp it with an inline `!important` opacity/transform override
 * via `cssText`. The important flag wins over Framer's MotionValue
 * style writes.
 *
 * Touches nothing for users without reduced motion (the hook's own
 * shouldReduce gate bails out).
 */
export function ReducedMotionBaselineGuard() {
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (!shouldReduce) return

    const reset = () => {
      // Target every element that sits in the hidden pose under
      // reduced motion. Either inline says opacity:0 (path 1 above)
      // or the computed box disagrees with a stated opacity/transform
      // baseline (path 2 — Framer MotionValue stuck).
      const all = document.querySelectorAll<HTMLElement>("*")
      for (const el of all) {
        const cs = getComputedStyle(el)
        const computedOpacity = parseFloat(cs.opacity)
        const computedTransform = cs.transform
        const hasTranslate =
          computedTransform !== "none" &&
          /matrix\([^)]*,\s*-?\d+(?:\.\d+)?\s*\)/.test(computedTransform) &&
          // Only match simple translate-y matrices — avoid breaking
          // rotations, scales, perspective transforms on unrelated
          // elements (buttons, hover cards, icons, etc.).
          /matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*-?\d/.test(computedTransform)

        if (computedOpacity < 0.99 || hasTranslate) {
          // Only reset elements that have an existing inline `style`
          // already touched by Framer (to avoid clobbering intentional
          // decorative opacity like `/20`, `/40` overlays that are
          // applied via Tailwind classes, not inline). Framer always
          // writes inline style on its motion.div renders.
          const inline = el.getAttribute("style") || ""
          if (!inline.includes("opacity") && !inline.includes("transform")) continue

          // Preserve non-opacity/transform declarations, append
          // `!important` versions of our two baseline properties.
          const preserved = inline
            .split(";")
            .map((d) => d.trim())
            .filter((d) => d && !/^(opacity|transform)\s*:/.test(d))
            .join("; ")
          el.style.cssText =
            (preserved ? preserved + "; " : "") +
            "opacity: 1 !important; transform: none !important;"
        }
      }
    }

    reset()
    const raf = requestAnimationFrame(reset)
    const t1 = window.setTimeout(reset, 200)
    const t2 = window.setTimeout(reset, 600)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [shouldReduce])

  return null
}
