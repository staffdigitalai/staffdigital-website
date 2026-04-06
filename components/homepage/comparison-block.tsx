"use client"

import { X, Check } from "lucide-react"
import { useTranslations } from "next-intl"

export function ComparisonBlock() {
  const t = useTranslations("comparison")

  const rows = t.raw("rows") as { feature: string; competitor: string; us: string }[]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("title")}
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block rounded-2xl border border-foreground/10 overflow-hidden">
          <div className="grid grid-cols-3 bg-foreground/5">
            <div className="p-4 text-sm font-bold text-foreground/70 border-r border-foreground/10" />
            <div className="p-4 text-sm font-bold text-red-500 dark:text-red-400 text-center border-r border-foreground/10">{t("competitor_label")}</div>
            <div className="p-4 text-sm font-bold text-[var(--lime-green)] text-center">{t("us_label")}</div>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-t border-foreground/10">
              <div className="p-4 text-sm font-medium text-foreground/80 border-r border-foreground/10">{row.feature}</div>
              <div className="p-4 text-sm text-foreground/50 border-r border-foreground/10 flex items-start gap-2">
                <X className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                {row.competitor}
              </div>
              <div className="p-4 text-sm text-foreground/80 flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--lime-green)] shrink-0 mt-0.5" />
                {row.us}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <div key={i} className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 space-y-3">
              <div className="font-bold text-sm text-foreground/80">{row.feature}</div>
              <div className="flex items-start gap-2 text-sm text-foreground/40">
                <X className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                {row.competitor}
              </div>
              <div className="flex items-start gap-2 text-sm text-foreground/80">
                <Check className="w-4 h-4 text-[var(--lime-green)] shrink-0 mt-0.5" />
                {row.us}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
