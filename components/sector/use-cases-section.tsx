"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SolutionMockup } from "@/components/solution-mockups"
import type { SectorUseCase } from "@/lib/sector-fallback-content"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"

interface UseCasesSectionProps {
  useCases: SectorUseCase[]
  title: string
  subtitle?: string
}

export function SectorUseCasesSection({
  useCases,
  title,
  subtitle,
}: UseCasesSectionProps) {
  const headerReveal = useMotionReveal()
  const stagger = useStaggerContainer(0.12)
  const staggerItem = useStaggerItem()

  return (
    <section
      aria-labelledby="sector-usecases-title"
      className="px-4 sm:px-6 py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...headerReveal}
          className="text-center mb-12 md:mb-14"
        >
          <h2
            id="sector-usecases-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance leading-tight tracking-tight"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-lg text-foreground/55 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          {...stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {useCases.map((uc, i) => (
            <motion.article
              key={i}
              {...staggerItem}
              className="group rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/20 transition-all duration-300 overflow-hidden"
            >
              {/* Mockup preview */}
              <div className="relative w-full h-36 overflow-hidden border-b border-foreground/5">
                <SolutionMockup slug={uc.mockupSlug} />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,120,170,0.08))" }}
                  aria-hidden="true"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 leading-snug">
                  {uc.titulo}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                  {uc.descripcion}
                </p>
                <Link
                  href={`/soluciones/${uc.mockupSlug}`}
                  className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-brand-secondary transition-colors"
                >
                  Ver solución
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
