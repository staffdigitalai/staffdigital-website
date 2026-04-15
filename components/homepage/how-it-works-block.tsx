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
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none blur-3xl"
        style={{
          background: "radial-gradient(ellipse, rgba(0,120,170,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="hidden dark:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none blur-3xl"
        style={{
          background: "radial-gradient(ellipse, rgba(0,120,170,0.08) 0%, transparent 70%)",
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

        {/* ─── PART 1: Glassmorphism Step Timeline ─── */}
        <div className="relative mb-20 sm:mb-24">

          {/* === DESKTOP: Horizontal timeline (md+) === */}
          <div className="hidden md:block relative">
            {/* Animated gradient connecting line */}
            <div className="absolute top-12 left-[12%] right-[12%] h-[2px] overflow-hidden">
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
                      {/* Hover glow layer behind glass */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0078AA]/30 to-[#7C3AED]/20 dark:from-[#00D4FF]/25 dark:to-[#A855F7]/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-20 h-20 sm:w-24 sm:h-24 mx-auto" />

                      {/* Glass container */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mx-auto bg-white/60 dark:bg-white/[0.08] backdrop-blur-xl border border-white/80 dark:border-white/[0.15] shadow-[0_8px_32px_rgba(0,120,170,0.08)] dark:shadow-[0_8px_32px_rgba(0,212,255,0.06)] group-hover:border-[#0078AA]/30 dark:group-hover:border-[#00D4FF]/25 group-hover:shadow-[0_8px_40px_rgba(0,120,170,0.15)] dark:group-hover:shadow-[0_8px_40px_rgba(0,212,255,0.12)] transition-all duration-500">
                        {/* Inner gradient shine overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/[0.06] pointer-events-none" />
                        <Icon className="relative w-8 h-8 sm:w-10 sm:h-10 text-[#0078AA] dark:text-[#00D4FF]" />
                      </div>

                      {/* Number badge */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center shadow-lg">
                        <span className="text-[11px] font-bold text-white">
                          {step.num}
                        </span>
                      </div>
                    </div>

                    {/* Label */}
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mt-5 mb-1.5">
                      {step.label}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-foreground/50 dark:text-foreground/45 max-w-[180px] mx-auto leading-relaxed text-center">
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
                      {/* Hover glow layer */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0078AA]/30 to-[#7C3AED]/20 dark:from-[#00D4FF]/25 dark:to-[#A855F7]/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center bg-white/60 dark:bg-white/[0.08] backdrop-blur-xl border border-white/80 dark:border-white/[0.15] shadow-[0_8px_32px_rgba(0,120,170,0.08)] dark:shadow-[0_8px_32px_rgba(0,212,255,0.06)]">
                        {/* Inner gradient shine */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/[0.06] pointer-events-none" />
                        <Icon className="relative w-8 h-8 text-[#0078AA] dark:text-[#00D4FF]" />
                      </div>

                      {/* Number badge */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center shadow-lg">
                        <span className="text-[11px] font-bold text-white">
                          {step.num}
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="pt-2">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mt-5 mb-1.5">
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

        {/* ─── PART 2: Detail Cards ─── */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon] || Inbox
            return (
              <div
                key={`card-${index}`}
                className="group relative rounded-2xl p-7 sm:p-8 overflow-hidden bg-white dark:bg-[#111827] border border-foreground/[0.06] dark:border-white/[0.08] hover:border-[#0078AA]/20 dark:hover:border-[#00D4FF]/15 hover:shadow-lg dark:hover:shadow-[0_4px_24px_rgba(0,212,255,0.06)] transition-all duration-300"
              >
                {/* Step number watermark */}
                <div className="absolute top-5 right-5 text-5xl sm:text-6xl font-bold text-foreground/[0.03] dark:text-white/[0.04] leading-none select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Glassmorphism mini-icon */}
                <div className="relative w-11 h-11 rounded-xl mb-5 flex items-center justify-center flex-shrink-0 bg-[#0078AA]/[0.06] dark:bg-[#00D4FF]/[0.08] backdrop-blur-sm border border-[#0078AA]/[0.12] dark:border-[#00D4FF]/[0.1]">
                  <Icon className="w-5 h-5 text-[#0078AA] dark:text-[#00D4FF]" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2.5 leading-tight tracking-tight">
                  {step.card_title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-[15px] text-foreground/60 dark:text-foreground/50 leading-relaxed">
                  {step.card_text}
                </p>

                {/* Example flow line */}
                <div className="mt-5 pt-4 border-t border-foreground/[0.06] dark:border-white/[0.06]">
                  <p className="text-xs sm:text-[13px] text-foreground/40 dark:text-foreground/35 font-mono leading-relaxed">
                    {step.card_example}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* ─── PART 3: Closing Statement ─── */}
        <div className="text-center max-w-2xl mx-auto mt-16 sm:mt-20">
          {/* Decorative gradient line */}
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#0078AA] to-[#7C3AED] mx-auto mb-6 rounded-full" />
          <p className="text-foreground/50 dark:text-foreground/40 text-base sm:text-lg italic leading-relaxed">
            {t("closing")}
          </p>
        </div>
      </div>
    </section>
  )
}
