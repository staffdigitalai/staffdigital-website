"use client"

import { useTranslations } from "next-intl"
import { CheckCircle2 } from "lucide-react"

export function SocialProofBlock() {
  const t = useTranslations("social_proof")

  const metrics = t.raw("metrics") as string[]

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 opacity-40 dark:opacity-25"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,120,170,0.05) 0%, transparent 60%)",
        }}
      />
      
      <div className="max-w-5xl mx-auto relative">
        {/* Title — Editorial */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 text-foreground leading-tight tracking-tight">
          {t("title")}
        </h2>

        {/* Metrics as feature list */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 mb-16 sm:mb-20 max-w-3xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.06] dark:border-white/[0.08]"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 dark:from-[#0078AA]/15 dark:to-[#7C3AED]/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#0078AA] dark:text-[#00D4FF]" />
              </div>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed font-medium pt-2">
                {metric}
              </p>
            </div>
          ))}
        </div>

        {/* Quote — Premium testimonial */}
        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.04] dark:from-white/[0.03] dark:to-white/[0.05] border border-foreground/[0.06] dark:border-white/[0.08]">
            {/* Quote marks */}
            <span className="absolute top-6 left-6 sm:top-8 sm:left-8 text-5xl sm:text-6xl text-[#0078AA]/15 dark:text-[#00D4FF]/15 font-serif leading-none select-none">
              &ldquo;
            </span>
            
            <blockquote className="relative text-center pt-4 sm:pt-6">
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 leading-relaxed font-light">
                {t("quote")}
              </p>
            </blockquote>
            
            {/* Author */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/[0.03] dark:bg-white/[0.05]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">DO</span>
                </div>
                <span className="text-sm font-medium text-foreground/60 tracking-wide">
                  {t("quote_author")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
