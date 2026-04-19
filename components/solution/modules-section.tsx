"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Layers } from "lucide-react"
import { useTranslations } from "next-intl"
import { SolutionMockup } from "@/components/solution-mockups"
import { IconBadge } from "@/components/ui/icon-system"
import { useMotionReveal } from "@/hooks/use-motion-reveal"
import type { SolutionModule } from "@/lib/solution-fallback-content"

export function SolutionModulesSection({ modules }: { modules: SolutionModule[] }) {
  const t = useTranslations("solution_ui")
  const header = useMotionReveal()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      aria-labelledby="solution-modules-title"
      className="px-4 sm:px-6 py-20 md:py-24"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div {...header} className="text-center mb-12">
          <h2
            id="solution-modules-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-fg-primary tracking-tight mb-4"
          >
            {t("modules_title")}
          </h2>
          <p className="text-fg-muted max-w-2xl mx-auto">{t("modules_subtitle")}</p>
        </motion.div>

        <div className="space-y-3">
          {modules.map((m, i) => {
            const isOpen = i === openIndex
            return (
              <div
                key={m.title}
                className="rounded-2xl border border-default bg-bg-card dark:bg-bg-elevated overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 p-5 sm:p-6 text-left"
                >
                  <IconBadge icon={Layers} size="sm" />
                  <h3 className="flex-1 text-base sm:text-lg font-bold text-fg-primary tracking-tight">
                    {m.title}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-fg-muted flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 grid md:grid-cols-[1fr_auto] gap-6 items-start">
                    <p className="text-sm text-fg-secondary leading-relaxed">{m.description}</p>
                    {m.mockupSlug && (
                      <div className="w-full md:w-72 rounded-xl border border-default overflow-hidden bg-bg-page">
                        <SolutionMockup slug={m.mockupSlug} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
