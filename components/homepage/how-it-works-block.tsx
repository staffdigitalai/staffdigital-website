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
    <section id="how-it-works" className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 text-foreground leading-tight tracking-tight">
          {t("title")}
        </h2>

        {/* Steps -- Clean pipeline */}
        <div className="grid md:grid-cols-4 gap-10 md:gap-6 lg:gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-7 left-[14%] right-[14%] h-px bg-gradient-to-r from-[#0078AA]/15 via-[#7C3AED]/15 to-[#0078AA]/15" />

          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Number circle */}
              <div className="relative mx-auto mb-6">
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300"
                  style={{ boxShadow: "0 4px 12px rgba(0,120,170,0.2)" }}
                >
                  <span className="text-white text-base font-bold">{step.num}</span>
                </div>
              </div>

              {/* Vertical connector (mobile only) */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute left-1/2 top-16 h-6 w-px bg-gradient-to-b from-[#7C3AED]/20 to-transparent -translate-x-1/2" />
              )}

              {/* Title */}
              <h3 className="font-bold text-foreground mb-2 text-base leading-snug">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-foreground/50 leading-relaxed max-w-[200px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing text */}
        <div className="mt-16 sm:mt-20 max-w-2xl mx-auto">
          <p className="text-center text-foreground/40 text-sm sm:text-base leading-relaxed px-6 py-5 rounded-2xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.04] dark:border-white/[0.05]">
            {t("closing")}
          </p>
        </div>
      </div>
    </section>
  )
}
