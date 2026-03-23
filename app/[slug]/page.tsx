import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { getSeoQuestionPost, getAllSeoQuestionSlugs, formatDate, stripHtml, getFeaturedImageUrl } from "@/lib/wordpress"
import { SeoQuestionContent } from "./seo-question-content"

export const revalidate = 300 // 5 minutes

// Reserved slugs that should not be handled by this catch-all
const RESERVED_SLUGS = [
  "blog",
  "casos",
  "casos-exito",
  "faq",
  "sectores",
  "soluciones",
  "precios",
  "nosotros",
  "metodologia",
  "tecnologia",
  "integraciones",
  "seguridad-compliance",
  "demo",
  "car-dealerships",
  "privacidad",
  "terminos",
  "cookies",
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllSeoQuestionSlugs()
    return slugs
      .filter(slug => !RESERVED_SLUGS.includes(slug))
      .map(slug => ({ slug }))
  } catch (error) {
    console.error("Error generating static params for SEO pages:", error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  // Skip reserved slugs
  if (RESERVED_SLUGS.includes(slug)) {
    return {}
  }

  try {
    const post = await getSeoQuestionPost(slug)
    if (!post) {
      return {
        title: "Pagina no encontrada - StaffDigital AI",
      }
    }

    const title = post.acf?.meta_title || stripHtml(post.title.rendered)
    const description = post.acf?.meta_description || stripHtml(post.excerpt.rendered)
    const imageUrl = getFeaturedImageUrl(post)

    return {
      title: `${title} - StaffDigital AI`,
      description,
      openGraph: {
        title: `${title} - StaffDigital AI`,
        description,
        type: "article",
        publishedTime: post.date,
        images: imageUrl ? [imageUrl] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} - StaffDigital AI`,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    }
  } catch (error) {
    console.error("Error generating metadata for SEO page:", error)
    return {
      title: "Pregunta - StaffDigital AI",
    }
  }
}

export default async function SeoQuestionPage({ params }: PageProps) {
  const { slug } = await params

  // Skip reserved slugs - let Next.js handle these routes
  if (RESERVED_SLUGS.includes(slug)) {
    notFound()
  }

  let post = null
  try {
    post = await getSeoQuestionPost(slug)
  } catch (error) {
    console.error("Error fetching SEO question post:", error)
  }

  if (!post) {
    notFound()
  }

  const title = stripHtml(post.title.rendered)
  const imageUrl = getFeaturedImageUrl(post)
  const formattedDate = formatDate(post.date)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GlassmorphismNav />
      <main className="flex-1 pt-20">
        <PageWrapper
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Preguntas frecuentes", href: "/faq" },
            { label: title },
          ]}
        >
          <SeoQuestionContent 
            post={post} 
            title={title}
            imageUrl={imageUrl}
            formattedDate={formattedDate}
          />
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}
