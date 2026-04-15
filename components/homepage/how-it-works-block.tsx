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

/* Per-step color configurations */
const stepStyles = [
  {
    container: "bg-gradient-to-br from-sky-100 to-sky-50 dark:from-[#0078AA]/20 dark:to-[#00D4FF]/10 border border-sky-200/60 dark:border-[#00D4FF]/20 shadow-lg shadow-sky-100/50 dark:shadow-[#0078AA]/10",
    icon: "text-[#0078AA] dark:text-[#38BDF8]",
    badge: "bg-[#0078AA]",
    example: "Llamada \u2192 transcrita \u2192 datos extra\u00eddos \u2192 flujo iniciado",
  },
  {
    container: "bg-gradient-to-br from-violet-100 to-violet-50 dark:from-[#7C3AED]/20 dark:to-[#A855F7]/10 border border-violet-200/60 dark:border-[#A855F7]/20 shadow-lg shadow-violet-100/50 dark:shadow-[#7C3AED]/10",
    icon: "text-[#7C3AED] dark:text-[#A855F7]",
    badge: "bg-[#7C3AED]",
    example: "Intenci\u00f3n: reagendar \u2192 contexto: cita #4521",
  },
  {
    container: "bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-[#4F46E5]/20 dark:to-[#818CF8]/10 border border-indigo-200/60 dark:border-[#818CF8]/20 shadow-lg shadow-indigo-100/50 dark:shadow-[#4F46E5]/10",
    icon: "text-[#4F46E5] dark:text-[#818CF8]",
    badge: "bg-[#4F46E5]",
    example: "Si disponibilidad > 0 \u2192 reagendar \u2192 confirmar",
  },
  {
    container: "bg-gradient-to-br from-amber-100 to-amber-50 dark:from-[#F59E0B]/20 dark:to-[#FBBF24]/10 border border-amber-200/60 dark:border-[#FBBF24]/20 shadow-lg shadow-amber-100/50 dark:shadow-[#F59E0B]/10",
    icon: "text-[#F59E0B] dark:text-[#FBBF24]",
    badge: "bg-gradient-to-br from-[#F59E0B] to-[#EF4444]",
    example: "SMS enviado \u2192 CRM actualizado \u2192 caso cerrado",
  },
]

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

        {/* ─── Timeline ─── */}
        <div className="relative">

          {/* === DESKTOP: Horizontal timeline (md+) === */}
          <div className="hidden md:block relative">
            {/* Animated gradient connecting line — all 4 step colors */}
            <div className="absolute top-12 left-[12%] right-[12%] h-[2px] overflow-hidden">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-[#0078AA]/30 via-[#7C3AED]/25 to-[#F59E0B]/30 dark:from-[#0078AA]/40 dark:via-[#7C3AED]/35 dark:to-[#F59E0B]/40" />
            </div>

            <div className="grid grid-cols-4 gap-4 lg:gap-6">
              {steps.map((step, index) => {
                const Icon = iconMap[step.icon] || Inbox
                const style = stepStyles[index] || stepStyles[0]
                return (
                  <div key={index} className="relative text-center group">
                    {/* Colored gradient icon container */}
                    <div className="relative mx-auto mb-5">
                      <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mx-auto ${style.container} hover:scale-105 transition-all duration-500`}>
                        <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${style.icon}`} />
                      </div>

                      {/* Number badge */}
                      <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${style.badge} flex items-center justify-center shadow-md`}>
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

                    {/* Mono example flow text */}
                    <p className="font-mono text-[11px] text-foreground/30 dark:text-foreground/25 mt-2.5 max-w-[200px] mx-auto leading-relaxed">
                      {style.example}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* === MOBILE: Vertical timeline (<md) === */}
          <div className="md:hidden relative">
            {/* Vertical connecting line — all 4 step colors */}
            <div className="absolute top-0 bottom-0 left-10 w-[2px] overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-[#0078AA]/30 via-[#7C3AED]/25 to-[#F59E0B]/30 dark:from-[#0078AA]/40 dark:via-[#7C3AED]/35 dark:to-[#F59E0B]/40" />
            </div>

            <div className="flex flex-col gap-12">
              {steps.map((step, index) => {
                const Icon = iconMap[step.icon] || Inbox
                const style = stepStyles[index] || stepStyles[0]
                return (
                  <div key={index} className="relative flex items-start gap-5 group">
                    {/* Colored gradient icon container (mobile) */}
                    <div className="relative flex-shrink-0">
                      <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center ${style.container} hover:scale-105 transition-all duration-500`}>
                        <Icon className={`w-8 h-8 ${style.icon}`} />
                      </div>

                      {/* Number badge */}
                      <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${style.badge} flex items-center justify-center shadow-md`}>
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
                      {/* Mono example flow text */}
                      <p className="font-mono text-[11px] text-foreground/30 dark:text-foreground/25 mt-2.5 leading-relaxed">
                        {style.example}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ─── Closing Statement ─── */}
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
