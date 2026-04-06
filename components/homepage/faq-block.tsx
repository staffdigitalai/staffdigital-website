"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function FAQBlock() {
  const [open, setOpen] = useState<number | null>(null)
  const t = useTranslations("faq")

  const faqs = t.raw("items") as { q: string; a: string }[]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  }

  return (
    <section className="py-20 px-4">
      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-foreground/10 bg-foreground/5 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="font-medium text-foreground/90 text-sm pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-foreground/40 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-foreground/60 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/faq" className="text-sm text-foreground/50 hover:text-foreground/80 underline underline-offset-4 transition-colors">
            {t("view_all")} →
          </Link>
        </div>
      </div>
    </section>
  )
}
