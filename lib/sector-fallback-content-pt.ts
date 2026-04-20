/**
 * Portuguese (pt-PT) locale overrides for the /sectores/[slug]
 * fallback content.
 *
 * Structure mirrors `sector-fallback-content.ts` exactly — same keys,
 * same arrays, same order — just translated to PT. When a slug is
 * missing from this map, `getSectorFallback(slug, "pt")` falls back
 * to the ES master content.
 *
 * **This file is intentionally empty in PR #88** (structural foundation
 * only). Content for the 19 sectors is populated in a separate PR.
 * Until then every /pt/sectores/* page continues to render the ES
 * fallback (pre-existing behaviour — no regression).
 */

import type { SectorFallback } from "./sector-fallback-content"

export const sectorFallbacksPt: Record<string, SectorFallback> = {
  // populated in PR #90 — pt content for the 19 /sectores slugs
}
