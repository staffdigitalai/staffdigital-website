"use client"

import { X, Check, Settings, MessageSquare, Database, CalendarCheck, Workflow, Mic, LifeBuoy, Star, type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"

const rowIcons: LucideIcon[] = [Settings, MessageSquare, Database, CalendarCheck, Workflow, Mic, LifeBuoy]

export function ComparisonBlock() {
  const t = useTranslations("comparison")

  const rows = t.raw("rows") as { feature: string; competitor: string; us: string }[]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Desktop table */}
        <div 
          className="card-elevated hidden md:block rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="grid grid-cols-3 bg-gray-50 dark:bg-foreground/5">
            <div className="p-4 text-sm font-bold text-foreground/70 border-r border-gray-200 dark:border-foreground/10" />
            <div className="p-4 text-sm font-bold text-red-500 dark:text-red-400 text-center border-r border-gray-200 dark:border-foreground/10">{t("competitor_label")}</div>
            <div 
              className="p-4 text-sm font-bold text-[var(--lime-green)] text-center flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(180deg, rgba(0, 120, 170, 0.05), rgba(124, 58, 237, 0.07))" }}
            >
              {t("us_label")}
              <span 
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                style={{ backgroundImage: "linear-gradient(to right, rgb(0, 120, 170), rgb(124, 58, 237))" }}
              >
                <Star className="w-3 h-3 fill-current" />
                {t("recommended") || "Recomendado"}
              </span>
            </div>
          </div>
          {rows.map((row, i) => {
            const Icon = rowIcons[i] || Settings
            return (
              <div key={i} className="grid grid-cols-3 border-t border-gray-200 dark:border-foreground/10">
                <div className="p-4 text-sm font-medium text-foreground border-r border-gray-200 dark:border-foreground/10 flex items-start gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  {row.feature}
                </div>
                <div className="p-4 text-sm text-gray-600 dark:text-foreground/60 border-r border-gray-200 dark:border-foreground/10 flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  {row.competitor}
                </div>
                <div 
                  className="p-4 text-sm text-foreground flex items-start gap-2"
                  style={{ background: "linear-gradient(180deg, rgba(0, 120, 170, 0.03), rgba(124, 58, 237, 0.05))" }}
                >
                  <Check className="w-4 h-4 text-[var(--lime-green)] shrink-0 mt-0.5" />
                  {row.us}
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => {
            const Icon = rowIcons[i] || Settings
            return (
              <div 
                key={i} 
                className="card-elevated rounded-xl p-4 space-y-3"
              >
                <div className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  {row.feature}
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-foreground/60">
                  <X className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  {row.competitor}
                </div>
                <div 
                  className="flex items-start gap-2 text-sm text-foreground p-2 rounded-lg -mx-2"
                  style={{ background: "linear-gradient(180deg, rgba(0, 120, 170, 0.03), rgba(124, 58, 237, 0.05))" }}
                >
                  <Check className="w-4 h-4 text-[var(--lime-green)] shrink-0 mt-0.5" />
                  {row.us}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
