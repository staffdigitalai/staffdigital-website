"use client"

import { Inbox, Brain, GitBranch, Zap } from "lucide-react"
import { useTranslations } from "next-intl"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  inbox: Inbox,
  brain: Brain,
  "git-branch": GitBranch,
  zap: Zap,
}

interface Step {
  num: string
  label: string
  description: string
  icon: string
  card_title: string
  card_text: string
  card_example: string
}

export function HowItWorksBlock() {
  const t = useTranslations("how_it_works")

  const steps = t.raw("steps") as Step[]

  return (
    <section
      id="how-it-works"
      className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* ── Section Intro ── */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-5">
            {t("title")}
          </h2>
          <p className="text-foreground/55 dark:text-foreground/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* ── Horizontal Timeline ── */}
        <div className="relative mb-20 sm:mb-24">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-[#0078AA]/20 via-[#0078AA]/30 to-[#0078AA]/20 rounded-full" />
          </div>

          <div className="grid md:grid-cols-4 gap-10 md:gap-4 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon] || Inbox
              return (
                <div key={index} className="relative text-center group">
                  {/* Step circle */}
                  <div className="relative mx-auto mb-5">
                    <div
                      className="relative w-16 h-16 rounded-2xl bg-white dark:bg-white/[0.06] border border-foreground/[0.08] dark:border-white/[0.1] flex items-center justify-center mx-auto group-hover:border-[#0078AA]/25 dark:group-hover:border-[#00D4FF]/20 transition-all duration-300 group-hover:shadow-md"
                    >
                      <Icon className="w-6 h-6 text-[#0078AA] dark:text-[#00D4FF]" />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-foreground dark:bg-white flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white dark:text-foreground">
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Vertical connector (mobile only) */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden absolute left-1/2 bottom-0 translate-y-full h-5 w-[2px] bg-gradient-to-b from-[#0078AA]/20 to-transparent -translate-x-1/2" />
                  )}

                  {/* Label */}
                  <h3 className="font-bold text-foreground text-base mb-1.5 tracking-tight">
                    {step.label}
                  </h3>

                  {/* Short description */}
                  <p className="text-sm text-foreground/50 dark:text-foreground/45 leading-relaxed max-w-[180px] mx-auto">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Explanatory Cards Grid ── */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon] || Inbox
            return (
              <div
                key={`card-${index}`}
                className="group relative card-premium p-7 sm:p-8 rounded-2xl overflow-hidden"
              >
                {/* Step number watermark */}
                <div className="absolute top-5 right-5 sm:top-6 sm:right-6 text-5xl sm:text-6xl font-bold text-foreground/[0.04] dark:text-white/[0.06] leading-none select-none tracking-tight">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="relative w-11 h-11 rounded-xl mb-5 flex items-center justify-center flex-shrink-0 bg-[#0078AA]/[0.08] dark:bg-[#00D4FF]/[0.1] group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-[#0078AA] dark:text-[#00D4FF]" />
                </div>

                {/* Title */}
                <h3 className="relative text-lg sm:text-xl font-bold text-foreground mb-2.5 leading-tight tracking-tight">
                  {step.card_title}
                </h3>

                {/* Description */}
                <p className="relative text-foreground/55 dark:text-foreground/50 text-sm leading-relaxed mb-4">
                  {step.card_text}
                </p>

                {/* Micro example */}
                <div className="relative px-3.5 py-2.5 rounded-lg bg-foreground/[0.03] dark:bg-white/[0.04] border border-foreground/[0.05] dark:border-white/[0.06]">
                  <p className="text-xs text-foreground/45 dark:text-foreground/40 leading-relaxed font-mono">
                    {step.card_example}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Closing Statement ── */}
        <div className="mt-16 sm:mt-20 max-w-2xl mx-auto">
          <p className="text-center text-foreground/70 dark:text-foreground/60 text-sm sm:text-base leading-relaxed font-medium px-6 py-5 rounded-2xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.06] dark:border-white/[0.07]">
            {t("closing")}
          </p>
        </div>
      </div>
    </section>
  )
}
