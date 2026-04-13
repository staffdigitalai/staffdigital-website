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
    <section className="py-24 sm:py-32 px-6 sm:px-8 animate-fade-in-section">
      <div className="max-w-6xl mx-auto">
        {/* Header — Editorial style */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            <span className="text-foreground">{t("title_plain")} </span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
              {t("title_gradient")}
            </span>
          </h2>
        </div>

        {/* Grid — Premium cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-foreground/[0.02] dark:bg-white/[0.03] p-6 sm:p-7 rounded-2xl transition-all duration-400 hover:bg-foreground/[0.04] dark:hover:bg-white/[0.05] border border-foreground/[0.06] dark:border-white/[0.08] hover:border-foreground/[0.12] dark:hover:border-white/[0.15] overflow-hidden ${
                items.length % 3 === 1 && index === items.length - 1
                  ? "lg:col-span-3 lg:max-w-md lg:mx-auto"
                  : ""
              }`}
            >
              {/* Emoji with subtle background */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.02] dark:from-white/[0.06] dark:to-white/[0.03] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <span className="text-2xl">{item.emoji}</span>
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-foreground text-lg mb-2.5 leading-snug">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm sm:text-[0.9375rem] text-foreground/55 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA — Premium link style */}
        <div className="text-center mt-14 sm:mt-16">
          <Link
            href="/soluciones"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[#0078AA] dark:text-[#00D4FF] font-semibold text-base transition-all duration-300 hover:bg-[#0078AA]/[0.06] dark:hover:bg-[#00D4FF]/[0.08] group"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
