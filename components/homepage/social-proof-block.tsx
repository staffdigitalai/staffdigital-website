"use client"

import { ShieldCheck, Clock, HeadsetIcon } from "lucide-react"
import { useTranslations } from "next-intl"

const statIcons = [ShieldCheck, Clock, HeadsetIcon]

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
          <p className="text-foreground/50 text-sm">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div 
              key={s.label} 
              className="card-elevated p-6 rounded-2xl text-center space-y-4 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--purple-dark)]/10 hover:border-[rgba(124,58,237,0.3)] hover:-translate-y-1 cursor-default"
            >
              <div 
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(0, 120, 170, 0.15), rgba(124, 58, 237, 0.15))" }}
              >
                <s.icon className="w-6 h-6 text-[#0078AA]" />
              </div>
              <div className="font-bold text-foreground text-sm">{s.label}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{s.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
