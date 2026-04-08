"use client"

import { useTranslations } from "next-intl"
import { glassStackIcons } from "@/components/icons/glass-icons"

export function DoneForYouBlock() {
  const t = useTranslations("done_for_you")

  const stackItems = (t.raw("stack") as { category: string; label: string; description: string }[]).map((item, i) => ({
    ...item,
    GlassIcon: glassStackIcons[i],
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stackItems.map((item) => (
            <div key={item.label} className="card-elevated p-5 rounded-xl text-center space-y-3 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center mx-auto">
                <item.GlassIcon />
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
