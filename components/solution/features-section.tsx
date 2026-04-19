"use client"

import { motion } from "framer-motion"
import {
  Inbox, User, Zap, GitBranch, Shield, TrendingUp, MessageSquare, Target,
  Calendar, Bot, BarChart3, Globe, Phone, Users, Headphones, Bell,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { IconBadge } from "@/components/ui/icon-system"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"
import type { SolutionFeature } from "@/lib/solution-fallback-content"

const ICON_MAP: Record<string, LucideIcon> = {
  inbox: Inbox, user: User, zap: Zap, "git-branch": GitBranch, shield: Shield,
  "trending-up": TrendingUp, "message-square": MessageSquare, target: Target,
  calendar: Calendar, bot: Bot, "bar-chart": BarChart3, globe: Globe,
  phone: Phone, users: Users, headphones: Headphones, bell: Bell,
}

export function SolutionFeaturesSection({ features }: { features: SolutionFeature[] }) {
  const t = useTranslations("solution_ui")
  const header = useMotionReveal()
  const stagger = useStaggerContainer()
  const item = useStaggerItem()

  return (
    <section
      aria-labelledby="solution-features-title"
      className="px-4 sm:px-6 py-20 md:py-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div {...header} className="text-center mb-12 md:mb-14">
          <h2
            id="solution-features-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-fg-primary leading-tight tracking-tight mb-4"
          >
            {t("features_title")}
          </h2>
          <p className="text-fg-muted max-w-2xl mx-auto leading-relaxed">{t("features_subtitle")}</p>
        </motion.div>

        <motion.div
          {...stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f) => {
            const Icon = ICON_MAP[f.icon] ?? Zap
            return (
              <motion.div
                key={f.title}
                {...item}
                className="card-premium p-6 sm:p-7 rounded-2xl"
              >
                <IconBadge icon={Icon} size="md" className="mb-5" />
                <h3 className="text-lg font-bold text-fg-primary tracking-tight mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
