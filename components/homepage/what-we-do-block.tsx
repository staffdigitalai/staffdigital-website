"use client"

import { Brain, BarChart3, CheckCircle, Zap } from "lucide-react"
import { useTranslations } from "next-intl"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  "bar-chart": BarChart3,
  "check-circle": CheckCircle,
  zap: Zap,
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
    <section className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight">
            <span className="text-foreground">{t("title_plain")} </span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
              {t("title_gradient")}
            </span>
          </h2>
          <p className="text-foreground/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 2x2 Grid -- Premium cards */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon] || Brain
            return (
              <div
                key={card.title}
                className="group relative card-premium p-8 sm:p-10 rounded-2xl overflow-hidden"
              >
                {/* Step number */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-5xl sm:text-6xl font-bold text-foreground/[0.04] dark:text-white/[0.06] leading-none select-none tracking-tight">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Icon */}
                <div className="relative w-12 h-12 rounded-xl mb-6 flex items-center justify-center flex-shrink-0 bg-[#0078AA]/[0.08] dark:bg-[#00D4FF]/[0.1] group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-[#0078AA] dark:text-[#00D4FF]" />
                </div>
                
                {/* Title */}
                <h3 className="relative text-xl sm:text-2xl font-bold text-foreground mb-3 leading-tight tracking-tight">
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
