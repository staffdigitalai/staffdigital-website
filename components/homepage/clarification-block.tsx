"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Shield, HeartPulse, Building2, GraduationCap, Users, Zap, Receipt, Sprout } from "lucide-react"
import { IconBadge } from "@/components/ui/icon-system"

const ICONS = [Shield, HeartPulse, Building2, GraduationCap, Users, Zap, Receipt, Sprout] as const

// Card span pattern: [2,1,1, 1,1,2, 2,2] on lg
const COL_SPANS = [2, 1, 1, 1, 1, 2, 2, 2] as const

interface CardItem {
  title: string
  description: string
}

export function ClarificationBlock() {
  const t = useTranslations("bento_grid")
  const items = t.raw("items") as CardItem[]
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll<HTMLElement>("[data-card-index]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-card-index"))
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(idx))
            }, idx * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0A0E1A]">
      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF4FF] dark:bg-[#0F1B2E] border border-[#0062CC]/25 dark:border-[#38BDF8]/40 text-[#0062CC] dark:text-[#7DD3FC] text-sm font-medium mb-6">
            <span className="text-[#38BDF8]">{"\u2726"}</span>
            {t("badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.slice(0, 8).map((item, index) => {
            const Icon = ICONS[index]
            const span = COL_SPANS[index] ?? 1
            const isVisible = visibleCards.has(index)

            return (
              <div
                key={index}
                data-card-index={index}
                className={`group relative bg-white dark:bg-[#111827] rounded-2xl p-6 sm:p-7
                  border border-slate-200/60 dark:border-white/[0.08]
                  shadow-[0_1px_3px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                  hover:-translate-y-1 transition-all duration-700
                  overflow-hidden
                  ${span === 2 ? "lg:col-span-2" : ""}
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                {/* Functional icon badge */}
                <IconBadge icon={Icon} size="md" className="mb-4" />

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
