"use client"

import { useTranslations } from "next-intl"

export function ClarificationBlock() {
  const t = useTranslations("clarification")

  return (
    <section className="py-20 px-4 bg-foreground/[0.03] border-y border-foreground/10 animate-fade-in-section">
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t("title")}
        </h2>
        <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
          {t("p1")}
        </p>
        <p className="text-foreground font-semibold italic text-base md:text-lg leading-relaxed">
          {t("p2")}
        </p>
        <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
          {t("p3")}
        </p>
      </div>
    </section>
  )
}
