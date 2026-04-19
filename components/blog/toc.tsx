"use client"

import { useEffect, useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { ChevronDown } from "lucide-react"

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Auto-generated table of contents from the rendered article's H2/H3
 * headings. Scroll-spy via IntersectionObserver highlights the current
 * section. Respects `prefers-reduced-motion` by falling back to instant
 * scroll (no `scrollIntoView({behavior: 'smooth'})`) when reduced.
 *
 * Desktop: sticky column (parent provides position).
 * Mobile: collapsed pill at the top of the content column.
 */
export function Toc({ articleSelector = "article[data-blog-content]" }: { articleSelector?: string }) {
  const t = useTranslations("blog_ui")
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  // 1) Harvest headings and ensure they have ids.
  useEffect(() => {
    const article = document.querySelector(articleSelector)
    if (!article) return
    const nodes = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2, h3"))
    const collected: TocItem[] = []
    for (const el of nodes) {
      if (!el.id) {
        el.id = slugify(el.textContent ?? "")
      }
      if (!el.id) continue
      collected.push({
        id: el.id,
        text: (el.textContent ?? "").trim(),
        level: el.tagName === "H2" ? 2 : 3,
      })
    }
    setItems(collected)
  }, [articleSelector])

  // 2) Scroll-spy.
  useEffect(() => {
    if (items.length === 0) return
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el)
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the topmost intersecting heading.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  const jumpTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
    setMobileOpen(false)
  }

  const mobileLabel = useMemo(() => {
    const current = items.find((i) => i.id === activeId)
    return current ? current.text : t("toc_label")
  }, [items, activeId, t])

  if (items.length < 2) return null

  return (
    <>
      {/* Desktop (lg+): sticky rail */}
      <nav aria-label={t("toc_label")} className="hidden lg:block sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-fg-muted mb-3">
          {t("toc_label")}
        </p>
        <ul className="space-y-1.5 border-l border-default">
          {items.map((item) => {
            const active = item.id === activeId
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(item.id)}
                  className={`block w-full text-left text-sm leading-snug py-1.5 -ml-px pl-4 border-l-2 transition-colors ${
                    active
                      ? "border-brand-primary text-fg-primary font-medium"
                      : "border-transparent text-fg-secondary hover:text-fg-primary"
                  } ${item.level === 3 ? "pl-7 text-[13px]" : ""}`}
                >
                  {item.text}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile / tablet: collapsed pill at the top of the content. */}
      <div className="lg:hidden mb-8">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-default bg-bg-card dark:bg-bg-elevated text-sm font-medium text-fg-primary"
        >
          <span className="truncate text-left">{mobileLabel}</span>
          <ChevronDown className={`w-4 h-4 flex-shrink-0 ml-3 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
        </button>
        {mobileOpen && (
          <ul className="mt-2 p-2 rounded-xl border border-default bg-bg-card dark:bg-bg-elevated space-y-0.5 max-h-[60vh] overflow-y-auto">
            {items.map((item) => {
              const active = item.id === activeId
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(item.id)}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      active
                        ? "bg-brand-primary/10 text-brand-primary font-medium"
                        : "text-fg-secondary hover:bg-bg-subtle hover:text-fg-primary"
                    } ${item.level === 3 ? "pl-7 text-[13px]" : ""}`}
                  >
                    {item.text}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60)
}
