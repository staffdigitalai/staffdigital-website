import { notFound } from "next/navigation"
import { getService, stripHtml, type WPService } from "@/lib/wordpress"
import { DynamicServiceClient } from "./dynamic-service-client"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { BackgroundEffects } from "@/components/background-effects"

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const STATIC_SERVICE_SLUGS = ["home-staging-ia"]

export const revalidate = 300
export const dynamicParams = true

export default async function DynamicServicePage({ params }: Props) {
  const { slug } = await params

  if (STATIC_SERVICE_SLUGS.includes(slug)) {
    notFound()
  }

  let service: WPService | null = null

  try {
    service = await getService(slug)
  } catch (error) {
    console.error("[service page] fetch error:", slug, error)
  }

  if (!service) {
    notFound()
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
