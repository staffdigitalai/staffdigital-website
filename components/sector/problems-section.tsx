"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Clock, Users, TrendingDown, PhoneOff, CalendarX, HelpCircle, type LucideIcon } from "lucide-react"
import type { SectorProblem } from "@/lib/sector-fallback-content"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle, Clock, Users, TrendingDown, PhoneOff, CalendarX, HelpCircle,
}

interface ProblemsSectionProps {
  problems: SectorProblem[]
  title: string
  subtitle?: string
  sectorName: string
}

export function SectorProblemsSection({
  problems,
  title,
  subtitle,
  sectorName,
}: ProblemsSectionProps) {
  const headerReveal = useMotionReveal()
  const stagger = useStaggerContainer(0.08)
  const staggerItem = useStaggerItem()

  return (
    <section
      aria-labelledby="sector-problems-title"
      className="px-4 sm:px-6 py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div {...headerReveal} className="text-center mb-14 md:mb-16">
          <h2
            id="sector-problems-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance leading-tight tracking-tight"
          >
            {title}{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {sectorName}
            </span>
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
          {problems.map((problem, i) => {
            const Icon = iconMap[problem.icono] ?? AlertTriangle
            return (
              <motion.article
                key={i}
                {...staggerItem}
                className="group h-full p-6 sm:p-7 rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/15 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-colors"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.08)",
                    borderColor: "rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <Icon size={22} className="text-red-500" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
                  {problem.titulo}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {problem.descripcion}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
