"use client"

import { MessageSquare, Phone, Globe, Mail, Share2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { IconBadge } from "@/components/ui/icon-system"

const channelIcons = [Phone, MessageSquare, Globe, Mail, Share2]

export function OmnichannelBlock() {
  const t = useTranslations("omnichannel")

  const translatedChannels = t.raw("channels") as { name: string; line1: string; line2: string }[]

  const channels = translatedChannels.map((ch, i) => ({
    ...ch,
    icon: channelIcons[i],
  }))

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("title_1")}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {t("title_2")}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {channels.map((ch) => (
            <div
              key={ch.name}
              className="group card-premium p-5 rounded-2xl text-center space-y-3"
            >
              <IconBadge icon={ch.icon} size="lg" className="mx-auto" />
              <h3 className="font-bold text-sm text-foreground">{ch.name}</h3>
              <p className="text-xs text-muted-foreground">{ch.line1}</p>
              <p className="text-xs text-muted-foreground/80">{ch.line2}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-700 dark:text-foreground/60 mt-8 text-sm italic font-medium">
          {t("context_note")}
        </p>
      </div>
    </section>
  )
}
