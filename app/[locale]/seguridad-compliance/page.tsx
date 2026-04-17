import type { Metadata } from "next"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { buildPageMetadata, getPage } from "@/lib/wordpress"
import { SeguridadContent } from "./seguridad-content"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("seguridad-compliance", locale, {
    title: "Seguridad y Compliance - StaffDigital AI",
    description:
      "Seguridad de nivel empresarial. RGPD, ISO 27001, encriptacion de datos y cumplimiento normativo garantizado.",
  })
}

export default async function SeguridadPage() {
  let page = null
  try {
    page = await getPage("seguridad-compliance")
  } catch (error) {
    console.error("Error fetching seguridad page:", error)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GlassmorphismNav />
      <main className="flex-1 pt-20">
        <PageWrapper
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Seguridad y Compliance" },
          ]}
        >
          <SeguridadContent page={page} />
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}
