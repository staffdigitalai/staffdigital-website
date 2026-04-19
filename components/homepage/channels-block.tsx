"use client"

import { MessageCircle, MessageSquare, Phone, Mail } from "lucide-react"
import { useTranslations } from "next-intl"
import { IconBadge } from "@/components/ui/icon-system"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"
import { motion } from "framer-motion"

interface ChannelItem {
  icon: string
  name: string
  description: string
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: MessageCircle,
  "web-chat": MessageSquare,
  phone: Phone,
  email: Mail,
}

export function ChannelsBlock() {
  const t = useTranslations("home_channels")
  const items = t.raw("items") as ChannelItem[]
  const header = useMotionReveal()
  const stagger = useStaggerContainer()
  const item = useStaggerItem()

  return (
    <section
      aria-labelledby="home-channels-title"
      className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative">
        <motion.div {...header} className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/[0.06] border border-foreground/[0.1] dark:border-white/[0.1] text-xs font-semibold tracking-widest text-foreground/65 dark:text-white/55 uppercase backdrop-blur-sm mb-6">
            {t("badge")}
          </span>
          <h2
            id="home-channels-title"
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

        <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((ch) => {
            const Icon = ICON_MAP[ch.icon] ?? MessageCircle
            return (
              <motion.div
                key={ch.name}
                {...item}
                className="card-premium p-6 sm:p-7 rounded-2xl"
              >
                <IconBadge icon={Icon} size="md" className="mb-5" />
                <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">
                  {ch.name}
                </h3>
                <p className="text-sm text-foreground/55 dark:text-foreground/45 leading-relaxed">
                  {ch.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
