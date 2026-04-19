/**
 * Estimate reading time from raw HTML content.
 * 200 wpm is a common average for skim-reading B2B material.
 */
export function estimateReadingTime(html: string, wpm = 200): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  const words = text ? text.split(" ").length : 0
  return Math.max(1, Math.ceil(words / wpm))
}

/**
 * Deterministic hash of a string → integer in [0, n). Used to pick a
 * gradient index for the featured-image fallback so the same post
 * always renders the same fallback colors.
 */
export function stringHashIndex(s: string, mod: number): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0
  }
  return h % mod
}
