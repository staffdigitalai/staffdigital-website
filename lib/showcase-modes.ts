/**
 * Map each /soluciones/[slug] (ES master slug) to the
 * AIWorking247Block mockup that best illustrates the solution.
 *
 * Used by the dynamic solution template to pick which live demo card
 * to show above the per-sector use-cases section. Keys are ES slugs
 * (the canonical identifier across locales); values are
 * `ShowcaseMode`s defined in `components/homepage/ai-working-247-block.tsx`.
 *
 * Unmapped slugs fall back to "all" — the full 6-card grid. That's
 * the safe default if a new slug lands in WP before this map is
 * updated (no component crash, just a broader demo).
 */

import type { ShowcaseMode } from "@/components/homepage/ai-working-247-block"

export const SOLUTION_SHOWCASE_MODE: Record<string, ShowcaseMode> = {
  "ia-omnicanal":             "all",           // 4-channel hub — whole grid is on-brief
  "whatsapp-ia-empresas":     "whatsapp",
  "atencion-telefonica-ia":   "voice",
  "ia-call-center":           "voice",
  "agentes-ia-voz-humana":    "voice",
  "agente-chat-web-ia":       "whatsapp",      // conversational chat — chat mockup is closest
  "agente-chat-productos-ia": "whatsapp",
  "agente-ventas-ia":         "leads",         // lead qualification progress bars
  "lead-generation-ia":       "leads",
  "agente-agendamientos-ia":  "calendar",
  "agente-soporte-ia":        "email",         // inbox ticket triage
  "onboarding-automatico":    "integrations",
  "automacion-ventas-ia":     "integrations",
}

export function getShowcaseMode(esSlug: string): ShowcaseMode {
  return SOLUTION_SHOWCASE_MODE[esSlug] ?? "all"
}
