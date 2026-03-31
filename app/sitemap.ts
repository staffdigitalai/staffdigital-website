import type { MetadataRoute } from "next"
import { locales, defaultLocale } from "@/i18n/config"

const BASE_URL = "https://www.staffdigital.ai"
const WP_API = "https://cms.staffdigital.ai/wp-json/wp/v2"

const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.9, changeFrequency: "daily" },
  { path: "/casos-exito", priority: 0.9, changeFrequency: "weekly" },
  { path: "/precios", priority: 0.9, changeFrequency: "monthly" },
  { path: "/demo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/nosotros", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tecnologia", priority: 0.7, changeFrequency: "monthly" },
  { path: "/integraciones", priority: 0.7, changeFrequency: "monthly" },
  { path: "/metodologia", priority: 0.7, changeFrequency: "monthly" },
  { path: "/seguridad-compliance", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
  { path: "/demo-voice", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/whatsapp-ia-empresas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/agentes-ia-voz-humana", priority: 1.0, changeFrequency: "weekly" },
  { path: "/soluciones/atencion-telefonica-ia", priority: 0.9, changeFrequency: "monthly" },
  { path: "/soluciones/agente-chat-web-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/agente-chat-productos-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/ia-omnicanal", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/agente-ventas-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/ia-call-center", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/automacion-ventas-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/agente-soporte-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/agente-agendamientos-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/lead-generation-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/onboarding-automatico", priority: 0.7, changeFrequency: "monthly" },
  { path: "/soluciones/home-staging-ia", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/concesionarios", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/restaurantes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/clinicas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/peluquerias", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/retail", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/oficinas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/almacenes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/servicios-tecnicos", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/inmobiliarias", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/educacion", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/gimnasios", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/dentistas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/centros-belleza", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/turismo-hoteleria", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/saas-startups", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/ecommerce", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/logistica", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/lead-generation-pymes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/crm-automation", priority: 0.7, changeFrequency: "monthly" },
]

function buildAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {}
  for (const locale of locales) {
    const prefix = locale === defaultLocale ? "" : `/${locale}`
    alternates[locale] = `${BASE_URL}${prefix}${path}`
  }
  alternates["x-default"] = `${BASE_URL}${path}`
  return alternates
}

async function fetchWPSlugs(type: "posts" | "cases"): Promise<{ slug: string; modified: string }[]> {
  try {
    const endpoint = type === "posts" ? "posts" : "cases"
    const res = await fetch(`${WP_API}/${endpoint}?per_page=100&_fields=slug,modified`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.map((item: { slug: string; modified: string }) => ({
      slug: item.slug,
      modified: item.modified,
    }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, cases] = await Promise.all([
    fetchWPSlugs("posts"),
    fetchWPSlugs("cases"),
  ])

  const allPaths = [
    ...staticPages.map((p) => ({ path: p.path, lastmod: new Date(), freq: p.changeFrequency, prio: p.priority })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: new Date(p.modified), freq: "weekly" as const, prio: 0.6 })),
    ...cases.map((c) => ({ path: `/casos/${c.slug}`, lastmod: new Date(c.modified), freq: "monthly" as const, prio: 0.6 })),
  ]

  // Generate entries for each locale
  const entries: MetadataRoute.Sitemap = []

  for (const item of allPaths) {
    for (const locale of locales) {
      const prefix = locale === defaultLocale ? "" : `/${locale}`
      entries.push({
        url: `${BASE_URL}${prefix}${item.path}`,
        lastModified: item.lastmod,
        changeFrequency: item.freq,
        priority: item.prio,
        alternates: {
          languages: buildAlternates(item.path),
        },
      })
    }
  }

  return entries
}
