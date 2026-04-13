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
    <section id="how-it-works" className="py-24 sm:py-32 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      {/* Subtle background */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,120,170,0.05) 0%, transparent 60%)",
        }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Title — More editorial */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 text-foreground leading-tight tracking-tight">
          {t("title")}
        </h2>

        {/* Steps — Premium pipeline design */}
        <div className="grid md:grid-cols-4 gap-8 md:gap-6 lg:gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#0078AA]/20 via-[#7C3AED]/20 to-[#0078AA]/20" />

          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Number circle with glow */}
              <div className="relative mx-auto mb-6">
                {/* Glow ring */}
                <div 
                  className="absolute inset-0 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-2"
                  style={{
                    background: "radial-gradient(circle, rgba(0,120,170,0.15) 0%, transparent 70%)",
                  }}
                />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center mx-auto shadow-lg shadow-[#0078AA]/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-base sm:text-lg font-bold">{step.num}</span>
                </div>
              </div>

              {/* Vertical connector (mobile only) */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute left-1/2 top-14 h-8 w-0.5 bg-gradient-to-b from-[#7C3AED]/30 to-transparent -translate-x-1/2" />
              )}

              {/* Title */}
              <h3 className="font-bold text-foreground mb-3 text-base sm:text-lg leading-snug">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm sm:text-[0.9375rem] text-foreground/55 leading-relaxed max-w-[220px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing text — Premium styling */}
        <div className="mt-16 sm:mt-20 max-w-2xl mx-auto">
          <p className="text-center text-foreground/45 text-base sm:text-lg leading-relaxed px-6 py-5 rounded-2xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.05] dark:border-white/[0.06]">
            {t("closing")}
          </p>
        </div>
      </div>
    </section>
  )
}
