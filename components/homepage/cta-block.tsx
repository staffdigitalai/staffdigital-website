"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { useMotionReveal } from "@/hooks/use-motion-reveal"

export function CTABlock() {
  const t = useTranslations("cta")
  const locale = useLocale()
  const prefix = locale === "es" ? "" : `/${locale}`
  const reveal = useMotionReveal()

  return (
    <section
      aria-labelledby="home-cta-title"
      className="py-32 sm:py-40 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden"
    >
      <motion.div {...reveal} className="max-w-3xl mx-auto text-center relative">
        <h2
          id="home-cta-title"
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-8"
        >
          <span className="text-foreground">{t("title_plain")} </span>
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
            {t("title_gradient")}
          </span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-foreground/55 dark:text-foreground/50 max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12">
          {t("subtitle")}
        </p>

        {/* Single primary CTA. Per brief: only "Solicitar Demo" on the
            home (hero + footer already carry the secondary "Ver
            Soluciones"). No competing CTAs here. */}
        <div>
          <Link
            href={`${prefix}/demo`}
            className="group inline-flex items-center justify-center rounded-full px-10 sm:px-14 py-5 text-base sm:text-lg font-bold text-white bg-gradient-to-br from-gradient-from to-brand-primary-hover transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(0,120,170,0.3),0_12px_40px_rgba(91,33,182,0.2)]"
          >
            <span>{t("button")}</span>
            <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
