"use client"

import { useTranslations } from "next-intl"

interface Step {
  num: string
  title: string
  description: string
}

export function HowItWorksBlock() {
  const t = useTranslations("how_it_works")

  const steps = t.raw("steps") as Step[]

  return (
    <section id="how-it-works" className="py-20 px-4 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
          {t("title")}
        </h2>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="grid md:grid-cols-4 gap-8 md:gap-4 relative">
          {/* Dashed connector line (desktop only) */}
          <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-foreground/20" />

          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Number circle */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0078AA] to-[#7C3AED] flex items-center justify-center mx-auto mb-4 relative z-10">
                <span className="text-white text-sm font-bold">{step.num}</span>
              </div>

              {/* Vertical dashed line between steps (mobile only) */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute left-1/2 top-10 h-8 border-l-2 border-dashed border-foreground/20 -translate-x-1/2" />
              )}

              <h3 className="font-bold text-foreground mb-2 text-sm md:text-base">
                {step.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing text */}
        <p className="text-center text-foreground/50 italic mt-12 max-w-2xl mx-auto">
          {t("closing")}
        </p>
      </div>
    </section>
  )
}
