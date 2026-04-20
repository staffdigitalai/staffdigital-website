import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { buildPageMetadata, getPage , toWpmlLang} from "@/lib/wordpress"
import { DemoContent } from "./demo-content"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("demo", locale, {
    title: "Demo Gratuita - Agentes IA con Voz Humana",
    description:
      "Escucha la diferencia. Demo gratuita de agentes IA con voz humana. Voz masculina y femenina disponible.",
  })
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let page = null
  try {
    page = await getPage("demo", toWpmlLang(locale))
  } catch (error) {
    console.error("Error fetching demo page:", error)
  }

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Solicitar Demo" },
      ]}
    >
      <DemoContent page={page} />
    </PageWrapper>
  )
}
