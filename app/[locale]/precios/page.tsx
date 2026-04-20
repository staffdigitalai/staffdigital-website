import type { Metadata } from "next"
import { Suspense } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { buildPageMetadata, getPage , toWpmlLang} from "@/lib/wordpress"
import { PricingContent } from "./pricing-content"

export const revalidate = 300 // 5 minutes

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("precios", locale, {
    title: "Precios - Agentes IA con Voz Humana",
    description:
      "Agentes IA con voz humana desde 250 EUR/mes. Planes Essential, Professional y Enterprise. Piloto 30 dias sin compromiso.",
  })
}

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let page = null
  try {
    page = await getPage("precios", toWpmlLang(locale))
  } catch (error) {
    console.error("Error fetching pricing page:", error)
  }

  return (
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
