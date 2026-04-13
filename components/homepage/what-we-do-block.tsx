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

        {/* 2x2 Grid — Modern cards with depth and shadows */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon] || Brain
            return (
              <div
                key={card.title}
                className="group relative p-8 sm:p-10 rounded-3xl transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(248,250,252,0.8) 0%, rgba(248,250,252,0.5) 100%)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
                  border: "1px solid rgba(0,120,170,0.08)",
                }}
              >
                {/* Number indicator - modern style */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-5xl sm:text-6xl font-bold text-foreground/[0.05] dark:text-white/[0.08] leading-none select-none tracking-tight">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Icon with modern gradient background */}
                <div className="relative w-16 h-16 rounded-2xl mb-7 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,120,170,0.12) 0%, rgba(124,58,237,0.08) 100%)",
                    boxShadow: "0 2px 8px rgba(0,120,170,0.1), inset 0 1px 2px rgba(255,255,255,0.5)",
                  }}
                >
                  <Icon className="w-8 h-8 text-[#0078AA]" />
                </div>
                
                {/* Title */}
                <h3 className="relative text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight tracking-tight">
                  {card.title}
                </h3>
                
                {/* Description */}
                <p className="relative text-foreground/60 text-base leading-relaxed">
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
