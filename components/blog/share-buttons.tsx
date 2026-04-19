"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Linkedin, MessageCircle, Link2, Check, Twitter } from "lucide-react"

/**
 * Floating share strip. Left-fixed on desktop (lg+), bottom-centered
 * on mobile. Copy-link action opens a visual toast for ~2s confirming
 * the URL went to the clipboard.
 */
export function ShareButtons({ title }: { title: string }) {
  const t = useTranslations("blog_ui")
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href)
  }, [])

  const share = (href: string) => {
    if (typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer")
    }
  }

  const copyLink = async () => {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: prompt
      if (typeof window !== "undefined") window.prompt("", url)
    }
  }

  const enc = (s: string) => encodeURIComponent(s)
  const links = {
    twitter:  `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    whatsapp: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
  }

  const btnBase =
    "w-10 h-10 flex items-center justify-center rounded-full border border-default bg-bg-card dark:bg-bg-elevated text-fg-secondary hover:text-brand-primary hover:border-brand-primary/40 transition-colors"

  return (
    <div
      aria-label={t("share")}
      className="fixed lg:top-1/2 lg:-translate-y-1/2 lg:left-4 bottom-4 left-1/2 -translate-x-1/2 lg:translate-x-0 z-40 flex lg:flex-col flex-row items-center gap-2 p-2 rounded-full lg:rounded-2xl border border-default bg-bg-card/90 dark:bg-bg-elevated/90 backdrop-blur-md shadow-lg"
    >
      <button onClick={() => share(links.twitter)}  aria-label={t("share_on_twitter")}  className={btnBase}>
        <Twitter className="w-4 h-4" />
      </button>
      <button onClick={() => share(links.linkedin)} aria-label={t("share_on_linkedin")} className={btnBase}>
        <Linkedin className="w-4 h-4" />
      </button>
      <button onClick={() => share(links.whatsapp)} aria-label={t("share_on_whatsapp")} className={btnBase}>
        <MessageCircle className="w-4 h-4" />
      </button>
      <button onClick={copyLink} aria-label={t("copy_link")} className={btnBase}>
        {copied ? <Check className="w-4 h-4 text-brand-primary" /> : <Link2 className="w-4 h-4" />}
      </button>

      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="absolute lg:left-full lg:ml-3 lg:top-1/2 lg:-translate-y-1/2 top-full mt-2 lg:mt-0 whitespace-nowrap px-3 py-1.5 rounded-full bg-fg-primary text-bg-page text-xs font-semibold"
        >
          {t("copied")}
        </div>
      )}
    </div>
  )
}
