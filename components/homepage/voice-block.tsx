"use client"

import { useTranslations } from "next-intl"

export function VoiceBlock() {
  const t = useTranslations("voice")

  return (
    <section className="py-20 px-4 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0078AA]/5 via-transparent to-[#7C3AED]/5 border border-foreground/5 p-10 md:p-16">
          {/* Subtle gradient accent top-left */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#0078AA]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="text-foreground">{t("title_plain")} </span>
              <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                {t("title_gradient")}
              </span>
            </h2>
            <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
              {t("text")}
            </p>
            <p className="text-sm text-foreground/40 italic">
              {t("microcopy")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
