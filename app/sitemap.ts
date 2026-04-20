import type { MetadataRoute } from "next"
import { locales } from "@/i18n/config"

const BASE_URL = "https://www.staffdigital.ai"
const WP_API = "https://cms.staffdigital.ai/wp-json/wp/v2"

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"]

/**
 * Sitemap with correct per-locale WPML slugs.
 *
 * Previously the sitemap concatenated the ES master slug under every
 * locale prefix, which produced URLs like
 *   https://www.staffdigital.ai/en/blog/telemedicina-ia-pacientes
 * …but EN posts use a different slug (`telemedicine-ai-patient-followup`),
 * so every non-ES entry pointed at a 404. Google Search Console would
 * flag hreflang mismatches in bulk and slow indexation.
 *
 * Fix: for each translatable WP CPT (posts / cases / sector-pages /
 * services) we fetch `wpml_translations` and emit entries using the
 * real per-locale slug. The `<xhtml:link rel="alternate" hreflang>`
 * block points at the actual localized URL.
 *
 * Also drops three deprecated sector paths (peluquerias, almacenes,
 * dentistas) that don't exist in the WP catalog — they were
 * leftovers from an older plan and 404'd in the sitemap. The list
 * is now driven directly from WP via `sector-pages`, so no manual
 * maintenance when editors add or remove sectors.
 */

// ─── Static (locale-uniform) pages ────────────────────────────────
// Slug is identical across locales; only the /{locale} prefix differs.
const staticPages: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "/",                    priority: 1.0, changeFrequency: "weekly" },
  { path: "/blog",                priority: 0.9, changeFrequency: "daily" },
  { path: "/casos-exito",         priority: 0.9, changeFrequency: "weekly" },
  { path: "/precios",             priority: 0.9, changeFrequency: "monthly" },
  { path: "/demo",                priority: 0.9, changeFrequency: "monthly" },
  { path: "/nosotros",            priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq",                 priority: 0.7, changeFrequency: "monthly" },
  { path: "/tecnologia",          priority: 0.7, changeFrequency: "monthly" },
  { path: "/integraciones",       priority: 0.7, changeFrequency: "monthly" },
  { path: "/metodologia",         priority: 0.7, changeFrequency: "monthly" },
  { path: "/seguridad-compliance",priority: 0.7, changeFrequency: "monthly" },
  { path: "/contacto",            priority: 0.8, changeFrequency: "monthly" },
  { path: "/partners",            priority: 0.6, changeFrequency: "monthly" },
  { path: "/demo-voice",          priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones",          priority: 0.8, changeFrequency: "monthly" },
  { path: "/sectores",            priority: 0.7, changeFrequency: "monthly" },
  // Legal: low priority, rarely changes, but still indexable.
  { path: "/privacidad",          priority: 0.3, changeFrequency: "yearly" },
  { path: "/aviso-legal",         priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies",             priority: 0.3, changeFrequency: "yearly" },
  { path: "/terminos",            priority: 0.3, changeFrequency: "yearly" },
]

// ─── WP CPT fetching (all translatable) ───────────────────────────

interface WPMLTranslation {
  slug: string
}
interface WPMLTranslations {
  en?: WPMLTranslation
  "pt-pt"?: WPMLTranslation
}
interface WPItem {
  slug: string
  modified?: string
  wpml_translations?: WPMLTranslations
}

async function fetchCPT(endpoint: string): Promise<WPItem[]> {
  try {
    const url = `${WP_API}/${endpoint}?per_page=100&lang=es&_fields=slug,modified,wpml_translations`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    return (await res.json()) as WPItem[]
  } catch {
    return []
  }
}

interface CptConfig {
  endpoint: string
  basePath: string
  priority: number
  freq: Freq
}

const cptConfigs: CptConfig[] = [
  { endpoint: "posts",        basePath: "/blog",       priority: 0.6, freq: "weekly" },
  { endpoint: "cases",        basePath: "/casos",      priority: 0.6, freq: "monthly" },
  { endpoint: "sector-pages", basePath: "/sectores",   priority: 0.7, freq: "monthly" },
  { endpoint: "services",     basePath: "/soluciones", priority: 0.8, freq: "monthly" },
]

// ─── Path resolution ─────────────────────────────────────────────

/** Localized paths for one sitemap entry. `null` = no translation exists. */
interface LocalizedPaths {
  es: string | null
  en: string | null
  pt: string | null
  lastmod: Date
  freq: Freq
  prio: number
}

function pathsFromCpt(item: WPItem, basePath: string, prio: number, freq: Freq): LocalizedPaths {
  return {
    es: item.slug ? `${basePath}/${item.slug}` : null,
    en: item.wpml_translations?.en?.slug ? `${basePath}/${item.wpml_translations.en.slug}` : null,
    pt: item.wpml_translations?.["pt-pt"]?.slug ? `${basePath}/${item.wpml_translations["pt-pt"].slug}` : null,
    lastmod: item.modified ? new Date(item.modified) : new Date(),
    freq,
    prio,
  }
}

function pathsFromStatic(path: string, prio: number, freq: Freq): LocalizedPaths {
  return { es: path, en: path, pt: path, lastmod: new Date(), freq, prio }
}

/** Absolute URL for a given locale, or null if that locale has no translation. */
function urlForLocale(paths: LocalizedPaths, locale: string): string | null {
  if (locale === "es" && paths.es) return `${BASE_URL}${paths.es}`
  if (locale === "en" && paths.en) return `${BASE_URL}/en${paths.en}`
  if (locale === "pt" && paths.pt) return `${BASE_URL}/pt${paths.pt}`
  return null
}

/** hreflang map — only includes locales where the translation exists. */
function buildAlternates(paths: LocalizedPaths): Record<string, string> {
  const alts: Record<string, string> = {}
  if (paths.es) alts["es"] = `${BASE_URL}${paths.es}`
  if (paths.en) alts["en"] = `${BASE_URL}/en${paths.en}`
  if (paths.pt) alts["pt"] = `${BASE_URL}/pt${paths.pt}`
  // x-default always points to the ES master, per WPML convention.
  if (paths.es) alts["x-default"] = `${BASE_URL}${paths.es}`
  return alts
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // All CPTs fetched in parallel — one round-trip per endpoint, cached
  // by Next ISR at the 1h revalidate window set on each fetch.
  const cptResults = await Promise.all(cptConfigs.map((c) => fetchCPT(c.endpoint)))

  const cptPaths: LocalizedPaths[] = []
  cptResults.forEach((items, i) => {
    const cfg = cptConfigs[i]
    for (const item of items) {
      cptPaths.push(pathsFromCpt(item, cfg.basePath, cfg.priority, cfg.freq))
    }
  })

  const staticPaths = staticPages.map((p) =>
    pathsFromStatic(p.path, p.priority, p.changeFrequency),
  )

  const allPaths = [...staticPaths, ...cptPaths]
  const entries: MetadataRoute.Sitemap = []

  for (const p of allPaths) {
    for (const locale of locales) {
      const url = urlForLocale(p, locale)
      if (!url) continue // skip locales without a translation
      entries.push({
        url,
        lastModified: p.lastmod,
        changeFrequency: p.freq,
        priority: p.prio,
        alternates: { languages: buildAlternates(p) },
      })
    }
  }

  return entries
}
