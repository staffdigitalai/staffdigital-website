"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function HeroBlock() {
  const t = useTranslations("hero")

  return (
    <section className="min-h-[100svh] flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-32 pb-20 sm:pt-36 sm:pb-24 relative overflow-hidden">
      {/* Clean cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[70%] opacity-20 dark:opacity-30"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,120,170,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[40%] opacity-10 dark:opacity-20"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(124,58,237,0.2) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow badge */}
        <div className="animate-fade-in-badge mb-10 sm:mb-12 flex justify-center">
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/[0.08] border border-foreground/[0.12] dark:border-white/[0.15] backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0078AA] dark:text-[#00D4FF] flex-shrink-0" />
            <span className="text-xs font-semibold tracking-widest uppercase text-foreground/80 dark:text-white/70 whitespace-nowrap">
              {t("badge") || "Plataforma IA Operativa"}
            </span>
          </span>
        </div>

        {/* H1 -- Commanding, clean */}
        <h1 className="animate-fade-in-hero">
          <span className="block text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-[-0.025em]">
            {t("h1_plain")}
          </span>
          <span
            className="block mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-[-0.025em] bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #0078AA 0%, #7C3AED 100%)",
            }}
          >
            {t("h1_gradient")}
          </span>
        </h1>

        {/* Subtitle -- Clear hierarchy */}
        <p className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl text-foreground/55 dark:text-white/50 max-w-xl mx-auto leading-relaxed animate-fade-in-heading text-balance">
          {t("subtitle")}
        </p>

        {/* CTAs -- Clean, premium */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-buttons">
          {/* Primary CTA */}
          <Link
            href="/demo"
            className="group relative inline-flex items-center justify-center rounded-full px-8 sm:px-10 py-4 text-base font-semibold text-white transition-all duration-400 hover:scale-[1.02] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0078AA 0%, #5B21B6 100%)",
              boxShadow: "0 4px 16px rgba(0,120,170,0.25), 0 8px 24px rgba(91,33,182,0.15)",
            }}
          >
            <span className="relative z-10 flex items-center">
              {t("cta_primary")}
              <ArrowRight className="ml-2.5 h-4.5 w-4.5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" 
              style={{ background: "linear-gradient(135deg, #0090CC 0%, #7C3AED 100%)" }} 
            />
          </Link>

          {/* Secondary CTA */}
          <a
            href="#how-it-works"
            className="group inline-flex items-center justify-center rounded-full px-7 sm:px-9 py-4 text-base font-medium text-foreground/70 dark:text-white/70 transition-all duration-300 hover:text-foreground dark:hover:text-white border border-foreground/[0.1] dark:border-white/[0.12] hover:border-foreground/20 dark:hover:border-white/25 hover:bg-foreground/[0.03] dark:hover:bg-white/[0.04]"
          >
            {t("cta_secondary")}
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </a>
        </div>

        {/* Microcopy */}
        <p 
          className="mt-10 text-xs text-foreground/30 dark:text-white/25 tracking-wide animate-fade-in-buttons" 
          style={{ animationDelay: "1.2s" }}
        >
          {t("microcopy")}
        </p>
      </div>
    </section>
  )
}
