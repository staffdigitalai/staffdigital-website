"use client"

import { Inbox, Brain, GitBranch, Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { HighlightFeatureIcon } from "@/components/ui/icon-system"

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
    container: "bg-gradient-to-br from-[#0078AA]/[0.15] to-[#0078AA]/[0.06] dark:from-[#0078AA]/[0.3] dark:to-[#00D4FF]/[0.12] border border-[#0078AA]/25 dark:border-[#00D4FF]/30 shadow-[0_8px_24px_rgba(0,120,170,0.15)] dark:shadow-[0_8px_24px_rgba(0,120,170,0.25)] hover:shadow-[0_8px_30px_rgba(0,120,170,0.25)]",
    icon: "text-[#0078AA] dark:text-[#38BDF8]",
    badge: "bg-[#0078AA]",
    example: "Llamada \u2192 transcrita \u2192 datos extra\u00eddos \u2192 flujo iniciado",
  },
  {
    container: "bg-gradient-to-br from-[#0078AA]/[0.12] to-[#7C3AED]/[0.08] dark:from-[#0078AA]/[0.25] dark:to-[#7C3AED]/[0.15] border border-[#4F46E5]/20 dark:border-[#A855F7]/25 shadow-[0_8px_24px_rgba(79,70,229,0.12)] dark:shadow-[0_8px_24px_rgba(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.2)]",
    icon: "text-[#4F46E5] dark:text-[#A855F7]",
    badge: "bg-gradient-to-r from-[#0078AA] to-[#7C3AED]",
    example: "Intenci\u00f3n: reagendar \u2192 contexto: cita #4521",
  },
  {
    container: "bg-gradient-to-br from-[#7C3AED]/[0.1] to-[#0078AA]/[0.06] dark:from-[#7C3AED]/[0.25] dark:to-[#0078AA]/[0.12] border border-[#7C3AED]/20 dark:border-[#A855F7]/25 shadow-[0_8px_24px_rgba(124,58,237,0.12)] dark:shadow-[0_8px_24px_rgba(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]",
    icon: "text-[#7C3AED] dark:text-[#C084FC]",
    badge: "bg-[#7C3AED]",
    example: "Si disponibilidad > 0 \u2192 reagendar \u2192 confirmar",
  },
  {
    container: "bg-gradient-to-br from-[#7C3AED]/[0.15] to-[#7C3AED]/[0.06] dark:from-[#A855F7]/[0.3] dark:to-[#7C3AED]/[0.12] border border-[#7C3AED]/25 dark:border-[#A855F7]/30 shadow-[0_8px_24px_rgba(124,58,237,0.15)] dark:shadow-[0_8px_24px_rgba(168,85,247,0.25)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.25)]",
    icon: "text-[#7C3AED] dark:text-[#C084FC]",
    badge: "bg-[#7C3AED]",
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
              <div className="w-full h-full rounded-full bg-gradient-to-r from-[#0078AA]/40 via-[#4F46E5]/35 to-[#7C3AED]/40 dark:from-[#0078AA]/50 dark:via-[#4F46E5]/45 dark:to-[#7C3AED]/50" />
            </div>

            <div className="grid grid-cols-4 gap-4 lg:gap-6">
              {steps.map((step, index) => {
                const Icon = iconMap[step.icon] || Inbox
                const style = stepStyles[index] || stepStyles[0]
                return (
                  <div key={index} className="relative text-center group">
                    {/* Accent icon with numbered badge */}
                    <div className="mx-auto mb-5">
                      <HighlightFeatureIcon
                        icon={Icon}
                        stepNumber={step.num}
                        variant={index === 0 ? "primary" : index === 1 ? "mixed" : "secondary"}
                        size="lg"
                        badgeColor={style.badge}
                        className="mx-auto"
                      />
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
              <div className="w-full h-full bg-gradient-to-b from-[#0078AA]/40 via-[#4F46E5]/35 to-[#7C3AED]/40 dark:from-[#0078AA]/50 dark:via-[#4F46E5]/45 dark:to-[#7C3AED]/50" />
            </div>

            <div className="flex flex-col gap-12">
              {steps.map((step, index) => {
                const Icon = iconMap[step.icon] || Inbox
                const style = stepStyles[index] || stepStyles[0]
                return (
                  <div key={index} className="relative flex items-start gap-5 group">
                    {/* Accent icon with numbered badge (mobile) */}
                    <div className="flex-shrink-0">
                      <HighlightFeatureIcon
                        icon={Icon}
                        stepNumber={step.num}
                        variant={index === 0 ? "primary" : index === 1 ? "mixed" : "secondary"}
                        size="md"
                        badgeColor={style.badge}
                      />
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
