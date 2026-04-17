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
    container: "bg-gradient-to-br from-gradient-from/[0.15] to-brand-secondary/[0.06] dark:from-gradient-from/[0.3] dark:to-gradient-from/[0.12] border border-brand-secondary/25 dark:border-brand-secondary/30 shadow-[0_8px_24px_rgba(0,120,170,0.15)] dark:shadow-[0_8px_24px_rgba(0,120,170,0.25)] hover:shadow-[0_8px_30px_rgba(0,120,170,0.25)]",
    icon: "text-brand-secondary dark:text-accent-cyan",
    badge: "bg-brand-secondary",
    exampleKey: "example1",
  },
  {
    container: "bg-gradient-to-br from-gradient-from/[0.12] to-gradient-to/[0.08] dark:from-gradient-from/[0.25] dark:to-gradient-to/[0.15] border border-accent-blue/20 dark:border-accent-violet/25 shadow-[0_8px_24px_rgba(79,70,229,0.12)] dark:shadow-[0_8px_24px_rgba(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.2)]",
    icon: "text-accent-blue dark:text-accent-violet",
    badge: "bg-gradient-to-r from-gradient-from to-gradient-to",
    exampleKey: "example2",
  },
  {
    container: "bg-gradient-to-br from-brand-primary/[0.1] to-brand-secondary/[0.06] dark:from-brand-primary/[0.25] dark:to-brand-secondary/[0.12] border border-brand-primary/20 dark:border-accent-violet/25 shadow-[0_8px_24px_rgba(124,58,237,0.12)] dark:shadow-[0_8px_24px_rgba(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]",
    icon: "text-brand-primary dark:text-accent-violet",
    badge: "bg-brand-primary",
    exampleKey: "example3",
  },
  {
    container: "bg-gradient-to-br from-brand-primary/[0.15] to-gradient-to/[0.06] dark:from-accent-violet/[0.3] dark:to-gradient-to/[0.12] border border-brand-primary/25 dark:border-accent-violet/30 shadow-[0_8px_24px_rgba(124,58,237,0.15)] dark:shadow-[0_8px_24px_rgba(168,85,247,0.25)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.25)]",
    icon: "text-brand-primary dark:text-accent-violet",
    badge: "bg-brand-primary",
    exampleKey: "example4",
  },
]

export function HowItWorksBlock() {
  const t = useTranslations("how_it_works")
  const steps = t.raw("steps") as Step[]

  return (
    <section
      id="how-it-works"
      className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden bg-bg-page dark:bg-bg-page"
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
              <div className="w-full h-full rounded-full bg-gradient-to-r from-gradient-from/40 via-gradient-via/35 to-gradient-to/40 dark:from-gradient-from/50 dark:via-gradient-via/45 dark:to-gradient-to/50" />
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
                      {t(style.exampleKey)}
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
              <div className="w-full h-full bg-gradient-to-b from-gradient-from/40 via-gradient-via/35 to-gradient-to/40 dark:from-gradient-from/50 dark:via-gradient-via/45 dark:to-gradient-to/50" />
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
                        {t(style.exampleKey)}
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
          <div className="w-12 h-[2px] bg-gradient-to-r from-gradient-from to-gradient-to mx-auto mb-6 rounded-full" />
          <p className="text-foreground/50 dark:text-foreground/40 text-base sm:text-lg italic leading-relaxed">
            {t("closing")}
          </p>
        </div>
      </div>
    </section>
  )
}
