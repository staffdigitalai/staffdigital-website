"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Check, Headphones } from "lucide-react"
import { useFormModals } from "@/components/contact-form-modals"
import RotatingText from "@/components/RotatingText"
import { useTranslations } from "next-intl"

export function HeroBlock() {
  const { openContactForm } = useFormModals()
  const t = useTranslations("hero")

  const microproofs = t.raw("microproofs") as string[]
  const rotateWords = t.raw("rotate_words") as string[]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
        {/* Voice quality badge with animated border glow */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 dark:bg-white/15 backdrop-blur-md border border-foreground/25 dark:border-[var(--neon-blue)]/30 text-foreground text-sm font-medium mb-8 mt-12 animate-fade-in-badge gap-2 shadow-sm">
          <Headphones className="w-4 h-4 text-[#0078AA] dark:text-[var(--neon-blue)]" />
          <span className="text-[#0078AA] dark:text-[var(--neon-blue)] font-semibold">{t("badge_voice")}</span>
          <span className="text-foreground/60">·</span>
          <span className="text-foreground">{t("badge_platform")}</span>
        </div>

        {/* H1 with animated gradient text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-4 animate-fade-in-heading leading-tight">
          <span className="text-foreground">{t("h1_line1")}</span>
          <br />
          <span 
            className="bg-gradient-to-r from-[var(--neon-blue)] via-[var(--purple-dark)] to-[var(--neon-blue)] bg-clip-text text-transparent inline-block animate-gradient-shift"
            style={{ backgroundSize: "200% auto" }}
          >
            {t("h1_line2")}
          </span>
        </h1>

        {/* Reinforcement — managed solution */}
        <p className="text-base sm:text-lg md:text-xl text-foreground/60 mb-4 animate-fade-in-heading font-light">
          {t("reinforcement")}
        </p>

        {/* Rotating — real search terms the buyer uses */}
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-subheading">
          <span className="text-lg sm:text-xl text-foreground/50 font-light">{t("rotate_prefix")}</span>
          <RotatingText
            texts={rotateWords}
            mainClassName="px-2 sm:px-3 bg-white text-black overflow-hidden py-1 sm:py-2 justify-center rounded-lg shadow-lg text-lg sm:text-xl font-semibold"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </div>

        {/* CTA Buttons with premium neon glow and gradient effects */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-in-buttons">
          <Button
            size="lg"
            onClick={openContactForm}
            className="relative bg-gradient-to-r from-[var(--neon-blue)] via-[var(--purple-dark)] to-[var(--neon-blue)] text-white rounded-full px-10 py-5 text-lg font-semibold transition-all duration-300 hover:scale-105 group cursor-pointer shadow-[0_0_20px_rgba(var(--neon-blue-rgb),0.4),0_0_40px_rgba(var(--purple-dark-rgb),0.2)] hover:shadow-[0_0_30px_rgba(var(--neon-blue-rgb),0.6),0_0_60px_rgba(var(--purple-dark-rgb),0.4)] animate-gradient-shift"
            style={{ backgroundSize: "200% auto" }}
          >
            {t("cta_primary")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-5 text-lg font-medium border-[var(--purple-dark)]/50 text-foreground hover:bg-[var(--purple-dark)]/10 hover:border-[var(--purple-dark)]/70 transition-all duration-300 hover:scale-105 group bg-transparent cursor-pointer hover:shadow-[0_0_25px_rgba(var(--purple-dark-rgb),0.4)]"
          >
            <a href="tel:+34931229129">
              <Phone className="mr-2 h-5 w-5" />
              {t("cta_secondary")}
            </a>
          </Button>
        </div>

        {/* Micro-proofs - larger text with lime green accents */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 animate-fade-in-buttons">
          {microproofs.map((proof) => (
            <span key={proof} className="flex items-center gap-2 text-sm sm:text-base text-foreground/60 font-medium">
              <Check className="w-4 h-4 text-[var(--lime-green)] shrink-0" />
              {proof}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
