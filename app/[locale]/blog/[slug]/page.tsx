import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { LocalizedSlugs } from "@/components/localized-slugs-provider"
import {
  getPost,
  getPosts,
  getRelatedPosts,
  getFeaturedImageUrl,
  stripHtml,
  formatDate,
  buildLocalizedAlternates,
} from "@/lib/wordpress"
import type { WPPost, SupportedLang } from "@/lib/wordpress"

import { FeaturedImage } from "@/components/blog/featured-image"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { Toc } from "@/components/blog/toc"
import { ShareButtons } from "@/components/blog/share-buttons"
import { AuthorBox } from "@/components/blog/author-box"
import { RelatedPosts } from "@/components/blog/related-posts"
import { estimateReadingTime } from "@/components/blog/reading-time"

// ISR: revalidate every 5 minutes so new posts appear without redeploy
export const revalidate = 300

// Next.js locale → WPML language code (ES master, EN and PT-PT translations).
function toWpmlLang(locale: string): SupportedLang {
  if (locale === "pt") return "pt-pt"
  if (locale === "en") return "en"
  return "es"
}

// Pre-generate known post slugs at build time — one entry per (locale, slug)
// pair across all 3 locales, so /pt/blog/{pt-slug} and /en/blog/{en-slug}
// prerender correctly instead of falling back to the ES default.
export async function generateStaticParams() {
  const locales: Array<"es" | "en" | "pt"> = ["es", "en", "pt"]
  const all: Array<{ locale: string; slug: string }> = []
  for (const locale of locales) {
    try {
      const { posts } = await getPosts({ lang: toWpmlLang(locale), perPage: 100 })
      for (const post of posts) all.push({ locale, slug: post.slug })
    } catch {
      // Non-fatal: ISR fills the gap on first request.
    }
  }
  return all
}

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

async function getPostData(slug: string, locale: string): Promise<WPPost | null> {
  try {
    return await getPost(slug, toWpmlLang(locale))
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getPostData(slug, locale)

  if (!post) return { title: "Post no encontrado - StaffDigital AI" }

  const yoast = (post as Record<string, unknown>).yoast_head_json as Record<string, unknown> | undefined
  const fallbackTitle = stripHtml(post.title.rendered)
  const fallbackDesc = post.acf?.meta_description || stripHtml(post.excerpt.rendered).slice(0, 160)
  const imageUrl = getFeaturedImageUrl(post, "full")

  const title = (yoast?.title as string)?.replace(/ \| StaffDigital AI$/i, "") || post.acf?.meta_title || fallbackTitle
  const description = (yoast?.description as string) || fallbackDesc

  const alternates = buildLocalizedAlternates(locale, post.slug, "/blog", post.wpml_translations)

  return {
    title,
    description,
    alternates,
    openGraph: {
      title: (yoast?.og_title as string) || fallbackTitle,
      description: (yoast?.og_description as string) || description,
      images: (yoast?.og_image as Array<{ url: string }>)?.map((i) => i.url) || (imageUrl ? [imageUrl] : undefined),
      type: "article",
      publishedTime: post.date,
      siteName: "StaffDigital AI",
    },
    twitter: {
      card: "summary_large_image",
      title: (yoast?.og_title as string) || fallbackTitle,
      description: (yoast?.og_description as string) || description,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params
  const post = await getPostData(slug, locale)
  const t = await getTranslations({ locale, namespace: "blog_ui" })

  const blogHref = locale === "es" ? "/blog" : `/${locale}/blog`

  if (!post) {
    return (
      <main className="min-h-screen bg-bg-page text-fg-primary overflow-x-hidden">
        <GlassmorphismNav />
        <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-fg-primary mb-4">Post no encontrado</h1>
            <Button asChild><Link href={blogHref}>{t("back_to_blog")}</Link></Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const imageUrl = getFeaturedImageUrl(post, "full")
  const terms = post._embedded?.["wp:term"]?.[0] || []
  const categoryNames = terms.map((tt) => tt.name)
  const primaryCategoryId = terms[0]?.id
  const readingMin = estimateReadingTime(post.content?.rendered ?? "")
  const dateLocale = locale === "es" ? "es-ES" : locale === "pt" ? "pt-PT" : "en-US"
  const plainTitle = stripHtml(post.title.rendered)

  // Related posts (up to 3, same primary category, excluding this one).
  const related = primaryCategoryId
    ? await getRelatedPosts({
        categoryId: primaryCategoryId,
        excludeId: post.id,
        lang: toWpmlLang(locale),
        perPage: 3,
      })
    : []

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: plainTitle,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: { "@type": "Organization", name: "StaffDigital AI" },
    publisher: {
      "@type": "Organization",
      name: "StaffDigital AI",
      logo: { "@type": "ImageObject", url: "https://www.staffdigital.ai/logo.png" },
    },
    ...(imageUrl ? { image: imageUrl } : {}),
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
  }

  const localizedSlugMap = {
    es: post.wpml_translations?.es?.slug ?? (locale === "es" ? post.slug : undefined),
    en: post.wpml_translations?.en?.slug ?? (locale === "en" ? post.slug : undefined),
    pt: post.wpml_translations?.["pt-pt"]?.slug ?? (locale === "pt" ? post.slug : undefined),
  }

  return (
    <main className="min-h-screen bg-bg-page text-fg-primary overflow-x-hidden">
      <LocalizedSlugs basePath="/blog" slugs={localizedSlugMap} />
      <ReadingProgress />

      <GlassmorphismNav />

      {/* ─── Hero with featured image + title overlay ───────────────── */}
      <header className="relative pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href={blogHref}
            className="inline-flex items-center gap-2 text-fg-muted hover:text-fg-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t("back_to_blog")}
          </Link>

          {/* Featured image (or gradient fallback) */}
          <div className="relative rounded-3xl overflow-hidden mb-10 border border-default">
            <FeaturedImage
              src={imageUrl}
              alt={plainTitle}
              title={plainTitle}
              aspect="aspect-[16/9] sm:aspect-[21/9]"
              priority
            />
            {/* Gradient scrim for title legibility when an image is present */}
            {imageUrl && (
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            )}

            {/* Title + meta overlay */}
            <div className={`${imageUrl ? "absolute inset-x-0 bottom-0" : "relative"} p-6 sm:p-8 lg:p-10`}>
              {categoryNames.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {categoryNames.slice(0, 3).map((name) => (
                    <span
                      key={name}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                        imageUrl
                          ? "bg-white/15 text-white backdrop-blur-sm"
                          : "bg-brand-primary/10 text-brand-primary"
                      }`}
                    >
                      <Tag className="h-3 w-3" />
                      {name}
                    </span>
                  ))}
                </div>
              )}
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-balance ${
                  imageUrl ? "text-white" : "text-fg-primary"
                }`}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-sm ${imageUrl ? "text-white/80" : "text-fg-muted"}`}>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>{formatDate(post.date, dateLocale)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {t("reading_time_min", { minutes: readingMin })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Body: TOC (sticky rail) + article + share ──────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10">
            <Toc />

            <div className="min-w-0">
              <article
                data-blog-content
                className="prose prose-lg dark:prose-invert max-w-3xl mx-auto
                  prose-headings:scroll-mt-32
                  prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:mt-8 prose-h3:mb-3
                  prose-table:overflow-hidden prose-table:rounded-lg prose-table:border prose-table:border-default
                  prose-th:bg-bg-subtle prose-th:p-3
                  prose-td:p-3 prose-td:border-t prose-td:border-default
                  prose-blockquote:not-italic prose-blockquote:bg-bg-subtle prose-blockquote:rounded-lg prose-blockquote:p-6 prose-blockquote:border-l-4 prose-blockquote:border-brand-primary
                  prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
                  prose-ul:my-4 prose-li:my-1
                  prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />

              {/* Author box + related live inside the main column so the TOC stays aligned with the body copy. */}
              <div className="max-w-3xl mx-auto">
                <AuthorBox />

                {/* Footer CTA — operational tone, consistent with home CTA (PR #80). */}
                <aside className="mt-12 p-7 sm:p-9 rounded-3xl border border-default bg-bg-card dark:bg-bg-elevated text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-fg-primary mb-3 tracking-tight">
                    {t("cta_title")}
                  </h2>
                  <p className="text-fg-muted mb-6 max-w-xl mx-auto leading-relaxed">
                    {t("cta_subtitle")}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button asChild size="lg" className="rounded-full">
                      <Link href="/demo">{t("cta_primary")}</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full">
                      <Link href={blogHref}>{t("cta_secondary")}</Link>
                    </Button>
                  </div>
                </aside>

                <RelatedPosts posts={related} locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShareButtons title={plainTitle} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Footer />
    </main>
  )
}
