import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { buildPageMetadata, getPage, toWpmlLang } from "@/lib/wordpress"
import { TecnologiaContent } from "./tecnologia-content"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("tecnologia", locale, {
    title: "Tecnologia - StaffDigital AI",
    description:
      "Descubre la tecnologia detras de StaffDigital AI. LLMs avanzados, procesamiento de lenguaje natural y mas.",
  })
}

export default async function TecnologiaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let page = null
  try {
    page = await getPage("tecnologia", toWpmlLang(locale))
  } catch (error) {
    console.error("Error fetching tecnologia page:", error)
  }

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Tecnologia" },
      ]}
    >
      <TecnologiaContent page={page} />
    </PageWrapper>
  )
}
