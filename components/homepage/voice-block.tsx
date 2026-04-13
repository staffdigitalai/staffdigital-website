"use client"

import { useTranslations } from "next-intl"
import { Volume2 } from "lucide-react"
import Link from "next/link"

export function VoiceBlock() {
  const t = useTranslations("voice")

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 lg:p-20">
          {/* Premium gradient background */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(0,120,170,0.06) 0%, rgba(124,58,237,0.04) 50%, rgba(0,120,170,0.06) 100%)",
            }}
          />
          
          {/* Subtle border */}
          <div className="absolute inset-0 rounded-3xl border border-foreground/[0.06] dark:border-white/[0.08]" />
          
          {/* Accent glow top-left */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#0078AA]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          {/* Accent glow bottom-right */}
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#7C3AED]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center max-w-2xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.04] dark:bg-white/[0.06] border border-foreground/[0.08] dark:border-white/[0.1] mb-8">
              <Volume2 className="w-4 h-4 text-[#0078AA] dark:text-[#00D4FF]" />
              <span className="text-xs font-semibold tracking-wide text-foreground/70 dark:text-white/70 uppercase">
                {t("badge") || "Voz Humana HD"}
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
              <span className="text-foreground">{t("title_plain")} </span>
              <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                {t("title_gradient")}
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-foreground/60 text-base sm:text-lg md:text-xl leading-relaxed mb-8">
              {t("text")}
            </p>
            
            {/* CTA Link */}
            <Link
              href="/demo-voice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#0078AA] dark:text-[#00D4FF] font-semibold text-base transition-all duration-300 hover:bg-[#0078AA]/[0.06] dark:hover:bg-[#00D4FF]/[0.08] border border-[#0078AA]/20 dark:border-[#00D4FF]/20"
            >
              <Volume2 className="w-4 h-4" />
              {t("cta") || "Escuchar demo de voz"}
            </Link>
            
            {/* Microcopy */}
            <p className="mt-8 text-sm text-foreground/35 dark:text-white/30">
              {t("microcopy")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
