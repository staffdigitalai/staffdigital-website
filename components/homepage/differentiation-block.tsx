"use client"

import { Check } from "lucide-react"
import { useTranslations } from "next-intl"

export function DifferentiationBlock() {
  const t = useTranslations("differentiation")

  const points = t.raw("points") as string[]

  return (
    <section className="py-20 px-4 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left — Title + Text */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="text-foreground">{t("title_plain")} </span>
              <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                {t("title_gradient")}
              </span>
            </h2>
            <p className="text-foreground/60 text-base md:text-lg leading-relaxed">
              {t("text")}
            </p>
          </div>

          {/* Right — Checkmark Points */}
          <div className="space-y-5">
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-foreground text-base leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
