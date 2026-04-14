"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function HeroBlock() {
  const t = useTranslations("hero")

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-32 bg-[#F8FAFC] dark:bg-[#050A14]">
      {/* ─── Animated Aurora Background ─── */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Blob 1 — Top-left, cyan, horizontal drift */}
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#0078AA]/[0.07] dark:bg-[#0078AA]/25 blur-[120px] animate-aurora-blob-1 aurora-blob" />

        {/* Blob 2 — Top-right, purple, vertical drift */}
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#7C3AED]/[0.06] dark:bg-[#7C3AED]/20 blur-[100px] animate-aurora-blob-2 aurora-blob" />

        {/* Blob 3 — Center, sky-blue, scale + rotate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#38BDF8]/[0.04] dark:bg-[#38BDF8]/10 blur-[140px] animate-aurora-blob-3 aurora-blob" />

        {/* Blob 4 — Bottom center-right, purple, diagonal drift */}
        <div className="absolute bottom-[10%] right-[25%] w-[400px] h-[400px] rounded-full bg-[#A855F7]/[0.05] dark:bg-[#A855F7]/15 blur-[100px] animate-aurora-blob-4 aurora-blob" />
      </div>

      {/* ─── Hero Content ─── */}
      <div className="w-full max-w-6xl mx-auto text-center relative z-10">
        {/* Badge pill */}
        <div className="animate-hero-badge mb-8 flex justify-center">
          <span className="hero-badge-shimmer inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium bg-[#0062CC]/5 border border-[#0062CC]/15 text-[#0062CC] dark:bg-white/5 dark:border-white/10 dark:text-[#94A3B8]">
            <span className="inline-block">&#10022;</span>
            {t("badge")}
          </span>
        </div>

        {/* H1 */}
        <h1 className="animate-hero-h1 mb-8 leading-[1.1]">
          <span className="block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
            {t("h1_plain")}
          </span>
          <span className="block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0062CC] via-[#4F46E5] to-[#7C3AED] dark:from-[#38BDF8] dark:via-[#818CF8] dark:to-[#A855F7]">
            {t("h1_gradient")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-hero-subtitle text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12 text-[#475569] dark:text-[#CBD5E1] text-balance">
          {t("subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-hero-ctas">
          {/* Primary CTA */}
          <Link
            href="/demo"
            className="group relative inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#0078AA] to-[#7C3AED] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,120,170,0.4),0_0_60px_rgba(124,58,237,0.25)]"
          >
            {t("cta_primary")}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA */}
          <a
            href="#how-it-works"
            className="group inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-medium transition-all duration-300 bg-[#0F172A]/[0.04] border border-[#0F172A]/[0.12] text-[#0F172A] hover:border-[#7C3AED]/40 hover:bg-[#0F172A]/[0.07] dark:bg-white/[0.06] dark:backdrop-blur-sm dark:border-white/[0.15] dark:text-white dark:hover:border-[#7C3AED]/40 dark:hover:bg-white/[0.1]"
          >
            {t("cta_secondary")}
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-sm font-medium text-[#64748B] animate-hero-trust">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#0062CC] dark:text-[#38BDF8]">&#10003;</span>
            {"Sin plantillas"}
          </span>
          <span className="text-[#64748B]/40">&middot;</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#0062CC] dark:text-[#38BDF8]">&#10003;</span>
            {"Totalmente personalizado"}
          </span>
          <span className="text-[#64748B]/40">&middot;</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#0062CC] dark:text-[#38BDF8]">&#10003;</span>
            {"Diseñado para tu negocio"}
          </span>
        </div>
      </div>
    </section>
  )
}
