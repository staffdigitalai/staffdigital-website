/**
 * Localized slug maps for WP custom post types + a helper to build
 * locale-aware URLs.
 *
 * Background: WPML gives every translatable post/CPT its own slug per
 * locale. ES is the master; EN and PT-PT slugs are stored in the WP
 * `wpml_translations` field. When the app constructs a `<Link>` to a
 * service or sector, it must resolve to the correct locale-specific
 * slug — a naive `/soluciones/ia-omnicanal` href routes to
 * `/en/soluciones/ia-omnicanal` under next-intl's `as-needed` prefix
 * rule, but that EN URL doesn't exist (the EN slug is
 * `omnichannel-conversational-ai`). Result: 404.
 *
 * This module is the single source of truth for those per-locale
 * slugs. Any component that renders a `/soluciones/<slug>` or
 * `/sectores/<slug>` href should call `cptPath()` from here. The nav
 * (first to need it, PR #77), the footer (PR this branch), and any
 * future call-site all import the same data.
 *
 * When WP adds a new sector or service, add one row to the appropriate
 * map below with the ES / EN / PT slugs (from
 * `wp/v2/{services|sector-pages}?slug=<es-slug>&lang=es`'s
 * `wpml_translations` response).
 */

export const SERVICE_SLUGS: Record<string, { en: string; pt: string }> = {
  "agentes-ia-voz-humana":     { en: "ai-agents-human-voice",         pt: "agentes-ia-voz-humana-2" },
  "agente-ventas-ia":          { en: "ai-sales-agent",                pt: "agente-vendas-ia" },
  "agente-soporte-ia":         { en: "ai-support-agent",              pt: "agente-suporte-ia" },
  "agente-agendamientos-ia":   { en: "ai-scheduling-agent",           pt: "agente-agendamentos-ia" },
  "agente-chat-web-ia":        { en: "intelligent-website-chat",      pt: "chat-inteligente-websites" },
  "agente-chat-productos-ia":  { en: "intelligent-product-chat",      pt: "chat-inteligente-produtos" },
  "whatsapp-ia-empresas":      { en: "ai-whatsapp-business",          pt: "whatsapp-ia-empresas-2" },
  "ia-omnicanal":              { en: "omnichannel-conversational-ai", pt: "ia-conversacional-omnicanal" },
  "ia-call-center":            { en: "ai-call-center",                pt: "ia-call-center-2" },
  "atencion-telefonica-ia":    { en: "ai-phone-support",              pt: "atendimento-telefonico-ia" },
  "automacion-ventas-ia":      { en: "ai-sales-funnel",               pt: "funil-vendas-ia" },
  "lead-generation-ia":        { en: "ai-lead-generation",            pt: "lead-generation-ia-2" },
  "onboarding-automatico":     { en: "automated-ai-onboarding",       pt: "onboarding-automatico-ia" },
}

export const SECTOR_SLUGS: Record<string, { en: string; pt: string }> = {
  // Featured
  "clinicas":              { en: "ai-clinics-medical-centers",  pt: "ia-clinicas-centros-medicos" },
  "restaurantes":          { en: "ai-restaurants-hospitality",  pt: "ia-restaurantes-hotelaria" },
  "inmobiliarias":         { en: "ai-real-estate",              pt: "ia-imobiliarias" },
  "ecommerce":             { en: "ai-ecommerce",                pt: "ia-ecommerce" },
  // All sectors
  "centros-belleza":       { en: "ai-beauty-aesthetics",        pt: "ia-centros-beleza-estetica" },
  "clubs-deportivos":      { en: "sports-clubs",                pt: "clubes-desportivos" },
  "concesionarios":        { en: "ai-car-dealerships",          pt: "ia-concessionarios-automoveis" },
  "crm-automation":        { en: "ai-crm-automation",           pt: "crm-automation-ia" },
  "despachos-abogados":    { en: "law-firms",                   pt: "escritorios-advogados" },
  "educacion":             { en: "ai-education-training",       pt: "ia-centros-educativos-formacao" },
  "gimnasios":             { en: "ai-gyms-sports-centers",      pt: "ia-ginasios-centros-desportivos" },
  "home-staging-virtual":  { en: "virtual-home-staging-ai",     pt: "home-staging-virtual-ia" },
  "lead-generation-pymes": { en: "ai-lead-generation-smbs",     pt: "lead-generation-ia-pmes" },
  "logistica":             { en: "ai-logistics-transport",      pt: "ia-logistica-transporte" },
  "oficinas":              { en: "ai-professional-offices",     pt: "ia-escritorios-gabinetes" },
  "retail":                { en: "ai-retail-commerce",          pt: "ia-retalho-comercio" },
  "saas-startups":         { en: "ai-saas-startups",            pt: "ia-saas-startups" },
  "servicios-tecnicos":    { en: "ai-technical-services",       pt: "ia-servicos-tecnicos" },
  "turismo-hoteleria":     { en: "ai-tourism-hospitality",      pt: "ia-turismo-hotelaria" },
}

export type CptBase = "/soluciones" | "/sectores"

/**
 * Build a locale-aware path like `/en/soluciones/ai-sales-agent` from
 * the ES master slug.
 *
 * Falls back to the ES slug when a translation is missing, so the link
 * still resolves to something sensible (the landing page handles 404s
 * gracefully via WPML's own fallback chain). ES returns no prefix,
 * matching next-intl's `as-needed` configuration.
 */
export function cptPath(
  base: CptBase,
  esSlug: string,
  locale: string,
  slugMap: Record<string, { en: string; pt: string }>,
): string {
  const targetSlug =
    locale === "en" ? (slugMap[esSlug]?.en ?? esSlug) :
    locale === "pt" ? (slugMap[esSlug]?.pt ?? esSlug) :
    esSlug
  const prefix = locale === "es" ? "" : `/${locale}`
  return `${prefix}${base}/${targetSlug}`
}
