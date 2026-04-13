"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function HeroBlock() {
  const t = useTranslations("hero")

  return (
    <section className="min-h-[100svh] flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-28 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden">
      {/* Premium cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary radial glow - top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[80%] opacity-25 dark:opacity-40"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(0,120,170,0.35) 0%, rgba(124,58,237,0.2) 35%, transparent 70%)",
          }}
        />
        {/* Secondary accent glow - bottom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[50%] opacity-15 dark:opacity-25"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(124,58,237,0.25) 0%, transparent 60%)",
          }}
        />
        {/* Subtle grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Subtle horizontal lines for depth */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(255,255,255,0.03) 100px, rgba(255,255,255,0.03) 101px)",
          }}
        />
      </div>

      <div className="w-full max-w-5xl mx-auto text-center relative z-10">
        {/* Eyebrow badge */}
        <div className="animate-fade-in-badge mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-foreground/[0.04] dark:bg-white/[0.06] border border-foreground/[0.08] dark:border-white/[0.12] backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#0078AA] dark:text-[#00D4FF]" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-foreground/70 dark:text-white/70">
              {t("badge") || "Plataforma IA Operativa"}
            </span>
          </div>
        </div>

        {/* H1 — Editorial, impactful */}
        <h1 className="animate-fade-in-hero">
          <span className="block text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.05] tracking-[-0.02em]">
            {t("h1_plain")}
          </span>
          <span
            className="block mt-2 sm:mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.05] tracking-[-0.02em] bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #0078AA 0%, #7C3AED 50%, #0078AA 100%)",
              backgroundSize: "200% auto",
              animation: "gradient-shift 4s ease-in-out infinite",
            }}
          >
            {t("h1_gradient")}
          </span>
        </h1>

        {/* Subtitle — Clear hierarchy, readable */}
        <p className="mt-8 sm:mt-10 md:mt-12 text-base sm:text-lg md:text-xl text-foreground/60 dark:text-white/55 max-w-2xl mx-auto leading-relaxed font-normal animate-fade-in-heading text-balance">
          {t("subtitle")}
        </p>

        {/* CTAs — Premium presence */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 animate-fade-in-buttons">
          {/* Primary CTA */}
          <Link
            href="/demo"
            className="group relative inline-flex items-center justify-center rounded-full px-8 sm:px-10 py-4 sm:py-[1.125rem] text-base sm:text-[1.0625rem] font-semibold text-white transition-all duration-500 hover:scale-[1.03] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0078AA 0%, #5B21B6 100%)",
              boxShadow: "0 4px 20px rgba(0,120,170,0.35), 0 8px 32px rgba(91,33,182,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <span className="relative z-10 flex items-center">
              {t("cta_primary")}
              <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            {/* Hover glow overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              style={{ background: "linear-gradient(135deg, #0090CC 0%, #7C3AED 100%)" }} 
            />
          </Link>

          {/* Secondary CTA */}
          <a
            href="#how-it-works"
            className="group inline-flex items-center justify-center rounded-full px-7 sm:px-9 py-4 sm:py-[1.125rem] text-base sm:text-[1.0625rem] font-medium text-foreground/80 dark:text-white/80 transition-all duration-400 hover:text-foreground dark:hover:text-white border border-foreground/[0.12] dark:border-white/[0.15] hover:border-foreground/25 dark:hover:border-white/30 hover:bg-foreground/[0.03] dark:hover:bg-white/[0.05] backdrop-blur-sm"
          >
            {t("cta_secondary")}
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </a>
        </div>

        {/* Microcopy — Elegant, subtle */}
        <p 
          className="mt-10 sm:mt-12 text-xs sm:text-sm text-foreground/35 dark:text-white/30 tracking-wide font-light animate-fade-in-buttons" 
          style={{ animationDelay: "1.2s" }}
        >
          {t("microcopy")}
        </p>
      </div>
    </section>
  )
}
