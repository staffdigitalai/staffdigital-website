"use client"

import { Shield, Clock, Headphones } from "lucide-react"
import { useTranslations } from "next-intl"

const statIcons = [Shield, Clock, Headphones]

export function SocialProofBlock() {
  const t = useTranslations("social_proof")

  const translatedItems = t.raw("items") as { label: string; sublabel: string }[]

  const stats = translatedItems.map((item, i) => ({
    ...item,
    icon: statIcons[i],
  }))

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t("title")}</h2>
          <p className="text-white/50 text-sm">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center space-y-3">
              <s.icon className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="font-bold text-white text-sm">{s.label}</div>
              <div className="text-xs text-white/40">{s.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
