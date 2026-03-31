import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { locales, type Locale } from "@/i18n/config"

const BASE_URL = "https://www.staffdigital.ai"

const ogLocaleMap: Record<Locale, string> = {
  es: "es_ES",
  pt: "pt_PT",
  en: "en_US",
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = (await import(`@/messages/${locale}.json`)).default

  const prefix = locale === "es" ? "" : `/${locale}`

  return {
    title: {
      default: messages.meta.title,
      template: "%s | StaffDigital AI",
    },
    description: messages.meta.description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${prefix}/`,
      languages: {
        es: "/",
        pt: "/pt/",
        en: "/en/",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale as Locale] || "es_ES",
      url: `${BASE_URL}${prefix}/`,
      siteName: "StaffDigital AI",
      title: messages.meta.title,
      description: messages.meta.description,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "StaffDigital AI" }],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
