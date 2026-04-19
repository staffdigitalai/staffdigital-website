"use client"

import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { FeaturedImage } from "./featured-image"
import { estimateReadingTime } from "./reading-time"
import type { WPPost } from "@/lib/wordpress"
import { getFeaturedImageUrl, stripHtml, formatDate } from "@/lib/wordpress"

/**
 * Listing card. Uses the post's featured image when available, a
 * semantic-token gradient fallback otherwise.
 */
export function PostCard({ post, locale }: { post: WPPost; locale: string }) {
  const t = useTranslations("blog_ui")

  const title = stripHtml(post.title.rendered)
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 180)
  const imageUrl = getFeaturedImageUrl(post, "medium") ?? getFeaturedImageUrl(post, "large")
  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name
  const readingMin = estimateReadingTime(post.content?.rendered ?? post.excerpt.rendered ?? "")
  const dateLocale = locale === "es" ? "es-ES" : locale === "pt" ? "pt-PT" : "en-US"
  const href = locale === "es" ? `/blog/${post.slug}` : `/${locale}/blog/${post.slug}`

  const avatarInitials = "SD"

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-default bg-bg-card dark:bg-bg-elevated hover:shadow-[0_12px_36px_rgba(0,120,170,0.12)] transition-all duration-300"
    >
      <FeaturedImage src={imageUrl} alt={title} title={title} aspect="aspect-[16/9]" />

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {categoryName && (
          <span className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[11px] font-semibold uppercase tracking-wider mb-4">
            {categoryName}
          </span>
        )}

        <h3 className="text-lg sm:text-xl font-bold text-fg-primary leading-snug tracking-tight mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors">
          {title}
        </h3>

        {excerpt && (
          <p className="text-sm text-fg-muted leading-relaxed line-clamp-3 mb-5">
            {excerpt}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-default flex items-center gap-3 text-xs text-fg-muted">
          <div
            aria-hidden="true"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-gradient-from to-brand-primary flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0"
          >
            {avatarInitials}
          </div>
          <div className="min-w-0 flex-1 flex flex-col">
            <span className="truncate font-medium text-fg-secondary">{t("author_fallback_name")}</span>
            <span className="flex items-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date, dateLocale)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {t("reading_time_min", { minutes: readingMin })}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
