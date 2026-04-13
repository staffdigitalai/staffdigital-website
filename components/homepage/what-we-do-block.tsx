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
    <section className="py-20 px-4 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">{t("title_plain")} </span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
              {t("title_gradient")}
            </span>
          </h2>
          <p className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = iconMap[card.icon] || Brain
            return (
              <div
                key={card.title}
                className="card-elevated p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0078AA]/10 to-[#7C3AED]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#0078AA] dark:text-[var(--neon-blue)]" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
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
