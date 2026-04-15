"use client"

import { X, Check, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

const genericItems = [
  "Plantillas prediseñadas para todos",
  "Configuración DIY sin soporte real",
  "Integraciones limitadas y genéricas",
  "Sin evolución después del setup",
  "Requiere equipo técnico interno",
]

export function DifferentiationBlock() {
  const t = useTranslations("differentiation")
  const points = t.raw("points") as string[]

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden bg-white dark:bg-[#111827]">
      <div className="max-w-5xl mx-auto relative">
        {/* HEADER — centered */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
            <span className="text-foreground">{t("title_plain")} </span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
              {t("title_gradient")}
            </span>
          </h2>
          <p className="text-foreground/55 dark:text-foreground/50 text-base sm:text-lg leading-[1.7] max-w-2xl mx-auto">
            {t("text")}
          </p>
        </div>

        {/* COMPARISON GRID */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* LEFT CARD — Herramientas genéricas */}
          <div className="rounded-2xl p-8 sm:p-10 bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.06] dark:border-white/[0.06]">
            <h3 className="text-foreground/40 dark:text-foreground/35 font-semibold text-lg mb-8">
              Herramientas gen&eacute;ricas
            </h3>
            <div>
              {genericItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 py-3.5 border-b border-foreground/[0.04] dark:border-white/[0.04] last:border-b-0"
                >
                  <X className="w-5 h-5 text-red-300 dark:text-red-400/50 shrink-0 mt-0.5" />
                  <span className="text-foreground/40 dark:text-foreground/35 text-[15px] leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD — StaffDigital AI */}
          <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-[#0078AA]/[0.04] to-[#7C3AED]/[0.04] dark:from-[#0078AA]/[0.08] dark:to-[#7C3AED]/[0.06] border border-[#0078AA]/[0.12] dark:border-[#0078AA]/[0.15]">
            <h3 className="text-foreground dark:text-white font-semibold text-lg mb-1">
              StaffDigital AI
            </h3>
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#0078AA] to-[#7C3AED] rounded-full mb-8" />
            <div>
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 py-3.5 border-b border-[#0078AA]/[0.06] dark:border-[#0078AA]/[0.08] last:border-b-0"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0078AA]/[0.1] dark:bg-[#00D4FF]/[0.15] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#0078AA] dark:text-[#00D4FF]" />
                  </div>
                  <span className="text-foreground dark:text-foreground/90 text-[15px] leading-relaxed font-medium">
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
            {"Descubre cómo se adapta a tu operación"}
          </p>
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0078AA] to-[#7C3AED] text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            {"Solicitar demo"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
