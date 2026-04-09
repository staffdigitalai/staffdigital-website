"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

// Premium 3D glassmorphism icons - order matches stack items in es.json
// 1. Canales (Bandeja Omnicanal) → Chat bubbles
// 2. IA (Agentes IA Autónomos) → Brain
// 3. Citas (Agenda Integrada) → Calendar
// 4. Datos (CRM con IA) → Database
const glassIcons = [
  { src: "/images/icons/glass-chat.png", alt: "Bandeja omnicanal" },
  { src: "/images/icons/glass-brain.png", alt: "Agentes IA autónomos" },
  { src: "/images/icons/glass-calendar.png", alt: "Agenda integrada" },
  { src: "/images/icons/glass-database.png", alt: "CRM con IA" },
]

export function DoneForYouBlock() {
  const t = useTranslations("done_for_you")

  const stackItems = (t.raw("stack") as { category: string; label: string; description: string }[]).map((item, i) => ({
    ...item,
    icon: glassIcons[i],
  }))

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title_1")}{" "}
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
              {t("title_2")}
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Stack cards — show what powers the platform */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stackItems.map((item) => (
            <div key={item.label} className="card-elevated p-6 md:p-8 rounded-2xl text-center space-y-4 hover:shadow-xl hover:shadow-[#0078AA]/10 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-center mx-auto mb-2">
                <Image
                  src={item.icon.src}
                  alt={item.icon.alt}
                  width={100}
                  height={100}
                  className="w-20 h-20 md:w-24 md:h-24 object-contain"
                />
              </div>
              <div className="text-xs text-[#0078AA] font-semibold uppercase tracking-wider">{item.category}</div>
              <div className="font-bold text-lg text-foreground">{item.label}</div>
              <p className="text-sm text-gray-600 dark:text-foreground/60 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
