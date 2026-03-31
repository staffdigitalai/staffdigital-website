"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { locales, type Locale } from "@/i18n/config"

const labels: Record<Locale, string> = {
  es: "ES",
  pt: "PT",
  en: "EN",
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => handleChange(l)}
          className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
            l === locale
              ? "bg-white/20 text-white font-medium"
              : "text-white/50 hover:text-white/80 hover:bg-white/10"
          }`}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  )
}
