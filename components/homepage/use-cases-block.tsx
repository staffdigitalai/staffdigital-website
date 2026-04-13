"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

interface UseCaseItem {
  emoji: string
  title: string
  description: string
}

export function UseCasesBlock() {
  const t = useTranslations("use_cases")

  const items = t.raw("items") as UseCaseItem[]

  return (
    <section className="py-20 px-4 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-foreground">{t("title_plain")} </span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
              {t("title_gradient")}
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`card-elevated p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                items.length % 3 === 1 && index === items.length - 1
                  ? "lg:col-span-3 lg:max-w-md lg:mx-auto"
                  : items.length % 3 === 2 && index >= items.length - 2
                  ? ""
                  : ""
              }`}
            >
              <span className="text-3xl block mb-3">{item.emoji}</span>
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/soluciones"
            className="inline-flex items-center gap-2 text-[#0078AA] dark:text-[var(--neon-blue)] font-semibold hover:underline underline-offset-4 transition-all group"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
