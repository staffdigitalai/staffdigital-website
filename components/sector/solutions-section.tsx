"use client"

import { motion } from "framer-motion"
import {
  Check, Phone, MessageSquare, Link2, Brain, Calendar, Zap, Target,
  TrendingUp, ShoppingCart, Package, Heart, Sparkles, Wrench, Globe,
  type LucideIcon,
} from "lucide-react"
import type { SectorSolution } from "@/lib/sector-fallback-content"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"

const iconMap: Record<string, LucideIcon> = {
  Check, Phone, MessageSquare, Link2, Brain, Calendar, Zap, Target,
  TrendingUp, ShoppingCart, Package, Heart, Sparkles, Wrench, Globe,
}

interface SolutionsSectionProps {
  solutions: SectorSolution[]
  title: string
  sectorName: string
}

export function SectorSolutionsSection({
  solutions,
  title,
  sectorName,
}: SolutionsSectionProps) {
  const headerReveal = useMotionReveal()
  const stagger = useStaggerContainer(0.1)
  const staggerItem = useStaggerItem()

  return (
    <section
      aria-labelledby="sector-solutions-title"
      className="relative px-4 sm:px-6 py-20 md:py-28 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,120,170,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          {...headerReveal}
          className="text-center mb-14 md:mb-16"
        >
          <h2
            id="sector-solutions-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance leading-tight tracking-tight"
          >
            {title}{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-brand-secondary bg-clip-text text-transparent">
              {sectorName.toLowerCase()}
            </span>
          </h2>
        </motion.div>

        <motion.div
          {...stagger}
          className="grid md:grid-cols-2 gap-5 sm:gap-6"
        >
          {solutions.map((solution, i) => {
            const Icon = iconMap[solution.icono] ?? Check
            return (
              <motion.article
                key={i}
                {...staggerItem}
                className="group relative h-full p-6 sm:p-8 rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div
                    className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.08)",
                      borderColor: "rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    <Icon size={24} className="text-emerald-500" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 leading-snug">
                      {solution.titulo}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-4">
                      {solution.descripcion}
                    </p>
                    {/* Metric pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <TrendingUp size={12} className="text-emerald-500" aria-hidden="true" />
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {solution.metrica}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
