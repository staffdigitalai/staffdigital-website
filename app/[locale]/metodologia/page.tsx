import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { buildPageMetadata, getPage , toWpmlLang} from "@/lib/wordpress"
import { MetodologiaContent } from "./metodologia-content"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("metodologia", locale, {
    title: "Metodologia - StaffDigital AI",
    description:
      "Descubre nuestro proceso de implementacion de IA. Metodologia probada enmás de 500 proyectos exitosos.",
  })
}

export default async function MetodologiaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let page = null
  try {
    page = await getPage("metodologia", toWpmlLang(locale))
  } catch (error) {
    console.error("Error fetching metodologia page:", error)
  }

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Metodologia" },
      ]}
    >
      <MetodologiaContent page={page} />
    </PageWrapper>
  )
}
