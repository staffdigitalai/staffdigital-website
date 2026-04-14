import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    // Prevent missing keys from crashing the app — log warning instead
    onError(error) {
      if (error.code === "MISSING_MESSAGE") {
        console.warn(`[i18n] ${error.message}`)
      } else {
        console.error(`[i18n]`, error)
      }
    },
    getMessageFallback({ namespace, key }) {
      return `${namespace}.${key}`
    },
  }
})
