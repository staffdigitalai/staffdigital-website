import { notFound } from "next/navigation"
import { getSectorPage, type WPSectorPage } from "@/lib/wordpress"
import { DynamicSectorClient } from "./dynamic-sector-client"

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const STATIC_SECTOR_SLUGS = [
  "clinicas", "dentistas", "peluquerias", "restaurantes",
  "concesionarios", "retail", "oficinas", "almacenes",
  "servicios-tecnicos", "educacion", "gimnasios", "inmobiliarias",
]

export const revalidate = 300
export const dynamicParams = true

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
