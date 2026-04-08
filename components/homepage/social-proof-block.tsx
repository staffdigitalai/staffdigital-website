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
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span>Infraestructura IA </span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">segura y gestionada</span>
          </h2>
          <p className="text-foreground/50 text-sm">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div 
              key={s.label} 
              className="card-elevated p-6 rounded-2xl text-center space-y-4 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--purple-dark)]/10 hover:border-[rgba(124,58,237,0.3)] hover:-translate-y-1 cursor-default"
            >
              <div 
                className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center"
                style={{ 
                  background: "linear-gradient(135deg, rgb(0, 120, 170), rgb(124, 58, 237))",
                  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)"
                }}
              >
                <s.icon className="w-7 h-7 text-white" />
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
