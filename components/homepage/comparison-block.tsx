"use client"

import { HelpCircle, MessagesSquare, Database, CalendarCheck, GitBranch, Mic, Headphones, type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"

const rowIcons: LucideIcon[] = [HelpCircle, MessagesSquare, Database, CalendarCheck, GitBranch, Mic, Headphones]

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
        >
          {/* Header row */}
          <div className="grid grid-cols-3 bg-gray-100 dark:bg-foreground/10">
            <div className="px-5 py-4 border-r border-gray-200/60 dark:border-foreground/5" />
            <div className="px-5 py-4 text-center border-r border-gray-200/60 dark:border-foreground/5">
              <div className="text-base font-bold text-gray-400 dark:text-foreground/40">
                {t("competitor_label")}
              </div>
              <div className="text-xs text-gray-400 dark:text-foreground/30 mt-0.5">
                Bland, Vapi, chatbots genéricos...
              </div>
            </div>
            <div className="px-5 py-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-base font-bold bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                  {t("us_label")}
                </span>
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {t("recommended")}
                </span>
              </div>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => {
            const Icon = rowIcons[i] || HelpCircle
            const isLast = i === rows.length - 1
            return (
              <div 
                key={i} 
                className={`grid grid-cols-3 ${!isLast ? "border-b border-gray-200/60 dark:border-foreground/5" : ""}`}
              >
                {/* Feature label */}
                <div className="px-5 py-4 border-r border-gray-200/60 dark:border-foreground/5 flex items-start gap-2">
                  <Icon className="w-4 h-4 text-[#0078AA] shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-foreground tracking-tight">{row.feature}</span>
                </div>
                
                {/* Competitor cell */}
                <div className="px-5 py-4 border-r border-gray-200/60 dark:border-foreground/5 bg-red-50/30 dark:bg-red-500/[0.03] flex items-start gap-1.5">
                  <span className="text-red-400/70 text-base shrink-0">✗</span>
                  <span className="text-sm text-gray-500 dark:text-foreground/40">{row.competitor}</span>
                </div>
                
                {/* StaffDigital cell */}
                <div className="px-5 py-4 bg-green-50/30 dark:bg-green-500/[0.03] flex items-start gap-1.5">
                  <span className="text-green-500 text-base shrink-0">✓</span>
                  <span className="text-sm text-foreground dark:text-foreground/90 font-medium">{row.us}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => {
            const Icon = rowIcons[i] || HelpCircle
            return (
              <div 
                key={i} 
                className="card-elevated rounded-xl p-4 space-y-3"
              >
                {/* Header with icon and label */}
                <div className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#0078AA] shrink-0" />
                  {row.feature}
                </div>
                
                {/* Two cards side by side */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* DIY card */}
                  <div className="flex-1 rounded-xl bg-red-50/50 dark:bg-red-500/5 border border-red-200/30 dark:border-red-500/10 p-3">
                    <div className="flex items-start gap-1.5">
                      <span className="text-red-400/70 text-base shrink-0">✗</span>
                      <span className="text-sm text-gray-500 dark:text-foreground/40">{row.competitor}</span>
                    </div>
                  </div>
                  
                  {/* StaffDigital card */}
                  <div className="flex-1 rounded-xl bg-green-50/50 dark:bg-green-500/5 border border-green-200/30 dark:border-green-500/10 border-l-[3px] border-l-green-500 p-3">
                    <div className="flex items-start gap-1.5">
                      <span className="text-green-500 text-base shrink-0">✓</span>
                      <span className="text-sm text-foreground dark:text-foreground/90 font-medium">{row.us}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
