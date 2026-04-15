import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getSectorPage, stripHtml, type WPSectorPage } from "@/lib/wordpress"
import { DynamicSectorClient } from "./dynamic-sector-client"

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const STATIC_SECTOR_SLUGS: string[] = []

export const revalidate = 300
export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (STATIC_SECTOR_SLUGS.includes(slug)) return {}

  try {
    const sector = await getSectorPage(slug)
    if (!sector) return {}

    const yoast = (sector as Record<string, unknown>).yoast_head_json as Record<string, unknown> | undefined
    const fallbackTitle = stripHtml(sector.title.rendered)
    const fallbackDesc = stripHtml(sector.excerpt?.rendered ?? "").slice(0, 160)

    const title = (yoast?.title as string)?.replace(/ \| StaffDigital AI$/i, "") || fallbackTitle
    const description = (yoast?.description as string) || fallbackDesc

    return {
      title,
      description,
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
  const { slug } = await params

  if (STATIC_SECTOR_SLUGS.includes(slug)) {
    notFound()
  }

  let sector: WPSectorPage | null = null

  try {
    sector = await getSectorPage(slug)
  } catch (error) {
    console.error("[sector page] fetch error:", slug, error)
  }

  if (!sector) {
    notFound()
  }

  return <DynamicSectorClient sector={sector} />
}
