import type { Metadata } from "next"
import { buildPageMetadata, getPage, stripHtml , toWpmlLang} from "@/lib/wordpress"
import { PartnersClient } from "./partners-client"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("partners", locale, {
    title: "Partners Tecnológicos | StaffDigital AI",
    description:
      "Alianzas con los mejores proveedores de IA, telecomunicaciones y CRM. Nuestros partners garantizan la máxima calidad de servicio.",
  })
}

export const revalidate = 3600

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let page = null
  try {
    page = await getPage("partners", toWpmlLang(locale))
  } catch (error) {
    console.error("Error fetching partners page:", error)
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <PartnersClient page={page} />
    </main>
  )
}
