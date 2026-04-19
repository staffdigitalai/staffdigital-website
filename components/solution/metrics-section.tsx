"use client"

import { motion } from "framer-motion"
import { TrendingUp, Zap, Rocket, Clock } from "lucide-react"
import { useTranslations } from "next-intl"
import { IconBadge } from "@/components/ui/icon-system"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"
import type { SolutionMetric } from "@/lib/solution-fallback-content"

const METRIC_ICONS = [TrendingUp, Zap, Rocket, Clock]

/**
 * Metrics with context — same shape as the homepage social-proof
 * block (PR #80): value + label + single line of context. Three or
 * four cards depending on what the fallback provides.
 */
export function SolutionMetricsSection({ metrics }: { metrics: SolutionMetric[] }) {
  const t = useTranslations("solution_ui")
  const header = useMotionReveal()
  const stagger = useStaggerContainer()
  const item = useStaggerItem()

  if (!metrics || metrics.length === 0) return null

  return (
    <section
      aria-labelledby="solution-metrics-title"
      className="px-4 sm:px-6 py-20 md:py-24 bg-bg-subtle dark:bg-bg-elevated/40"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div {...header} className="text-center mb-12">
          <h2
            id="solution-metrics-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-fg-primary tracking-tight mb-4"
          >
            {t("metrics_title")}
          </h2>
          <p className="text-fg-muted max-w-2xl mx-auto">{t("metrics_subtitle")}</p>
        </motion.div>

        <motion.div
          {...stagger}
          className={`grid grid-cols-2 ${metrics.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-5`}
        >
          {metrics.map((m, i) => {
            const Icon = METRIC_ICONS[i % METRIC_ICONS.length]
            return (
              <motion.div
                key={`${m.label}-${i}`}
                {...item}
                className="card-premium p-6 sm:p-7 rounded-2xl"
              >
                <IconBadge icon={Icon} size="md" className="mb-4" />
                <div className="text-3xl sm:text-4xl font-bold text-fg-primary mb-2 tracking-tight">
                  {m.value}
                </div>
                <p className="text-sm font-medium text-fg-secondary leading-snug mb-2">
                  {m.label}
                </p>
                <p className="text-[11px] text-fg-muted leading-relaxed">
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
