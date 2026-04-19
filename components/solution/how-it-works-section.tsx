"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"
import type { SolutionHowStep } from "@/lib/solution-fallback-content"

export function SolutionHowItWorksSection({ steps }: { steps: SolutionHowStep[] }) {
  const t = useTranslations("solution_ui")
  const header = useMotionReveal()
  const stagger = useStaggerContainer(0.12)
  const item = useStaggerItem()

  return (
    <section
      aria-labelledby="solution-how-title"
      className="px-4 sm:px-6 py-20 md:py-24 bg-bg-subtle dark:bg-bg-elevated/40"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div {...header} className="text-center mb-14">
          <h2
            id="solution-how-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-fg-primary tracking-tight mb-4"
          >
            {t("how_it_works_title")}
          </h2>
          <p className="text-fg-muted max-w-2xl mx-auto">{t("how_it_works_subtitle")}</p>
        </motion.div>

        {/* Horizontal timeline (md+) with connecting line; stacks to vertical on mobile */}
        <motion.div {...stagger} className="relative grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6">
          {/* Connecting gradient line, desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-[12.5%] right-[12.5%] top-[40px] h-[2px] bg-gradient-to-r from-gradient-from/50 via-gradient-via/50 to-gradient-to/50"
          />
          {steps.map((s) => (
            <motion.div key={s.step} {...item} className="relative text-center">
              <div className="relative mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-bg-card dark:bg-bg-elevated border-2 border-brand-primary/30 shadow-sm">
                <span className="text-2xl font-bold bg-gradient-to-br from-gradient-from to-gradient-to bg-clip-text text-transparent">
                  {s.step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-fg-primary tracking-tight mb-2">{s.title}</h3>
              <p className="text-sm text-fg-muted leading-relaxed max-w-[220px] mx-auto">
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
