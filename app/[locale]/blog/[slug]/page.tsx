import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LocalizedSlugs } from "@/components/localized-slugs-provider"
import { getPost, getPosts, getFeaturedImageUrl, stripHtml, formatDate } from "@/lib/wordpress"
import type { WPPost, SupportedLang } from "@/lib/wordpress"

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
      for (const post of posts) {
        all.push({ locale, slug: post.slug })
      }
    } catch {
      // Non-fatal: just skip this locale if WP is unreachable at build time.
      // ISR will fill the gap on first request.
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

  if (!post) {
    return { title: "Post no encontrado - StaffDigital AI" }
  }

  // Prefer Yoast SEO data, fallback to ACF, then raw content
  const yoast = (post as Record<string, unknown>).yoast_head_json as Record<string, unknown> | undefined
  const fallbackTitle = stripHtml(post.title.rendered)
  const fallbackDesc = post.acf?.meta_description || stripHtml(post.excerpt.rendered).slice(0, 160)
  const imageUrl = getFeaturedImageUrl(post, "full")

  const title = (yoast?.title as string)?.replace(/ \| StaffDigital AI$/i, "") || post.acf?.meta_title || fallbackTitle
  const description = (yoast?.description as string) || fallbackDesc

  return {
    title,
    description,
    openGraph: {
      title: (yoast?.og_title as string) || fallbackTitle,
      description: (yoast?.og_description as string) || description,
      images: (yoast?.og_image as Array<{ url: string }>)?.map(i => i.url) || (imageUrl ? [imageUrl] : undefined),
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

  if (!post) {
    return (
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <GlassmorphismNav />
        <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Post no encontrado</h1>
            <p className="text-muted-foreground mb-8">El articulo que buscas no existe o ha sido eliminado.</p>
            <Button asChild>
              <Link href="/blog">Volver al blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const imageUrl = getFeaturedImageUrl(post, "full")
  const categoryNames = post._embedded?.["wp:term"]?.[0]?.map((t) => t.name) || []

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: stripHtml(post.title.rendered),
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Organization",
      name: "StaffDigital AI",
    },
    publisher: {
      "@type": "Organization",
      name: "StaffDigital AI",
      logo: {
        "@type": "ImageObject",
        url: "https://www.staffdigital.ai/logo.png",
      },
    },
    ...(imageUrl ? { image: imageUrl } : {}),
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
  }

  // Publish per-locale slug map so the nav's language switcher can navigate
  // to the correct localized URL instead of 404'ing on a slug-prefix swap.
  const localizedSlugMap = {
    es: post.wpml_translations?.es?.slug ?? (locale === "es" ? post.slug : undefined),
    en: post.wpml_translations?.en?.slug ?? (locale === "en" ? post.slug : undefined),
    pt: post.wpml_translations?.["pt-pt"]?.slug ?? (locale === "pt" ? post.slug : undefined),
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LocalizedSlugs basePath="/blog" slugs={localizedSlugMap} />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <GlassmorphismNav />

      <article className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Volver al blog
          </Link>

          {/* Header */}
          <header className="space-y-6 mb-12">
            {/* Categories */}
            {categoryNames.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categoryNames.map((name) => (
                  <Badge key={name} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <Tag className="h-3 w-3 mr-1" />
                    {name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Meta */}
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              {post.acf?.reading_time && (
                <span>{post.acf.reading_time} min de lectura</span>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative w-full h-64 sm:h-80 md:h-[480px] rounded-2xl overflow-hidden mb-12">
              <Image
                src={imageUrl}
                alt={stripHtml(post.title.rendered)}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <article
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto
              prose-headings:scroll-mt-20
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

          {/* Footer CTA */}
          <div className="mt-16 p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Quieres sabermás sobre IA para tu negocio?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Descubre como StaffDigital AI puede transformar tu empresa con soluciones de automatización inteligente.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/demo">
                  Solicitar Demo
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/blog">
                  Vermás artículos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Footer />
    </main>
  )
}
