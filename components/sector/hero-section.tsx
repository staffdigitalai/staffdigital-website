"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Phone } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMotionReveal } from "@/hooks/use-motion-reveal"

interface HeroSectionProps {
  title: string
  subtitle?: string
  excerpt: string
  heroImage: string
  heroIcon: LucideIcon
  onContactClick: () => void
  ctaPrimary: string
  ctaSecondary: string
}

export function SectorHeroSection({
  title,
  subtitle,
  excerpt,
  heroImage,
  heroIcon: HeroIcon,
  onContactClick,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  const textReveal = useMotionReveal()
  const imageReveal = useMotionReveal({ delay: 0.1 })

  return (
    <section
      aria-labelledby="sector-hero-title"
      className="relative px-4 sm:px-6 pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 30% 40%, rgba(0,120,170,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 70% 60%, rgba(124,58,237,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column — text + CTAs */}
          <motion.div
            {...textReveal}
            className="text-center lg:text-left"
          >
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-sm mb-6">
              <HeroIcon size={14} className="text-brand-secondary" aria-hidden="true" />
              <span className="text-xs font-medium text-foreground/70 tracking-wide">
                StaffDigital AI · Sector
              </span>
            </div>

            {/* H1 */}
            <h1
              id="sector-hero-title"
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1] tracking-tight text-balance mb-5"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            {/* Subtitle (from ACF) */}
            {subtitle && (
              <p className="text-lg md:text-xl font-medium mb-4 bg-gradient-to-r from-brand-secondary to-brand-primary bg-clip-text text-transparent">
                {subtitle}
              </p>
            )}

            {/* Excerpt */}
            <p className="text-base sm:text-lg text-foreground/60 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {excerpt}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={onContactClick}
                className="group w-full sm:w-auto rounded-full px-7 py-5 text-base font-semibold text-white transition-all hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #0078AA 0%, #7C3AED 100%)",
                  boxShadow: "0 4px 25px rgba(0,120,170,0.25), 0 8px 40px rgba(124,58,237,0.15)",
                }}
                aria-label={`${ctaPrimary} - ${title}`}
              >
                {ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto rounded-full px-7 py-5 text-base font-medium border border-foreground/15 hover:border-foreground/30 hover:bg-foreground/5 transition-all"
              >
                <a href="tel:+34931229129" aria-label="Llamar a ventas">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  {ctaSecondary}
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right column — illustration */}
          <motion.div
            {...imageReveal}
            className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl shadow-foreground/5"
          >
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Gradient overlay for aesthetics */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,120,170,0.15) 0%, transparent 40%, rgba(124,58,237,0.15) 100%)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
