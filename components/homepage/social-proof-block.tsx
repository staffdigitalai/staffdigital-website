"use client"

import { useTranslations } from "next-intl"
import { TrendingUp, Zap, Rocket } from "lucide-react"
import { motion } from "framer-motion"
import { IconBadge } from "@/components/ui/icon-system"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"

// One icon per metric, in the same order as `social_proof.metrics` in i18n:
//   [0] response-time reduction, [1] lead-conversion lift, [2] weeks to deploy.
const METRIC_ICONS = [TrendingUp, Zap, Rocket]

interface Metric {
  value: string
  label: string
  context: string
}

export function SocialProofBlock() {
  const t = useTranslations("social_proof")
  const metrics = t.raw("metrics") as Metric[]
  const header = useMotionReveal()
  const stagger = useStaggerContainer()
  const item = useStaggerItem()

  return (
    <section
      aria-labelledby="home-proof-title"
      className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative">
        <motion.div {...header} className="text-center mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/[0.06] border border-foreground/[0.1] dark:border-white/[0.1] text-xs font-semibold tracking-widest text-foreground/65 dark:text-white/55 uppercase backdrop-blur-sm mb-6">
            {t("badge")}
          </span>
          <h2
            id="home-proof-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.15] tracking-tight"
          >
            {t("title")}
          </h2>
        </motion.div>

        {/* Three metric cards, each with a single line of context. No
            case studies on the home — the brief is explicit about this. */}
        <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {metrics.map((m, i) => {
            const Icon = METRIC_ICONS[i] ?? TrendingUp
            return (
              <motion.div
                key={m.label}
                {...item}
                className="card-premium p-7 sm:p-8 rounded-2xl"
              >
                <IconBadge icon={Icon} size="md" className="mb-5" />
                <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2 tracking-tight">
                  {m.value}
                </div>
                <p className="text-base font-medium text-foreground/75 dark:text-foreground/70 leading-snug mb-3">
                  {m.label}
                </p>
                <p className="text-xs text-foreground/50 dark:text-foreground/45 leading-relaxed">
                  {m.context}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
