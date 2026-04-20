/**
 * Portuguese (pt-PT) locale overrides for the /soluciones/[slug]
 * fallback content.
 *
 * Structure mirrors `solution-fallback-content.ts` exactly — same keys,
 * same arrays, same order — just translated to PT. When a slug is
 * missing from this map, `getSolutionFallback(slug, "pt")` falls back
 * to the ES master content.
 *
 * **This file is intentionally empty in PR #88** (structural foundation
 * only). Content for the 13 solutions is populated in a separate PR.
 * Until then every /pt/soluciones/* page continues to render the ES
 * fallback (pre-existing behaviour — no regression).
 */

import type { SolutionFallback } from "./solution-fallback-content"

export const solutionFallbacksPt: Record<string, SolutionFallback> = {
  // populated in PR #90 — pt content for the 13 /soluciones slugs
}
