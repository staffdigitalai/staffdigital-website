import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getService, stripHtml, type WPService, type SupportedLang } from "@/lib/wordpress"
import { DynamicServiceClient } from "./dynamic-service-client"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { BackgroundEffects } from "@/components/background-effects"
import { LocalizedSlugs } from "@/components/localized-slugs-provider"

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const STATIC_SERVICE_SLUGS = ["home-staging-ia"]

export const revalidate = 300
export const dynamicParams = true

// Next.js locale → WPML language code (ES master, EN and PT-PT translations).
function toWpmlLang(locale: string): SupportedLang {
  if (locale === "pt") return "pt-pt"
  if (locale === "en") return "en"
  return "es"
}

// Dynamic SEO metadata from WordPress/Yoast
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params

  if (STATIC_SERVICE_SLUGS.includes(slug)) {
    return {}
  }

  try {
    const service = await getService(slug, toWpmlLang(locale))
    if (!service) return {}

    const yoast = service.yoast_head_json
    // Remove " | StaffDigital AI" suffix if present since layout.tsx adds it via template
    const cleanYoastTitle = yoast?.title?.replace(/ \| StaffDigital AI$/i, '')
    const fallbackTitle = stripHtml(service.title.rendered)
    const fallbackDescription = stripHtml(service.excerpt.rendered).slice(0, 160)

    return {
      title: cleanYoastTitle || fallbackTitle,
      description: yoast?.description || fallbackDescription,
      openGraph: {
        title: yoast?.og_title || fallbackTitle,
        description: yoast?.og_description || fallbackDescription,
        images: yoast?.og_image?.map(i => i.url) || [],
        type: "website",
        siteName: "StaffDigital AI",
      },
      twitter: {
        card: "summary_large_image",
        title: yoast?.og_title || fallbackTitle,
        description: yoast?.og_description || fallbackDescription,
      },
    }
  } catch {
    return {}
  }
}

export default async function DynamicServicePage({ params }: Props) {
  const { slug, locale } = await params

  if (STATIC_SERVICE_SLUGS.includes(slug)) {
    notFound()
  }

  let service: WPService | null = null

  try {
    service = await getService(slug, toWpmlLang(locale))
  } catch (error) {
    console.error("[service page] fetch error:", slug, error)
  }

  if (!service) {
    notFound()
  }

  // Publish per-locale slug map so the nav language switcher can navigate
  // to the correct localized URL instead of 404'ing on a slug-prefix swap.
  const localizedSlugMap = {
    es: service.wpml_translations?.es?.slug ?? (locale === "es" ? service.slug : undefined),
    en: service.wpml_translations?.en?.slug ?? (locale === "en" ? service.slug : undefined),
    pt: service.wpml_translations?.["pt-pt"]?.slug ?? (locale === "pt" ? service.slug : undefined),
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: stripHtml(service.title.rendered),
    description: stripHtml(service.excerpt.rendered).slice(0, 160),
    provider: {
      "@type": "Organization",
      name: "StaffDigital AI",
    },
    areaServed: ["ES", "PT"],
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden transition-colors duration-300">
      <LocalizedSlugs basePath="/soluciones" slugs={localizedSlugMap} />
      <main className="min-h-screen relative overflow-hidden">
        {/* Aurora background */}
        <div className="fixed inset-0 w-full h-full dark:opacity-100 opacity-30 transition-opacity duration-500">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        
        {/* Neon background effects (grid + floating orbs) */}
        <BackgroundEffects intensity="medium" />
        
        <div className="relative z-10">
          <GlassmorphismNav />
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
          />
          
          <DynamicServiceClient service={service} />
          
          <Footer />
        </div>
      </main>
    </div>
  )
}
