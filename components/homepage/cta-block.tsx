"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export function CTABlock() {
  const t = useTranslations("cta")

  return (
    <section className="py-20 px-4 animate-fade-in-section">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Title — plain + gradient */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          <span className="text-foreground">{t("title_plain")} </span>
          <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
            {t("title_gradient")}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-foreground/60 max-w-xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        {/* Single CTA */}
        <div>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#0078AA] to-[#7C3AED] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,120,170,0.4),0_0_60px_rgba(124,58,237,0.3)] group"
          >
            {t("demo")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Microcopy */}
        <p className="text-sm text-foreground/40">
          {t("microcopy")}
        </p>
      </div>
    </section>
  )
}
