"use client"

import { useTranslations } from "next-intl"

export function ClarificationBlock() {
  const t = useTranslations("clarification")

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative">
        {/* Title as a statement */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight mb-8 sm:mb-10">
          {t("title")}
        </h2>
        
        {/* Content with clear hierarchy */}
        <div className="space-y-6 sm:space-y-8">
          <p className="text-foreground/60 dark:text-foreground/55 text-base sm:text-lg leading-[1.7]">
            {t("p1")}
          </p>
          
          {/* Key statement - highlighted with clean left accent */}
          <div className="relative py-5 sm:py-6 px-6 sm:px-8 rounded-2xl bg-foreground/[0.02] dark:bg-white/[0.03] border-l-[3px] border-[#0078AA] dark:border-[#00D4FF]">
            <p className="text-foreground/85 dark:text-foreground/80 font-semibold text-lg sm:text-xl leading-[1.6]">
              {t("p2")}
            </p>
          </div>
          
          <p className="text-foreground/60 dark:text-foreground/55 text-base sm:text-lg leading-[1.7]">
            {t("p3")}
          </p>
        </div>
      </div>
    </section>
  )
}
