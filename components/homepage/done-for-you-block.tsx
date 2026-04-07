"use client"

import { MessageSquare, Calendar, Database, Cpu } from "lucide-react"
import { useTranslations } from "next-intl"

const stackIcons = [MessageSquare, Cpu, Calendar, Database]

export function DoneForYouBlock() {
  const t = useTranslations("done_for_you")

  const stackItems = (t.raw("stack") as { category: string; label: string; description: string }[]).map((item, i) => ({
    ...item,
    icon: stackIcons[i],
  }))

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title_1")}{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              {t("title_2")}
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Stack cards — show what powers the platform */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stackItems.map((item) => (
            <div key={item.label} className="card-elevated p-5 rounded-xl text-center space-y-3 hover:shadow-lg transition-all duration-300">
              <div 
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(0, 120, 170, 0.15), rgba(124, 58, 237, 0.15))" }}
              >
                <item.icon className="w-6 h-6 text-[#0078AA]" />
              </div>
              <div className="text-xs text-[#0078AA] font-semibold uppercase tracking-wide">{item.category}</div>
              <div className="font-bold text-base text-foreground">{item.label}</div>
              <p className="text-sm text-gray-600 dark:text-foreground/60 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
