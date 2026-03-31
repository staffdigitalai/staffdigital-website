import type { Metadata } from "next"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { DynamicFaqSection } from "@/components/dynamic-faq-section"
import { getFaqs } from "@/lib/wordpress"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description: "Preguntas frecuentes sobre agentes IA con voz humana. Precios, integración, seguridad y mas.",
}

export const revalidate = 300

export default async function FaqPage() {
  // Fetch FAQs server-side for JSON-LD structured data
  let faqJsonLd: object | null = null
  try {
    const faqs = await getFaqs("es")
    if (faqs.length > 0) {
      faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs
          .filter((faq) => faq.acf?.pregunta && faq.acf?.respuesta)
          .map((faq) => ({
            "@type": "Question",
            name: faq.acf!.pregunta!,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.acf!.respuesta!,
            },
          })),
      }
    }
  } catch (error) {
    console.error("Error fetching FAQs for JSON-LD:", error)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <GlassmorphismNav />

      <div className="relative z-10 pt-24">
        <DynamicFaqSection showLanguageSelector={true} headingAs="h1" />
      </div>

      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Footer />
    </main>
  )
}
