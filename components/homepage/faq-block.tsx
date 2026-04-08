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
        <div className="text-center mb-10">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "rgb(17, 24, 39)" }}
          >
            <span>Preguntas frecuentes </span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">sobre agentes IA</span>
          </h2>
          <p 
            className="max-w-xl mx-auto"
            style={{ color: "rgb(107, 114, 128)", fontSize: "16px" }}
          >
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg"
              style={{ 
                backgroundColor: "rgb(255, 255, 255)",
                border: open === i ? "1px solid rgb(229, 231, 235)" : "1px solid rgb(229, 231, 235)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                borderLeft: open === i ? "3px solid rgb(0, 120, 170)" : "1px solid rgb(229, 231, 235)",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
              >
                <span 
                  className="pr-4"
                  style={{ fontWeight: 600, fontSize: "16px", color: "rgb(17, 24, 39)" }}
                >
                  {faq.q}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  style={{ color: "rgb(0, 120, 170)" }}
                />
              </button>
              {open === i && (
                <div 
                  style={{ 
                    color: "rgb(75, 85, 99)", 
                    fontSize: "15px", 
                    lineHeight: 1.7,
                    padding: "0 20px 20px 20px"
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link 
            href="/faq" 
            className="inline-flex items-center gap-1 no-underline transition-colors duration-200 hover:underline"
            style={{ 
              color: "rgb(0, 120, 170)", 
              fontWeight: 500, 
              fontSize: "15px"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "rgb(124, 58, 237)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgb(0, 120, 170)"}
          >
            {t("view_all")} →
          </Link>
        </div>
      </div>
    </section>
  )
}
