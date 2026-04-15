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
      className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0A0E1A]"
    >
      {/* Subtle radial glow behind timeline */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,120,170,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="hidden dark:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,120,170,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Section Intro */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-5">
            {t("title")}
          </h2>
          <p className="text-foreground/60 dark:text-foreground/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Glassmorphism Step Timeline */}
        <div className="relative mb-20 sm:mb-24">

          {/* === DESKTOP: Horizontal timeline (md+) === */}
          <div className="hidden md:block relative">
            {/* Animated gradient connecting line */}
            <div className="absolute top-10 left-[12%] right-[12%] h-[2px] overflow-hidden">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, rgba(0,120,170,0.1) 0%, rgba(0,120,170,0.4) 25%, rgba(124,58,237,0.4) 50%, rgba(0,120,170,0.4) 75%, rgba(0,120,170,0.1) 100%)",
                  backgroundSize: "200% 100%",
                  animation: "timeline-shimmer 6s ease-in-out infinite",
                }}
              />
            </div>

            <div className="grid grid-cols-4 gap-4 lg:gap-6">
              {steps.map((step, index) => {
                const Icon = iconMap[step.icon] || Inbox
                return (
                  <div key={index} className="relative text-center group">
                    {/* Glassmorphism icon container */}
                    <div className="relative mx-auto mb-5">
                      <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center mx-auto bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl border border-white/60 dark:border-white/[0.12] shadow-[0_4px_24px_rgba(0,120,170,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_4px_24px_rgba(0,120,170,0.15),inset_0_1px_0_rgba(255,255,255,0.06)] group-hover:shadow-[0_8px_32px_rgba(0,120,170,0.15),inset_0_1px_0_rgba(255,255,255,0.5)] dark:group-hover:shadow-[0_8px_32px_rgba(0,120,170,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] group-hover:border-[#0078AA]/30 dark:group-hover:border-[#00D4FF]/25 transition-all duration-500 group-hover:scale-105">
                        <Icon className="w-7 h-7 text-[#0078AA] dark:text-[#00D4FF] transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      {/* Number badge */}
                      <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#0F172A] dark:bg-white flex items-center justify-center shadow-lg ring-2 ring-[#F8FAFC] dark:ring-[#0A0E1A]">
                        <span className="text-[11px] font-bold text-white dark:text-[#0F172A]">
                          {step.num}
                        </span>
                      </div>
                    </div>

                    {/* Label */}
                    <h3 className="font-bold text-foreground text-base mb-1.5 tracking-tight">
                      {step.label}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-foreground/50 dark:text-foreground/45 leading-relaxed max-w-[200px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* === MOBILE: Vertical timeline (<md) === */}
          <div className="md:hidden relative">
            {/* Vertical connecting line */}
            <div className="absolute top-0 bottom-0 left-10 w-[2px] overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  background: "linear-gradient(180deg, rgba(0,120,170,0.1) 0%, rgba(0,120,170,0.3) 30%, rgba(124,58,237,0.3) 50%, rgba(0,120,170,0.3) 70%, rgba(0,120,170,0.1) 100%)",
                }}
              />
            </div>

            <div className="flex flex-col gap-12">
              {steps.map((step, index) => {
                const Icon = iconMap[step.icon] || Inbox
                return (
                  <div key={index} className="relative flex items-start gap-5 group">
                    {/* Glassmorphism icon container (mobile) */}
                    <div className="relative flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl border border-white/60 dark:border-white/[0.12] shadow-[0_4px_24px_rgba(0,120,170,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_4px_24px_rgba(0,120,170,0.15),inset_0_1px_0_rgba(255,255,255,0.06)]">
                        <Icon className="w-7 h-7 text-[#0078AA] dark:text-[#00D4FF]" />
                      </div>
                      {/* Number badge */}
                      <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#0F172A] dark:bg-white flex items-center justify-center shadow-lg ring-2 ring-[#F8FAFC] dark:ring-[#0A0E1A]">
                        <span className="text-[11px] font-bold text-white dark:text-[#0F172A]">
                          {step.num}
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="pt-2">
                      <h3 className="font-bold text-foreground text-base mb-1.5 tracking-tight">
                        {step.label}
                      </h3>
                      <p className="text-sm text-foreground/50 dark:text-foreground/45 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Detail Cards Grid */}
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

                {/* Glassmorphism icon */}
                <div className="relative w-12 h-12 rounded-xl mb-5 flex items-center justify-center flex-shrink-0 bg-white/60 dark:bg-white/[0.06] backdrop-blur-lg border border-white/50 dark:border-white/[0.1] shadow-[0_2px_12px_rgba(0,120,170,0.08)] dark:shadow-[0_2px_12px_rgba(0,120,170,0.12)] group-hover:shadow-[0_4px_20px_rgba(0,120,170,0.15)] dark:group-hover:shadow-[0_4px_20px_rgba(0,120,170,0.2)] group-hover:scale-105 transition-all duration-300">
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

        {/* Closing Statement */}
        <div className="mt-16 sm:mt-20 max-w-2xl mx-auto">
          <p className="text-center text-foreground/70 dark:text-foreground/60 text-sm sm:text-base leading-relaxed font-medium px-6 py-5 rounded-2xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.06] dark:border-white/[0.07]">
            {t("closing")}
          </p>
        </div>
      </div>
    </section>
  )
}
