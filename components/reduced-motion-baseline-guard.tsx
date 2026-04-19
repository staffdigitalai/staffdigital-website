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
      // Chrome-MCP diagnostic proved the failure mode:
      // inline style on the card reads `opacity: 1 !important` (my
      // first guard pass wrote this) — yet computed opacity is still
      // 0. That can only happen via the Web Animations API, which
      // Framer uses internally: a WAAPI Animation with
      // `fill: forwards` pinned to opacity: 0 wins over any CSS,
      // including `!important`.
      //
      // Fix: find every element Framer touched (has inline style
      // containing opacity/transform), cancel any running WAAPI
      // animations on it, then stamp the visible baseline. Cancelling
      // lets the inline !important CSS take over.
      const candidates = document.querySelectorAll<HTMLElement>("[style]")
      for (const el of candidates) {
        const inline = el.getAttribute("style") || ""
        if (!inline.includes("opacity") && !inline.includes("transform")) continue

        // Cancel any animation Framer is driving on this element.
        // This releases the WAAPI-pinned opacity/transform so the
        // inline style takes effect.
        try {
          const anims = (el as HTMLElement & { getAnimations?: () => Animation[] }).getAnimations?.()
          if (anims && anims.length > 0) {
            for (const a of anims) a.cancel()
          }
        } catch {
          /* getAnimations not supported — fall through */
        }

        // Stamp visible baseline with !important.
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
