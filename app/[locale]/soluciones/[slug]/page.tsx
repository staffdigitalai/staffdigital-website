import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getService, getServices, stripHtml, type WPService } from "@/lib/wordpress"
import { DynamicServiceClient } from "./dynamic-service-client"

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

// Static slugs that have their own dedicated pages
const STATIC_SERVICE_SLUGS = ["home-staging-ia"]

export async function generateStaticParams() {
  try {
    const services = await getServices()
    return services
      .filter((service) => !STATIC_SERVICE_SLUGS.includes(service.slug))
      .map((service) => ({ slug: service.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (STATIC_SERVICE_SLUGS.includes(slug)) {
    return {}
  }

  try {
    const service = await getService(slug)
    if (!service) return { title: "Soluciones | StaffDigital AI" }

    const title = service.acf?.meta_title || `${service.title.rendered} | StaffDigital AI`
    const description = service.acf?.meta_description || stripHtml(service.excerpt.rendered)

    return { title, description, openGraph: { title, description } }
  } catch {
    return { title: "Soluciones | StaffDigital AI" }
  }
}

export const revalidate = 300

export default async function DynamicServicePage({ params }: Props) {
  const { slug } = await params

  if (STATIC_SERVICE_SLUGS.includes(slug)) {
    notFound()
  }

  let service: WPService | null = null

  try {
    service = await getService(slug)
  } catch (error) {
    console.error("[DynamicServicePage] WP fetch error:", slug, error)
  }

  if (!service) {
    notFound()
  }

  return <DynamicServiceClient service={service} />
}
