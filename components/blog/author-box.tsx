"use client"

import { useTranslations } from "next-intl"

/**
 * End-of-article author card. WP posts in this repo don't ship per-
 * author bios reliably, so we use a generic "StaffDigital AI Team"
 * fallback. Initials avatar is rendered with a brand gradient.
 */
export function AuthorBox({
  name,
  bio,
  initials,
}: {
  name?: string
  bio?: string
  initials?: string
}) {
  const t = useTranslations("blog_ui")
  const resolvedName = name ?? t("author_fallback_name")
  const resolvedBio = bio ?? t("author_fallback_bio")
  const resolvedInitials = (initials ?? resolvedName.split(" ").map((p) => p[0]).slice(0, 2).join("")).toUpperCase()

  return (
    <aside className="mt-16 p-6 sm:p-7 rounded-2xl border border-default bg-bg-card dark:bg-bg-elevated flex items-start gap-5">
      <div
        aria-hidden="true"
        className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-gradient-from to-brand-primary flex items-center justify-center text-white font-bold text-lg"
      >
        {resolvedInitials}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-fg-primary">{resolvedName}</p>
        <p className="text-sm text-fg-muted mt-1 leading-relaxed">{resolvedBio}</p>
      </div>
    </aside>
  )
}
