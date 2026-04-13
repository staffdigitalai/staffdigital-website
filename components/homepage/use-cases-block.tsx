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
    <section className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
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
              className={`group relative card-premium p-6 rounded-xl overflow-hidden ${
                items.length % 3 === 1 && index === items.length - 1
                  ? "lg:col-span-3 lg:max-w-sm lg:mx-auto"
                  : ""
              }`}
            >
              {/* Emoji */}
              <div className="w-10 h-10 rounded-lg bg-foreground/[0.03] dark:bg-white/[0.05] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                <span className="text-xl">{item.emoji}</span>
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-foreground text-base mb-2 leading-snug">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-foreground/50 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-14">
          <Link
            href="/soluciones"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#0078AA] dark:text-[#00D4FF] font-semibold text-sm transition-all duration-300 hover:bg-[#0078AA]/[0.06] dark:hover:bg-[#00D4FF]/[0.08] border border-[#0078AA]/15 dark:border-[#00D4FF]/15 group"
          >
            {t("cta")}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
