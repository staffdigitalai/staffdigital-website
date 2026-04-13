"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function HeroBlock() {
  const t = useTranslations("hero")

  return (
    <section className="min-h-[85vh] flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in-hero">
        {/* H1 — plain text + gradient on next line */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
          <span className="text-foreground block">{t("h1_plain")}</span>
          <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent block">
            {t("h1_gradient")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-heading">
          {t("subtitle")}
        </p>

        {/* Two CTAs side by side */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-in-buttons">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#0078AA] to-[#7C3AED] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,120,170,0.4),0_0_60px_rgba(124,58,237,0.3)] group"
          >
            {t("cta_primary")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-medium border border-foreground/20 text-foreground bg-transparent transition-all duration-300 hover:scale-105 hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/5"
          >
            {t("cta_secondary")}
          </a>
        </div>

        {/* Microcopy */}
        <p className="text-sm text-foreground/40 animate-fade-in-buttons">
          {t("microcopy")}
        </p>
      </div>
    </section>
  )
}
