"use client"

import { useEffect, useState } from "react"

/**
 * Thin brand-primary bar at the top of the viewport that fills as the
 * user scrolls through the article. `prefers-reduced-motion: reduce`
 * users still see the bar (it's information, not decoration) — only
 * the width transition is disabled so the bar just steps between
 * positions instead of animating.
 */
export function ReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const next = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setPct(next)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    // Expose a data attr so CSS can optionally disable the transition.
    if (reduced) document.documentElement.setAttribute("data-reduced-motion", "true")

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
    >
      <div
        className="h-full bg-brand-primary transition-[width] duration-100 ease-out [html[data-reduced-motion='true']_&]:transition-none"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
