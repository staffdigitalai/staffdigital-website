"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Shield, HeartPulse, Building2, GraduationCap, Users, Zap, Receipt, Sprout } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

const ICONS = [Shield, HeartPulse, Building2, GraduationCap, Users, Zap, Receipt, Sprout] as const

// Card span pattern: [2,1,1, 1,1,2, 2,2] on lg
const COL_SPANS = [2, 1, 1, 1, 1, 2, 2, 2] as const

interface CardItem {
  title: string
  description: string
}

export function UseCasesBlock() {
  const t = useTranslations("use_cases")
  const locale = useLocale()
  const prefix = locale === "es" ? "" : `/${locale}`
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
            // Stagger: delay = index * 100ms
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
    <section className="py-28 sm:py-36 px-6 sm:px-8 relative overflow-hidden bg-bg-page dark:bg-bg-page">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 pointer-events-none dot-pattern" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            <span className="text-foreground">{t("title_plain")} </span>
            <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
              {t("title_gradient")}
            </span>
          </h2>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.slice(0, 8).map((item, index) => {
            const Icon = ICONS[index]
            const span = COL_SPANS[index] ?? 1
            const isVisible = visibleCards.has(index)

            return (
              <div
                key={index}
                data-card-index={index}
                className={`group relative bg-white dark:bg-bg-elevated rounded-2xl p-6 sm:p-7
                  border border-slate-200/60 dark:border-white/[0.08]
                  shadow-[0_1px_3px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                  hover:-translate-y-1 transition-all duration-500
                  overflow-hidden
                  ${span === 2 ? "lg:col-span-2" : ""}
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
                style={{ transitionDelay: isVisible ? "0ms" : undefined }}
              >
                {/* Icon with glow on hover */}
                <div className="relative w-11 h-11 rounded-xl bg-bg-subtle dark:bg-bg-subtle flex items-center justify-center mb-4
                  group-hover:bg-brand-secondary/10 dark:group-hover:bg-accent-cyan/10 transition-colors duration-300 icon-glow">
                  <Icon
                    className={`w-5 h-5 text-brand-secondary dark:text-accent-cyan transition-all duration-700 ${
                      isVisible ? "icon-draw-visible" : "icon-draw-hidden"
                    }`}
                  />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-14">
          <Link
            href={`${prefix}/soluciones`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-brand-secondary dark:text-brand-secondary font-semibold text-sm transition-all duration-300 hover:bg-brand-secondary/[0.06] dark:hover:bg-brand-secondary/[0.08] border border-brand-secondary/15 dark:border-brand-secondary/15 group"
          >
            {t("cta")}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
