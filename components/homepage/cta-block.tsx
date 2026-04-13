"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export function CTABlock() {
  const t = useTranslations("cta")

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      {/* Premium gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,120,170,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 50% 80%, rgba(124,58,237,0.06) 0%, transparent 50%)",
        }}
      />
      
      {/* Subtle top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,120,170,0.15) 30%, rgba(124,58,237,0.15) 70%, transparent 100%)",
        }}
      />
      
      <div className="max-w-3xl mx-auto text-center relative">
        {/* Title — Editorial, impactful */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8">
          <span className="text-foreground">{t("title_plain")} </span>
          <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
            {t("title_gradient")}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-foreground/55 max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12">
          {t("subtitle")}
        </p>

        {/* Premium CTA Button */}
        <div className="mb-8">
          <Link
            href="/demo"
            className="group relative inline-flex items-center justify-center rounded-full px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-semibold text-white transition-all duration-500 hover:scale-[1.03] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0078AA 0%, #5B21B6 100%)",
              boxShadow: "0 6px 30px rgba(0,120,170,0.35), 0 12px 50px rgba(91,33,182,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <span className="relative z-10 flex items-center">
              {t("demo")}
              <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            {/* Hover overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              style={{ background: "linear-gradient(135deg, #0090CC 0%, #7C3AED 100%)" }} 
            />
          </Link>
        </div>

        {/* Microcopy */}
        <p className="text-sm text-foreground/35 dark:text-white/30 tracking-wide">
          {t("microcopy")}
        </p>
      </div>
    </section>
  )
}
