import type { Metadata } from "next"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { buildPageMetadata, getPage } from "@/lib/wordpress"
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

export default async function NosotrosPage() {
  let page = null
  try {
    page = await getPage("nosotros")
  } catch (error) {
    console.error("Error fetching nosotros page:", error)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GlassmorphismNav />
      <main className="flex-1 pt-20">
        <PageWrapper
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Nosotros" },
          ]}
        >
          <NosotrosContent page={page} />
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}
