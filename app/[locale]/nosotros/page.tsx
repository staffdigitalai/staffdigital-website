import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { buildPageMetadata, getPage , toWpmlLang} from "@/lib/wordpress"
import { NosotrosContent } from "./nosotros-content"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("nosotros", locale, {
    title: "Nosotros",
    description:
      "Especialistas en agentes IA con voz humana. Equipo, mision y valores de StaffDigital AI.",
  })
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let page = null
  try {
    page = await getPage("nosotros", toWpmlLang(locale))
  } catch (error) {
    console.error("Error fetching nosotros page:", error)
  }

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Nosotros" },
      ]}
    >
      <NosotrosContent page={page} />
    </PageWrapper>
  )
}
