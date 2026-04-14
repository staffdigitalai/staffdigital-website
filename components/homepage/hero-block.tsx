"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function HeroBlock() {
  const t = useTranslations("hero")

  return (
    <section className="min-h-[85vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* ─── Animated Aurora Background ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Blob 1 — Cyan/Teal, drifts left-right */}
        <div
          className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-30 animate-aurora-drift-x aurora-blob"
          style={{
            background: "radial-gradient(circle, rgba(0,120,170,0.6) 0%, rgba(0,120,170,0.2) 40%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        {/* Blob 2 — Purple, circular motion */}
        <div
          className="absolute top-[30%] right-[10%] w-[550px] h-[550px] rounded-full opacity-15 dark:opacity-25 animate-aurora-orbit aurora-blob"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(124,58,237,0.15) 40%, transparent 70%)",
            filter: "blur(110px)",
          }}
        />

        {/* Blob 3 — Bright cyan, pulses + drifts vertically */}
        <div
          className="absolute bottom-[5%] left-[40%] w-[450px] h-[450px] rounded-full opacity-10 dark:opacity-20 animate-aurora-pulse-drift aurora-blob"
          style={{
            background: "radial-gradient(circle, rgba(0,180,240,0.5) 0%, rgba(0,180,240,0.15) 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* ─── Light mode radial overlay ─── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] dark:hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(0,120,170,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ─── Hero Content ─── */}
      <div className="w-full max-w-5xl mx-auto text-center relative z-10">
        {/* Badge pill */}
        <div className="animate-fade-in-badge mb-8 flex justify-center">
          <span
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-md
              bg-white/80 dark:bg-white/[0.06]
              text-foreground/80 dark:text-white/70
              border border-[#0062CC]/20 dark:border-[#00B4F0]/20
              shadow-sm dark:shadow-[0_0_20px_rgba(0,180,240,0.08)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#0078AA] dark:bg-[#00B4F0] animate-pulse" />
            {t("badge")}
          </span>
        </div>

        {/* H1 */}
        <h1 className="animate-fade-in-hero mb-6">
          <span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight
              text-[#0F172A] dark:text-[#F1F5F9]"
            style={{
              textShadow: "var(--hero-h1-shadow)",
            }}
          >
            {t("h1_plain")}
          </span>
          <span
            className="block mt-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--hero-gradient)",
            }}
          >
            {t("h1_gradient")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-heading text-balance
            text-[#475569] dark:text-[#94A3B8]"
        >
          {t("subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-in-buttons">
          {/* Primary CTA */}
          <Link
            href="/demo"
            className="group relative inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-105 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0078AA 0%, #7C3AED 100%)",
              boxShadow: "0 4px 20px rgba(0,120,170,0.3), 0 8px 30px rgba(124,58,237,0.2)",
            }}
          >
            <span className="relative z-10 flex items-center">
              {t("cta_primary")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{
                background: "linear-gradient(135deg, #0090CC 0%, #A855F7 100%)",
              }}
            />
          </Link>

          {/* Secondary CTA */}
          <a
            href="#how-it-works"
            className="group inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-medium transition-all duration-300
              text-foreground dark:text-white/80
              bg-transparent
              border border-[rgba(0,98,204,0.25)] dark:border-[rgba(0,180,240,0.3)]
              hover:border-[rgba(124,58,237,0.4)] dark:hover:border-[rgba(168,85,247,0.5)]
              hover:bg-white/60 dark:hover:bg-white/[0.05]
              backdrop-blur-sm"
          >
            {t("cta_secondary")}
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </a>
        </div>

        {/* Bottom note */}
        <p
          className="text-sm animate-fade-in-buttons text-[#94A3B8] dark:text-[#64748B]"
          style={{ animationDelay: "1.2s" }}
        >
          {t("microcopy")}
        </p>
      </div>
    </section>
  )
}
