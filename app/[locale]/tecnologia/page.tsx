import type { Metadata } from "next"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { getPage } from "@/lib/wordpress"
import { TecnologiaContent } from "./tecnologia-content"

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  let page = null
  try {
    page = await getPage("tecnologia")
  } catch (error) {
    console.error("Error fetching tecnologia page:", error)
  }

  return {
    title: page?.acf?.meta_title || "Tecnologia - StaffDigital AI",
    description:
      page?.acf?.meta_description ||
      "Descubre la tecnologia detras de StaffDigital AI. LLMs avanzados, procesamiento de lenguaje natural y mas.",
  }
}

export default async function TecnologiaPage() {
  let page = null
  try {
    page = await getPage("tecnologia")
  } catch (error) {
    console.error("Error fetching tecnologia page:", error)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GlassmorphismNav />
      <main className="flex-1 pt-20">
        <PageWrapper
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Tecnologia" },
          ]}
        >
          <TecnologiaContent page={page} />
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}
