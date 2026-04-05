"use client"

import Image from "next/image"
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
        {/* Voice quality badge — luxury proof, not protagonist */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-12 animate-fade-in-badge gap-2">
          <Headphones className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 font-semibold">{t("badge_voice")}</span>
          <span className="text-white/40">·</span>
          <span className="text-white/60">{t("badge_platform")}</span>
        </div>

        {/* H1 — platform + business problem, not technology */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-4 animate-fade-in-heading leading-tight">
          <span className="text-foreground">{t("h1_line1")}</span>
          <br />
          <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent inline-block">
            {t("h1_line2")}
          </span>
        </h1>

        {/* Reinforcement — managed solution */}
        <p className="text-base sm:text-lg md:text-xl text-white/60 mb-4 animate-fade-in-heading font-light">
          {t("reinforcement")}
        </p>

        {/* Rotating — real search terms the buyer uses */}
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-subheading">
          <span className="text-lg sm:text-xl text-white/50 font-light">{t("rotate_prefix")}</span>
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

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5 animate-fade-in-buttons">
          <Button
            size="lg"
            onClick={openContactForm}
            className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer"
          >
            {t("cta_primary")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-4 text-lg font-medium border-white/20 hover:bg-white/10 transition-all duration-200 hover:scale-105 group bg-transparent cursor-pointer"
          >
            <a href="tel:+34931229129">
              <Phone className="mr-2 h-5 w-5" />
              {t("cta_secondary")}
            </a>
          </Button>
        </div>

        {/* Micro-proofs — stack capabilities */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-10 animate-fade-in-buttons">
          {microproofs.map((proof) => (
            <span key={proof} className="flex items-center gap-1.5 text-xs sm:text-sm text-white/40">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {proof}
            </span>
          ))}
        </div>

        {/* Hero visual */}
        <div className="max-w-3xl mx-auto animate-fade-in-buttons">
          <Image
            src="/images/homepage/hero-dashboard.jpg"
            alt="Plataforma omnicanal StaffDigital AI: bandeja unificada con WhatsApp, llamadas, chat web y CRM integrado"
            width={1200}
            height={686}
            priority
            className="rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
