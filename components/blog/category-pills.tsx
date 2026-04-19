"use client"

import { useTranslations } from "next-intl"

export interface CategoryOption {
  slug: string | null // null = "all"
  label: string
  count?: number
}

/**
 * Horizontal scrollable pills replacing the old category dropdown.
 * Scrolls horizontally with touch/swipe on mobile (overflow-x-auto).
 */
export function CategoryPills({
  categories,
  activeSlug,
  onSelect,
}: {
  categories: CategoryOption[]
  activeSlug: string | null
  onSelect: (slug: string | null) => void
}) {
  const t = useTranslations("blog_ui")
  const all: CategoryOption = { slug: null, label: t("all_categories") }
  const items = [all, ...categories]

  return (
    <div
      role="tablist"
      aria-label={t("categories_label")}
      className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none" }}
    >
      {items.map((c) => {
        const isActive = c.slug === activeSlug
        return (
          <button
            key={c.slug ?? "__all__"}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(c.slug)}
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-brand-primary text-white border border-brand-primary"
                : "bg-bg-card dark:bg-bg-elevated text-fg-secondary hover:text-fg-primary border border-default hover:border-brand-primary/40"
            }`}
          >
            {c.label}
            {typeof c.count === "number" && c.count > 0 && (
              <span className={`text-[10px] font-semibold ${isActive ? "opacity-80" : "text-fg-muted"}`}>
                {c.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
