import type { Metadata } from "next"
import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { BlogContent } from "./blog-content"
import { getCategories, getContentTypes, getPosts } from "@/lib/wordpress"
import type { WPPost, SupportedLang } from "@/lib/wordpress"

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos y guias sobre agentes IA con voz humana. WhatsApp, telefono, chat web y mas.",
}

// Revalidate every 5 minutes for ISR
export const revalidate = 300

// Next.js locale → WPML language code (ES master, EN and PT-PT translations).
function toWpmlLang(locale: string): SupportedLang {
  if (locale === "pt") return "pt-pt"
  if (locale === "en") return "en"
  return "es"
}

interface BlogPageProps {
  params: Promise<{ locale: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  const wpmlLang = toWpmlLang(locale)
  const t = await getTranslations({ locale, namespace: "blog_ui" })

  let categories: Awaited<ReturnType<typeof getCategories>> = []
  let contentTypes: Awaited<ReturnType<typeof getContentTypes>> = []
  let initialPosts: WPPost[] = []
  let initialTotalPages = 1

  try {
    const [cats, types, postsResult] = await Promise.all([
      getCategories(wpmlLang),
      getContentTypes(wpmlLang),
      getPosts({ lang: wpmlLang, page: 1, perPage: 9 }),
    ])
    categories = cats
    contentTypes = types
    initialPosts = postsResult.posts
    initialTotalPages = postsResult.totalPages
  } catch (error) {
    console.error("Error fetching blog data:", error)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <GlassmorphismNav />

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-14 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-fg-primary leading-tight text-balance mb-6">
              {t("hero_title_plain")}{" "}
              <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
                {t("hero_title_highlight")}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-fg-muted max-w-2xl mx-auto leading-relaxed">
              {t("hero_intro")}
            </p>
          </div>

          {/* Blog Content with Filters */}
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card animate-pulse h-[400px]" />
                ))}
              </div>
            }
          >
            <BlogContent
              locale={locale}
              initialCategories={categories}
              initialContentTypes={contentTypes}
              initialPosts={initialPosts}
              initialTotalPages={initialTotalPages}
            />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  )
}
