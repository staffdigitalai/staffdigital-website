"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function HeroBlock() {
  const t = useTranslations("hero")

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Cinematic background glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 dark:opacity-30"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,120,170,0.25) 0%, rgba(124,58,237,0.15) 40%, transparent 70%)",
          }}
        />
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto text-center relative z-10">
        {/* H1 — generous spacing, controlled width */}
        <h1 className="animate-fade-in-hero">
          <span className="block text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
            {t("h1_plain")}
          </span>
          <span
            className="block mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #0078AA 0%, #7C3AED 50%, #0078AA 100%)",
              backgroundSize: "200% auto",
              animation: "gradient-shift 4s ease-in-out infinite",
            }}
          >
            {t("h1_gradient")}
          </span>
        </h1>

        {/* Subtitle — larger, more breathing room */}
        <p className="mt-8 sm:mt-10 md:mt-12 text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/55 max-w-3xl mx-auto leading-relaxed sm:leading-[1.8] font-light animate-fade-in-heading">
          {t("subtitle")}
        </p>

        {/* CTAs — more presence, more spacing */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 animate-fade-in-buttons">
          {/* Primary CTA — larger, stronger glow */}
          <Link
            href="/demo"
            className="group inline-flex items-center justify-center rounded-full px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-semibold text-white transition-all duration-500 hover:scale-[1.04]"
            style={{
              background: "linear-gradient(135deg, #0078AA 0%, #7C3AED 100%)",
              boxShadow: "0 4px 25px rgba(0,120,170,0.3), 0 8px 40px rgba(124,58,237,0.2)",
            }}
          >
            {t("cta_primary")}
            <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>

          {/* Secondary CTA — clean, understated */}
          <a
            href="#how-it-works"
            className="group inline-flex items-center justify-center rounded-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium text-foreground/70 transition-all duration-500 hover:text-foreground border border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.03]"
          >
            {t("cta_secondary")}
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </a>
        </div>

        {/* Microcopy — subtle, spaced */}
        <p className="mt-8 sm:mt-10 text-xs sm:text-sm text-foreground/30 tracking-wide font-light animate-fade-in-buttons" style={{ animationDelay: "1.2s" }}>
          {t("microcopy")}
        </p>
      </div>
    </section>
  )
}
