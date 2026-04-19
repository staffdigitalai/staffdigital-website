"use client"

import { Database, Server, Calendar, MessageSquare, BarChart3, Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { IconBadge } from "@/components/ui/icon-system"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"
import { motion } from "framer-motion"

interface IntegrationItem {
  category: string
  tools: string
}

// Icons chosen to signal the category type, not branded tool logos.
const CATEGORY_ICONS = [Database, Server, Calendar, MessageSquare, BarChart3, Zap]

export function IntegrationsBlock() {
  const t = useTranslations("home_integrations")
  const items = t.raw("items") as IntegrationItem[]
  const header = useMotionReveal()
  const stagger = useStaggerContainer()
  const item = useStaggerItem()

  return (
    <section
      aria-labelledby="home-integrations-title"
      className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden bg-white dark:bg-bg-elevated"
    >
      <div className="max-w-5xl mx-auto relative">
        <motion.div {...header} className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/[0.06] border border-foreground/[0.1] dark:border-white/[0.1] text-xs font-semibold tracking-widest text-foreground/65 dark:text-white/55 uppercase backdrop-blur-sm mb-6">
            {t("badge")}
          </span>
          <h2
            id="home-integrations-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-5"
          >
            <span className="block">{t("title_plain")}</span>
            <span className="block bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
              {t("title_gradient")}
            </span>
          </h2>
          <p className="text-foreground/55 dark:text-foreground/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = CATEGORY_ICONS[i] ?? Zap
            return (
              <motion.div
                key={it.category}
                {...item}
                className="p-6 sm:p-7 rounded-2xl border border-foreground/[0.06] dark:border-white/[0.08] bg-bg-subtle dark:bg-white/[0.03]"
              >
                <div className="flex items-start gap-4">
                  <IconBadge icon={Icon} size="md" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-foreground tracking-tight mb-1.5">
                      {it.category}
                    </h3>
                    <p className="text-sm text-foreground/55 dark:text-foreground/45 leading-relaxed break-words">
                      {it.tools}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
