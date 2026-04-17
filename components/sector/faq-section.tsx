"use client"

import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { SectorFaqItem } from "@/lib/sector-fallback-content"

interface SectorFaqSectionProps {
  faqs: SectorFaqItem[]
  title: string
  subtitle?: string
}

export function SectorFaqSection({ faqs, title, subtitle }: SectorFaqSectionProps) {
  if (!faqs.length) return null

  // Schema.org FAQPage structured data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.respuesta,
      },
    })),
  }

  return (
    <section
      aria-labelledby="sector-faq-title"
      className="px-4 sm:px-6 py-20 md:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-14"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 border border-foreground/10 mb-5">
            <HelpCircle size={26} className="text-[#0078AA] dark:text-[#00D4FF]" aria-hidden="true" />
          </div>
          <h2
            id="sector-faq-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance leading-tight tracking-tight"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-lg text-foreground/55 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors px-5 sm:px-6"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                  {faq.pregunta}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-foreground/65 leading-relaxed pb-5">
                  {faq.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
