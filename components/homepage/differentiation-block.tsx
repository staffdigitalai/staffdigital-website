"use client"

import { X, Check, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

export function DifferentiationBlock() {
  const t = useTranslations("differentiation")
  const points = t.raw("points") as string[]
  const genericItems = t.raw("comparison_generic_items") as string[]

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden bg-white dark:bg-bg-elevated">
      <div className="max-w-5xl mx-auto relative">
        {/* HEADER — centered */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
            <span className="text-foreground">{t("comparison_title_prefix")}</span>
            <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
              {t("comparison_title_brand")}
            </span>
          </h2>
          <p className="text-foreground/55 dark:text-foreground/50 text-base sm:text-lg leading-[1.7] max-w-2xl mx-auto">
            {t("comparison_subtitle")}
          </p>
        </div>

        {/* COMPARISON GRID */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* LEFT CARD — Herramientas genéricas */}
          <div className="rounded-2xl p-8 sm:p-10 lg:p-12 bg-bg-subtle dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.1]">
            <h3 className="text-foreground/60 dark:text-foreground/50 font-semibold text-xl sm:text-2xl mb-8">
              {t("comparison_generic_title")}
            </h3>
            <div>
              {genericItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 py-3.5 border-b border-slate-200/60 dark:border-white/[0.06] last:border-b-0"
                >
                  <X className="w-5 h-5 text-red-400 dark:text-red-400/70 shrink-0 mt-0.5" />
                  <span className="text-foreground/55 dark:text-foreground/45 text-sm sm:text-[15px] leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD — StaffDigital AI */}
          <div className="rounded-2xl p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-gradient-from/[0.08] to-gradient-to/[0.08] dark:from-gradient-from/[0.15] dark:to-gradient-to/[0.12] border-2 border-brand-secondary/25 dark:border-brand-secondary/20 shadow-xl shadow-card dark:shadow-card-hover">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-secondary/[0.1] dark:bg-brand-secondary/[0.12] border border-brand-secondary/20 dark:border-brand-secondary/20 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary dark:bg-brand-secondary" />
              <span className="text-xs font-semibold text-brand-secondary dark:text-brand-secondary uppercase tracking-wider">{t("comparison_badge")}</span>
            </div>
            <h3 className="text-foreground dark:text-white font-semibold text-xl sm:text-2xl mb-1">
              StaffDigital AI
            </h3>
            <div className="w-12 h-[2px] bg-gradient-to-r from-gradient-from to-gradient-to rounded-full mb-8" />
            <div>
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 py-3.5 border-b border-brand-secondary/10 dark:border-brand-secondary/[0.12] last:border-b-0"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-secondary/20 dark:bg-brand-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-brand-secondary dark:text-brand-secondary" />
                  </div>
                  <span className="text-foreground/80 dark:text-foreground/70 text-sm sm:text-[15px] leading-relaxed font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA BLOCK */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-foreground/45 dark:text-foreground/35 text-sm sm:text-base mb-5">
            {t("comparison_cta_text")}
          </p>
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            {t("comparison_cta_button")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
