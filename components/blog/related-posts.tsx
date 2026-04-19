"use client"

import { useTranslations } from "next-intl"
import type { WPPost } from "@/lib/wordpress"
import { PostCard } from "./post-card"

/**
 * Bottom-of-article related list. Receives up to 3 posts (fetched
 * server-side from the same category, excluding the current post).
 */
export function RelatedPosts({ posts, locale }: { posts: WPPost[]; locale: string }) {
  const t = useTranslations("blog_ui")
  if (!posts || posts.length === 0) return null
  return (
    <section
      aria-labelledby="related-articles-title"
      className="mt-20 pt-12 border-t border-default"
    >
      <h2
        id="related-articles-title"
        className="text-2xl sm:text-3xl font-bold text-fg-primary mb-8 tracking-tight"
      >
        {t("related_articles")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} locale={locale} />
        ))}
      </div>
    </section>
  )
}
