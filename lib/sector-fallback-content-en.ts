/**
 * English locale overrides for the /sectores/[slug] fallback content.
 *
 * Structure mirrors `sector-fallback-content.ts` exactly — same keys,
 * same arrays, same order — just translated to EN. When a slug is
 * missing from this map, `getSectorFallback(slug, "en")` falls back
 * to the ES master content.
 *
 * **This file is intentionally empty in PR #88** (structural foundation
 * only). Content for the 19 sectors is populated in a separate PR.
 * Until then every /en/sectores/* page continues to render the ES
 * fallback (pre-existing behaviour — no regression).
 */

import type { SectorFallback } from "./sector-fallback-content"

export const sectorFallbacksEn: Record<string, SectorFallback> = {
  // populated in PR #89 — en content for the 19 /sectores slugs
}
