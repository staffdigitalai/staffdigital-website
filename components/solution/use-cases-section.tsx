"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Building2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { IconBadge } from "@/components/ui/icon-system"
import { SECTOR_SLUGS, cptPath } from "@/lib/cpt-slugs"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"
import type { SolutionUseCase } from "@/lib/solution-fallback-content"

/**
 * Cross-sell strip: three cards, each pointing at a /sectores/ page.
 * Locale-aware hrefs via the shared cptPath + SECTOR_SLUGS map from
 * lib/cpt-slugs.ts (same source as nav/footer — PR #77/#82).
 */
export function SolutionUseCasesSection({
  useCases,
  locale,
}: {
  useCases: SolutionUseCase[]
  locale: string
}) {
  const t = useTranslations("solution_ui")
  const header = useMotionReveal()
  const stagger = useStaggerContainer()
  const item = useStaggerItem()

  return (
    <section
      aria-labelledby="solution-usecases-title"
      className="px-4 sm:px-6 py-20 md:py-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div {...header} className="text-center mb-12">
          <h2
            id="solution-usecases-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-fg-primary tracking-tight mb-4"
          >
            {t("use_cases_title")}
          </h2>
          <p className="text-fg-muted max-w-2xl mx-auto">{t("use_cases_subtitle")}</p>
        </motion.div>

        <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {useCases.map((uc) => (
            <motion.div key={uc.sectorSlug} {...item}>
              <Link
                href={cptPath("/sectores", uc.sectorSlug, locale, SECTOR_SLUGS)}
                className="group block card-premium p-6 sm:p-7 rounded-2xl hover:shadow-[0_8px_30px_rgba(0,120,170,0.15)] transition-all duration-300"
              >
                <IconBadge icon={Building2} size="md" className="mb-5" />
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary mb-2">
                  {t("ideal_for", { sector: uc.title })}
                </p>
                <h3 className="text-lg font-bold text-fg-primary tracking-tight mb-3">
                  {uc.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed mb-5">
                  {uc.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg-secondary group-hover:text-brand-primary transition-colors">
                  {uc.title}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
