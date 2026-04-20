import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { buildPageMetadata, getPage , toWpmlLang} from "@/lib/wordpress"
import { IntegracionesContent } from "./integraciones-content"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("integraciones", locale, {
    title: "Integraciónes - StaffDigital AI",
    description:
      "Conecta StaffDigital AI con tus herramientas favoritas. Salesforce, HubSpot, Google Calendar ymás de 100 integraciones.",
  })
}

export default async function IntegraciónesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let page = null
  try {
    page = await getPage("integraciones", toWpmlLang(locale))
  } catch (error) {
    console.error("Error fetching integraciones page:", error)
  }

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Integraciónes" },
      ]}
    >
      <IntegracionesContent page={page} />
    </PageWrapper>
  )
}
