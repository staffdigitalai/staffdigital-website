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
            <span className="text-foreground">{"Otras herramientas vs "}</span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
              {"StaffDigital AI"}
            </span>
          </h2>
          <p className="text-foreground/55 dark:text-foreground/50 text-base sm:text-lg leading-[1.7] max-w-2xl mx-auto">
            {"La mayoría de soluciones IA te dan una herramienta y te dejan solo. Nosotros configuramos, integramos y operamos todo por ti."}
          </p>
        </div>

        {/* COMPARISON GRID */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* LEFT CARD — Herramientas genéricas */}
          <div className="rounded-2xl p-8 sm:p-10 lg:p-12 bg-[#F1F5F9] dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.1]">
            <h3 className="text-foreground/60 dark:text-foreground/50 font-semibold text-xl sm:text-2xl mb-8">
              Herramientas gen&eacute;ricas
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
          <div className="rounded-2xl p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0078AA]/[0.08] to-[#7C3AED]/[0.08] dark:from-[#0078AA]/[0.15] dark:to-[#7C3AED]/[0.12] border-2 border-[#0078AA]/25 dark:border-[#00D4FF]/20 shadow-xl shadow-[#0078AA]/[0.1] dark:shadow-[#0078AA]/[0.15]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0078AA]/[0.1] dark:bg-[#00D4FF]/[0.12] border border-[#0078AA]/20 dark:border-[#00D4FF]/20 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0078AA] dark:bg-[#00D4FF]" />
              <span className="text-xs font-semibold text-[#0078AA] dark:text-[#00D4FF] uppercase tracking-wider">Recomendado</span>
            </div>
            <h3 className="text-foreground dark:text-white font-semibold text-xl sm:text-2xl mb-1">
              StaffDigital AI
            </h3>
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#0078AA] to-[#7C3AED] rounded-full mb-8" />
            <div>
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 py-3.5 border-b border-[#0078AA]/10 dark:border-[#0078AA]/[0.12] last:border-b-0"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0078AA]/20 dark:bg-[#00D4FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#0078AA] dark:text-[#00D4FF]" />
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
            {"Sin compromisos. Sin permanencia. Implementación incluida."}
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
