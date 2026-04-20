"use client"

import { TourProvider } from "./tour-provider"
import { TourOverlay } from "./tour-overlay"
import { useTranslations, useLocale} from "next-intl"
import Link from "next/link"
import { Monitor } from "lucide-react"

function MobileGate() {
  const t = useTranslations("tour")
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
        <Monitor size={28} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{t("mobile_title")}</h3>
      <p className="text-sm text-foreground/60 mb-6 max-w-sm">{t("mobile_description")}</p>
      <Link href={`${prefix}/demo`} className="px-6 py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-blue-500 to-purple-600">
        {t("cta_button")}
      </Link>
    </div>
  )
}

export function TourClient() {
  const locale = useLocale()
  const prefix = locale === "es" ? "" : `/${locale}`
  return (
    <TourProvider>
      <div className="hidden md:block py-8 px-4">
        <TourOverlay />
      </div>
      <div className="md:hidden">
        <MobileGate />
      </div>
    </TourProvider>
  )
}
