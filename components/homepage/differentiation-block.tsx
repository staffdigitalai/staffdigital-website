"use client"

import { Check } from "lucide-react"
import { useTranslations } from "next-intl"

export function DifferentiationBlock() {
  const t = useTranslations("differentiation")

  const points = t.raw("points") as string[]

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      {/* Background accent */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(124,58,237,0.05) 0%, transparent 60%)",
        }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Title + Text */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              <span className="text-foreground">{t("title_plain")} </span>
              <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                {t("title_gradient")}
              </span>
            </h2>
            <p className="text-foreground/55 text-base sm:text-lg md:text-xl leading-relaxed">
              {t("text")}
            </p>
          </div>

          {/* Right — Premium Checkmark Points */}
          <div className="space-y-4">
            {points.map((point, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.06] dark:border-white/[0.08] transition-all duration-300 hover:bg-foreground/[0.04] dark:hover:bg-white/[0.05]"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0078AA]/15 to-[#7C3AED]/15 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#0078AA] dark:text-[#00D4FF]" />
                </div>
                <span className="text-foreground/80 text-sm sm:text-base leading-relaxed font-medium pt-1">
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
