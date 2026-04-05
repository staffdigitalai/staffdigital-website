"use client"

import Image from "next/image"
import { MessageSquare, Phone, Globe, Mail, Share2 } from "lucide-react"
import { useTranslations } from "next-intl"

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title_1")}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {t("title_2")}
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {channels.map((ch) => (
            <div
              key={ch.name}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center space-y-3 hover:bg-white/10 transition-colors"
            >
              <ch.icon className="w-8 h-8 text-white/80 mx-auto" />
              <h3 className="font-bold text-sm">{ch.name}</h3>
              <p className="text-xs text-white/50">{ch.line1}</p>
              <p className="text-xs text-white/40">{ch.line2}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-2xl mx-auto">
          <Image
            src="/images/homepage/omnichannel.jpg"
            alt="Bandeja única Chatwoot: WhatsApp, teléfono, chat web, email y redes sociales conectados a agentes IA"
            width={1200}
            height={686}
            loading="lazy"
            className="rounded-2xl border border-white/10 opacity-80"
          />
        </div>

        <p className="text-center text-white/50 mt-6 text-sm italic">
          {t("context_note")}
        </p>
      </div>
    </section>
  )
}
