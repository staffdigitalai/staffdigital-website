"use client"

import { useRef } from "react"
import { TourProvider, useTour } from "./tour-provider"
import { TourOverlay } from "./tour-overlay"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Monitor } from "lucide-react"

function TourContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isActive } = useTour()

  return (
    <div ref={containerRef} className="relative max-w-6xl mx-auto">
      {/* Real Chatwoot demo instance */}
      <div
        data-tour-target="full-mockup"
        className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-300/50"
        style={{ height: "600px" }}
      >
        <iframe
          src="https://demo.staffdigital.ai/app/accounts/1/dashboard"
          title="StaffDigital AI — Plataforma Omnicanal"
          className="w-full h-full border-0"
          allow="clipboard-read; clipboard-write"
          loading="eager"
        />
      </div>

      {/* Tour overlay positioned on top of iframe */}
      <TourOverlay containerRef={containerRef} />
    </div>
  )
}

function MobileGate() {
  const t = useTranslations("tour")
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
        <Monitor size={28} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{t("mobile_title")}</h3>
      <p className="text-sm text-foreground/60 mb-6 max-w-sm">{t("mobile_description")}</p>
      <Link
        href="/demo"
        className="px-6 py-3 rounded-xl text-white font-semibold text-sm"
        style={{ background: "linear-gradient(135deg, var(--neon-blue), var(--purple-dark))" }}
      >
        {t("cta_button")}
      </Link>
    </div>
  )
}

export function TourClient() {
  return (
    <TourProvider>
      {/* Desktop */}
      <div className="hidden md:block py-8 px-4">
        <TourContent />
      </div>
      {/* Mobile */}
      <div className="md:hidden">
        <MobileGate />
      </div>
    </TourProvider>
  )
}
