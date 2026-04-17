"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export function CTABlock() {
  const t = useTranslations("cta")

  return (
    <section className="py-32 sm:py-40 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      {/* Clean gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,120,170,0.08) 0%, transparent 50%)",
        }}
      />
      
      <div className="max-w-3xl mx-auto text-center relative">
        {/* Title -- Climax, largest heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-8">
          <span className="text-foreground">{t("title_plain")} </span>
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
            {t("title_gradient")}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-foreground/55 dark:text-foreground/50 max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12">
          {t("subtitle")}
        </p>

        {/* CTA Button */}
        <div className="mb-10">
          <Link
            href="/demo"
            className="group relative inline-flex items-center justify-center rounded-full px-10 sm:px-14 py-5 text-base sm:text-lg font-bold text-white transition-all duration-400 hover:scale-[1.03] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0078AA 0%, #5B21B6 100%)",
              boxShadow: "0 6px 24px rgba(0,120,170,0.3), 0 12px 40px rgba(91,33,182,0.2)",
            }}
          >
            <span className="relative z-10 flex items-center">
              {t("demo")}
              <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" 
              style={{ background: "linear-gradient(135deg, #0090CC 0%, #7C3AED 100%)" }} 
            />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-2 text-foreground/50 dark:text-foreground/40">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs">{t("trust_1") || "Sin permanencia"}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/50 dark:text-foreground/40">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs">{t("trust_2") || "Implementacion incluida"}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/50 dark:text-foreground/40">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs">{t("trust_3") || "Soporte dedicado"}</span>
          </div>
        </div>

        {/* Microcopy */}
        <p className="text-xs text-foreground/40 dark:text-white/30 tracking-wide">
          {t("microcopy")}
        </p>
      </div>
    </section>
  )
}
