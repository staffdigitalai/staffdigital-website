"use client"

import { Brain, BarChart3, CheckCircle, Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { IconBadge } from "@/components/ui/icon-system"

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
            <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
              {t("title_gradient")}
            </span>
          </h2>
          <p className="text-foreground/55 dark:text-foreground/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 2x2 Grid -- Premium cards */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon] || Brain
            return (
              <div
                key={card.title}
                className="group relative card-premium p-7 sm:p-8 rounded-2xl overflow-hidden"
              >
                {/* Step number */}
                <div className="absolute top-5 right-5 sm:top-7 sm:right-7 text-5xl sm:text-6xl font-bold text-foreground/[0.04] dark:text-white/[0.06] leading-none select-none tracking-tight">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Functional icon badge */}
                <IconBadge icon={Icon} size="md" className="mb-5" />
                
                {/* Title */}
                <h3 className="relative text-lg sm:text-xl font-bold text-foreground mb-2.5 leading-tight tracking-tight">
                  {card.title}
                </h3>
                
                {/* Description */}
                <p className="relative text-foreground/55 dark:text-foreground/50 text-sm leading-relaxed">
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
