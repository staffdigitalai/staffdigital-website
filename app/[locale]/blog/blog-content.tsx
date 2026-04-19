"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import type { WPPost, WPCategory, WPContentType } from "@/lib/wordpress"
import { stripHtml } from "@/lib/wordpress"
import { SearchBar } from "@/components/blog/search-bar"
import { CategoryPills, type CategoryOption } from "@/components/blog/category-pills"
import { PostCard } from "@/components/blog/post-card"

interface BlogContentProps {
  locale: string
  initialCategories: WPCategory[]
  initialContentTypes?: WPContentType[]
  initialPosts?: WPPost[]
  initialTotalPages?: number
}

// Next.js locale → WPML language code (ES master, EN and PT-PT translations).
function toWpmlLang(locale: string): string {
  if (locale === "pt") return "pt-pt"
  if (locale === "en") return "en"
  return "es"
}

export function BlogContent({
  locale,
  initialCategories,
  initialContentTypes = [],
  initialPosts = [],
  initialTotalPages = 1,
}: BlogContentProps) {
  const t = useTranslations("blog_ui")
  const wpmlLang = toWpmlLang(locale)

  const hasInitialData = initialPosts.length > 0
  const [posts, setPosts] = useState<WPPost[]>(initialPosts)
  const [loading, setLoading] = useState(!hasInitialData)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const [userInteracted, setUserInteracted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Debounce search typing so we don't hit WP REST on every keystroke.
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(searchQuery), 400)
    return () => clearTimeout(id)
  }, [searchQuery])

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("lang", wpmlLang)
      params.append("page", String(currentPage))
      params.append("per_page", "9")
      params.append("_embed", "1")
      if (debouncedSearch) params.append("search", debouncedSearch)

      const apiUrl = "https://cms.staffdigital.ai/wp-json/wp/v2"
      const url = `${apiUrl}/posts?${params.toString()}`

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)
      const response = await fetch(url, { signal: controller.signal })
      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          setPosts(data)
          setTotalPages(parseInt(response.headers.get("X-WP-TotalPages") || "1", 10))
          return
        }
      }
      setError(t("no_results"))
      setPosts([])
    } catch {
      setError(t("no_results"))
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [wpmlLang, currentPage, debouncedSearch, t])

  useEffect(() => {
    if (hasInitialData && !userInteracted) return
    fetchPosts()
  }, [fetchPosts, hasInitialData, userInteracted])

  // Client-side category filter (matches against embedded category names).
  const filteredPosts = selectedCategory
    ? posts.filter((p) => {
        const slugs = p._embedded?.["wp:term"]?.[0]?.map((term) => term.slug.toLowerCase()) || []
        return slugs.includes(selectedCategory.toLowerCase())
      })
    : posts

  const categoryOptions: CategoryOption[] = initialCategories.map((c) => ({
    slug: c.slug,
    label: c.name,
    count: c.count,
  }))

  const onCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug)
    setCurrentPage(1)
    setUserInteracted(true)
  }
  const onSearch = (v: string) => {
    setSearchQuery(v)
    setCurrentPage(1)
    setUserInteracted(true)
  }

  return (
    <div className="space-y-10">
      {/* Search + category pills row */}
      <div className="flex flex-col gap-5">
        <SearchBar value={searchQuery} onChange={onSearch} />
        {categoryOptions.length > 0 && (
          <CategoryPills
            categories={categoryOptions}
            activeSlug={selectedCategory}
            onSelect={onCategorySelect}
          />
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <AlertCircle className="h-7 w-7 text-brand-primary" />
          </div>
          <p className="text-fg-muted">{error}</p>
          <Button variant="outline" onClick={fetchPosts} className="rounded-full">
            {t("no_results")}
          </Button>
        </div>
      )}

      {/* Posts grid */}
      {!error && loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-default bg-bg-card animate-pulse h-[420px]" />
          ))}
        </div>
      ) : !error && filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-fg-muted text-lg">{t("no_results")}</p>
        </div>
      ) : !error ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      ) : null}

      {/* Pagination */}
      {totalPages > 1 && !error && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum: number
              if (totalPages <= 5) pageNum = i + 1
              else if (currentPage <= 3) pageNum = i + 1
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i
              else pageNum = currentPage - 2 + i
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  onClick={() => { setCurrentPage(pageNum); setUserInteracted(true) }}
                  className="rounded-full w-10 h-10"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Intentionally keeping initialContentTypes + stripHtml imports compatible
          with previous wiring; content-type filtering is not rendered in the
          new UI but the prop is still accepted so layout-level usage stays
          backward-compatible. */}
      {initialContentTypes && null}
      {typeof stripHtml === "function" && null}
    </div>
  )
}
