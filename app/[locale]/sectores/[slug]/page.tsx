import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getSectorPage, stripHtml, buildLocalizedAlternates, type WPSectorPage, type SupportedLang } from "@/lib/wordpress"
import { DynamicSectorClient } from "./dynamic-sector-client"
import { LocalizedSlugs } from "@/components/localized-slugs-provider"

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const STATIC_SECTOR_SLUGS: string[] = []

export const revalidate = 300
export const dynamicParams = true

// Next.js locale → WPML language code (ES master, EN and PT-PT translations).
function toWpmlLang(locale: string): SupportedLang {
  if (locale === "pt") return "pt-pt"
  if (locale === "en") return "en"
  return "es"
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params

  if (STATIC_SECTOR_SLUGS.includes(slug)) return {}

  try {
    const sector = await getSectorPage(slug, toWpmlLang(locale))
    if (!sector) return {}

    const yoast = (sector as Record<string, unknown>).yoast_head_json as Record<string, unknown> | undefined
    const fallbackTitle = stripHtml(sector.title.rendered)
    const fallbackDesc = stripHtml(sector.excerpt?.rendered ?? "").slice(0, 160)

    const title = (yoast?.title as string)?.replace(/ \| StaffDigital AI$/i, "") || fallbackTitle
    const description = (yoast?.description as string) || fallbackDesc

    // Override layout's naive prefix-swap alternates with real WPML
    // translations (ES "clinicas" → EN "ai-clinics-medical-centers").
    const alternates = buildLocalizedAlternates(
      locale,
      sector.slug,
      "/sectores",
      sector.wpml_translations,
    )

    return {
      title,
      description,
      alternates,
      openGraph: {
        title: (yoast?.og_title as string) || title,
        description: (yoast?.og_description as string) || description,
        images: (yoast?.og_image as Array<{ url: string }>)?.map(i => i.url) || [],
        type: "website",
        siteName: "StaffDigital AI",
      },
      twitter: {
        card: "summary_large_image",
        title: (yoast?.og_title as string) || title,
        description: (yoast?.og_description as string) || description,
      },
    }
  } catch {
    return {}
  }
}

export default async function DynamicSectorPage({ params }: Props) {
  const { slug, locale } = await params

  if (STATIC_SECTOR_SLUGS.includes(slug)) {
    notFound()
  }

  let sector: WPSectorPage | null = null

  try {
    sector = await getSectorPage(slug, toWpmlLang(locale))
  } catch (error) {
    console.error("[sector page] fetch error:", slug, error)
  }

  if (!sector) {
    notFound()
  }

  // Publish per-locale slug map so the nav language switcher can navigate
  // to the correct localized URL instead of 404'ing on a slug-prefix swap.
  const localizedSlugMap = {
    es: sector.wpml_translations?.es?.slug ?? (locale === "es" ? sector.slug : undefined),
    en: sector.wpml_translations?.en?.slug ?? (locale === "en" ? sector.slug : undefined),
    pt: sector.wpml_translations?.["pt-pt"]?.slug ?? (locale === "pt" ? sector.slug : undefined),
  }

  return (
    <>
      <LocalizedSlugs basePath="/sectores" slugs={localizedSlugMap} />
      <DynamicSectorClient sector={sector} locale={locale} />
    </>
  )
}
