"use client"

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

        {/* A) Badge pill */}
        <div className="animate-hero-badge mt-0 mb-10 flex justify-center">
          <span className="hero-badge-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide bg-gradient-to-r from-[#0078AA]/10 to-[#7C3AED]/10 border border-[#0062CC]/20 text-[#0062CC] dark:from-[#0078AA]/20 dark:to-[#7C3AED]/20 dark:border-[#38BDF8]/25 dark:text-[#7DD3FC]">
            <span className="text-[#38BDF8] dark:text-[#7DD3FC]">&#10022;</span>
            {t("badge")}
          </span>
        </div>

        {/* B) H1 — Main headline */}
        <h1 className="animate-hero-h1 mb-6 leading-[1.15] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
          <span className="block text-[#0F172A] dark:text-[#F8FAFC]">
            {t("h1_plain")}
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#0062CC] via-[#4F46E5] to-[#7C3AED] dark:from-[#38BDF8] dark:via-[#818CF8] dark:to-[#C084FC]">
            {t("h1_gradient")}
          </span>
        </h1>

        {/* C) H2 — Supporting headline */}
        <h2 className="animate-hero-h2 text-xl md:text-2xl font-normal max-w-3xl mx-auto mb-8 text-[#1E293B] dark:text-[#E2E8F0]">
          {t("h2")}
        </h2>

        {/* D) Subtitle / Description */}
        <p className="animate-hero-subtitle text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-12 text-[#64748B] dark:text-[#94A3B8]">
          {t("subtitle")}
        </p>

        {/* E) CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10 animate-hero-ctas">
          {/* Primary CTA */}
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-full px-8 md:px-10 py-3.5 md:py-4 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-[#0078AA] to-[#7C3AED] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(0,120,170,0.35),0_0_50px_rgba(124,58,237,0.2)]"
          >
            {t("cta_primary")} &rarr;
          </Link>

          {/* Secondary CTA — Solid button */}
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full px-8 md:px-10 py-3.5 md:py-4 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-[1.03] hover:opacity-90 bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A]"
          >
            {t("cta_secondary")}
          </a>
        </div>

        {/* F) Trust indicators */}
        <div className="flex items-center justify-center gap-x-2 gap-y-1 flex-wrap text-sm font-medium animate-hero-trust">
          <span className="inline-flex items-center gap-1.5 text-[#64748B]">
            <span className="text-[#0062CC] dark:text-[#38BDF8]">&#10003;</span>
            {t("trust_1")}
          </span>
          <span className="text-[#CBD5E1] dark:text-[#334155]">&middot;</span>
          <span className="inline-flex items-center gap-1.5 text-[#64748B]">
            <span className="text-[#0062CC] dark:text-[#38BDF8]">&#10003;</span>
            {t("trust_2")}
          </span>
          <span className="text-[#CBD5E1] dark:text-[#334155]">&middot;</span>
          <span className="inline-flex items-center gap-1.5 text-[#64748B]">
            <span className="text-[#0062CC] dark:text-[#38BDF8]">&#10003;</span>
            {t("trust_3")}
          </span>
        </div>
      </div>
    </section>
  )
}
