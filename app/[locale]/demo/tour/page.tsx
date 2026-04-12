import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { TourClient } from "@/components/product-tour/tour-client"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tour")
  return {
    title: `${t("meta_title")} | StaffDigital AI`,
    description: t("meta_description"),
    openGraph: {
      title: `${t("meta_title")} | StaffDigital AI`,
      description: t("meta_description"),
      type: "website",
    },
  }
}

export default function TourPage() {
  return (
    <>
      <GlassmorphismNav />
      <main className="min-h-screen pt-20 pb-12 bg-background">
        <TourClient />
      </main>
      <Footer />
    </>
  )
}
