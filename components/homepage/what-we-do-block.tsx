"use client"

import { Brain, FileText, Target, Zap } from "lucide-react"
import { useTranslations } from "next-intl"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  FileText,
  Target,
  Zap,
}

interface WhatWeDoCard {
  icon: string
  title: string
  description: string
}

export function WhatWeDoBlock() {
  const t = useTranslations("what_we_do")

  const cards = t.raw("cards") as WhatWeDoCard[]

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 animate-fade-in-section">
      <div className="max-w-6xl mx-auto">
        {/* Header — More editorial */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 sm:mb-6 leading-tight tracking-tight">
            <span className="text-foreground">{t("title_plain")} </span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
              {t("title_gradient")}
            </span>
          </h2>
          <p className="text-foreground/55 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 2x2 Grid — Premium cards */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon] || Brain
            return (
              <div
                key={card.title}
                className="group relative bg-foreground/[0.02] dark:bg-white/[0.03] backdrop-blur-sm p-7 sm:p-8 rounded-2xl lg:rounded-3xl transition-all duration-500 hover:bg-foreground/[0.04] dark:hover:bg-white/[0.05] border border-foreground/[0.06] dark:border-white/[0.08] hover:border-foreground/[0.12] dark:hover:border-white/[0.15] overflow-hidden"
              >
                {/* Number indicator */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-6xl sm:text-7xl font-bold text-foreground/[0.03] dark:text-white/[0.04] leading-none select-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Icon with gradient background */}
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 dark:from-[#0078AA]/15 dark:to-[#7C3AED]/15 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-[#0078AA] dark:text-[#00D4FF]" />
                </div>
                
                {/* Title */}
                <h3 className="relative text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug tracking-tight">
                  {card.title}
                </h3>
                
                {/* Description */}
                <p className="relative text-foreground/55 text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
