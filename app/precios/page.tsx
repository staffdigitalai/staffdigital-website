import type { Metadata } from "next"
import { Suspense } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { getPage } from "@/lib/wordpress"
import { PricingContent } from "./pricing-content"

export const revalidate = 300 // 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  let page = null
  try {
    page = await getPage("precios")
  } catch (error) {
    console.error("Error fetching pricing page:", error)
  }

  return {
    title: page?.acf?.meta_title || "Precios - StaffDigital AI",
    description:
      page?.acf?.meta_description ||
      "Planes y precios de StaffDigital AI. Soluciones de IA para automatizar tu negocio desde 299 EUR/mes.",
    openGraph: {
      title: page?.acf?.meta_title || "Precios - StaffDigital AI",
      description:
        page?.acf?.meta_description ||
        "Descubre nuestros planes y elige el que mejor se adapte a tu negocio.",
      type: "website",
    },
  }
}

export default async function PreciosPage() {
  let page = null
  try {
    page = await getPage("precios")
  } catch (error) {
    console.error("Error fetching pricing page:", error)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GlassmorphismNav />
      <main className="flex-1 pt-20">
        <PageWrapper
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Precios" },
          ]}
        >
          <Suspense fallback={<PricingPageSkeleton />}>
            <PricingContent page={page} />
          </Suspense>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}

function PricingPageSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="text-center space-y-4">
        <div className="h-12 bg-muted rounded-lg w-64 mx-auto" />
        <div className="h-6 bg-muted rounded-lg w-96 mx-auto" />
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-muted rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
