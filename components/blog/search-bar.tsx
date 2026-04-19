"use client"

import { Search, X } from "lucide-react"
import { useTranslations } from "next-intl"

export function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const t = useTranslations("blog_ui")
  return (
    <div className="relative w-full max-w-xl">
      <Search
        aria-hidden="true"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("search_placeholder")}
        className="w-full rounded-full border border-default bg-bg-card dark:bg-bg-elevated pl-11 pr-10 py-3 text-sm text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary/60 transition-colors"
        aria-label={t("search_placeholder")}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-fg-muted hover:text-fg-primary"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
