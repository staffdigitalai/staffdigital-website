"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

export function CTABlock() {
  const t = useTranslations("cta")

  return (
    <section className="py-32 sm:py-44 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      {/* Strong gradient background for climax effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 50% 30%, rgba(0,120,170,0.12) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 50% 90%, rgba(124,58,237,0.10) 0%, transparent 50%)",
        }}
      />
      
      {/* Animated gradient border top */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,120,170,0.25) 30%, rgba(124,58,237,0.25) 70%, transparent 100%)",
        }}
      />
      
      {/* Floating accent elements */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-br from-[#0078AA]/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-tl from-[#7C3AED]/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/[0.04] dark:bg-white/[0.06] border border-foreground/[0.08] dark:border-white/[0.1] mb-8">
          <Sparkles className="w-4 h-4 text-[#0078AA] dark:text-[#00D4FF]" />
          <span className="text-xs font-semibold tracking-wide text-foreground/70 dark:text-white/70 uppercase">
            {t("badge") || "Empieza hoy"}
          </span>
        </div>
        
        {/* Title — Largest on page for climax */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8 sm:mb-10">
          <span className="text-foreground">{t("title_plain")} </span>
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#0078AA] via-[#5B21B6] to-[#7C3AED] bg-clip-text text-transparent">
            {t("title_gradient")}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/55 max-w-2xl mx-auto leading-relaxed mb-12 sm:mb-14">
          {t("subtitle")}
        </p>

        {/* Premium CTA Button - Extra large for climax */}
        <div className="mb-10">
          <Link
            href="/demo"
            className="group relative inline-flex items-center justify-center rounded-full px-12 sm:px-16 py-5 sm:py-6 text-lg sm:text-xl font-bold text-white transition-all duration-500 hover:scale-[1.04] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0078AA 0%, #5B21B6 100%)",
              boxShadow: "0 8px 40px rgba(0,120,170,0.4), 0 16px 60px rgba(91,33,182,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <span className="relative z-10 flex items-center">
              {t("demo")}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
            {/* Animated shine effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              style={{ background: "linear-gradient(135deg, #0090CC 0%, #7C3AED 100%)" }} 
            />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-6">
          <div className="flex items-center gap-2 text-foreground/40">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">{t("trust_1") || "Sin permanencia"}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/40">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">{t("trust_2") || "Implementacion incluida"}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/40">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">{t("trust_3") || "Soporte dedicado"}</span>
          </div>
        </div>

        {/* Microcopy */}
        <p className="text-sm text-foreground/30 dark:text-white/25 tracking-wide">
          {t("microcopy")}
        </p>
      </div>
    </section>
  )
}
