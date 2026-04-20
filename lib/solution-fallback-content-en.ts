/**
 * English locale overrides for the /soluciones/[slug] fallback content.
 *
 * Structure mirrors `solution-fallback-content.ts` exactly — same keys,
 * same arrays, same order — just translated to EN. When a slug is
 * missing from this map, `getSolutionFallback(slug, "en")` falls back
 * to the ES master content.
 *
 * **This file is intentionally empty in PR #88** (structural foundation
 * only). Content for the 13 solutions is populated in a separate PR
 * to keep each PR reviewable. Until then every /en/soluciones/* page
 * continues to render the ES fallback content (the pre-existing
 * behaviour — no regression). The only user-visible change in PR #88
 * is that the UI chrome around the content (section titles, CTAs,
 * category badges) is already localized via the `solution_ui` and
 * new `sector_ui` i18n namespaces.
 */

import type { SolutionFallback } from "./solution-fallback-content"

export const solutionFallbacksEn: Record<string, SolutionFallback> = {
  // populated in PR #89 — en content for the 13 /soluciones slugs
}
