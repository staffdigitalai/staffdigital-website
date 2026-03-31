import { notFound } from "next/navigation"
import { getService, stripHtml, type WPService } from "@/lib/wordpress"
import { DynamicServiceClient } from "./dynamic-service-client"

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <DynamicServiceClient service={service} />
    </>
  )
}
