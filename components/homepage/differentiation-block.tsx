"use client"

import { Check } from "lucide-react"
import { useTranslations } from "next-intl"

export function DifferentiationBlock() {
  const t = useTranslations("differentiation")

  const points = t.raw("points") as string[]

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left -- Title + Text */}
          <div className="space-y-6 lg:sticky lg:top-32">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              <span className="text-foreground">{t("title_plain")} </span>
              <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                {t("title_gradient")}
              </span>
            </h2>
            <p className="text-foreground/50 text-base sm:text-lg leading-relaxed">
              {t("text")}
            </p>
          </div>

          {/* Right -- Checkmark Points */}
          <div className="space-y-3">
            {points.map((point, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-5 rounded-xl card-premium"
              >
                <div className="w-7 h-7 rounded-full bg-[#0078AA]/[0.08] dark:bg-[#00D4FF]/[0.1] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#0078AA] dark:text-[#00D4FF]" />
                </div>
                <span className="text-foreground/75 text-sm sm:text-base leading-relaxed font-medium">
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
