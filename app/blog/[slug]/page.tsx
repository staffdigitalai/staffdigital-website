import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { WPPost } from "@/lib/wordpress"

// Sample posts data (same as blog-content.tsx)
const samplePosts: WPPost[] = [
  {
    id: 1,
    slug: "automatizacion-atencion-cliente",
    title: { rendered: "Como la IA esta Transformando la Atencion al Cliente en 2024" },
    content: { rendered: `
      <p>La inteligencia artificial esta revolucionando la forma en que las empresas interactuan con sus clientes. En este articulo, exploramos las tendencias mas importantes y como puedes implementarlas en tu negocio.</p>
      
      <h2>El Auge de los Chatbots Inteligentes</h2>
      <p>Los chatbots basados en IA han evolucionado significativamente. Ya no se limitan a respuestas predefinidas; ahora pueden entender el contexto, aprender de las interacciones y proporcionar respuestas personalizadas.</p>
      
      <h2>Beneficios Clave</h2>
      <ul>
        <li>Disponibilidad 24/7 sin costes adicionales de personal</li>
        <li>Respuestas instantaneas que mejoran la satisfaccion del cliente</li>
        <li>Capacidad de manejar multiples consultas simultaneamente</li>
        <li>Analisis de datos en tiempo real para mejorar el servicio</li>
      </ul>
      
      <h2>Implementacion Practica</h2>
      <p>Para implementar un sistema de IA en tu atencion al cliente, es importante comenzar con objetivos claros y medibles. Identifica las consultas mas frecuentes y automatiza primero esas respuestas.</p>
      
      <blockquote>
        <p>"La IA no reemplaza a los humanos, los potencia para que puedan enfocarse en tareas mas complejas y de mayor valor."</p>
      </blockquote>
      
      <h2>Conclusion</h2>
      <p>La transformacion digital de la atencion al cliente es inevitable. Las empresas que adopten estas tecnologias tendran una ventaja competitiva significativa.</p>
    ` },
    excerpt: { rendered: "Descubre como la automatizacion inteligente puede mejorar tu servicio al cliente." },
    date: new Date().toISOString(),
    featured_media: 0,
    categories: [1],
    _embedded: {
      "wp:term": [[{ id: 1, name: "Automatizacion", slug: "automatizacion" }]]
    }
  },
  {
    id: 2,
    slug: "roi-inteligencia-artificial",
    title: { rendered: "5 Formas de Medir el ROI de tu Inversion en IA" },
    content: { rendered: `
      <p>Invertir en inteligencia artificial requiere una justificacion solida. Aqui te mostramos como medir el retorno de tu inversion.</p>
      
      <h2>1. Ahorro en Costes Operativos</h2>
      <p>Mide la reduccion en horas de trabajo manual y costes de personal para tareas repetitivas.</p>
      
      <h2>2. Mejora en Tiempo de Respuesta</h2>
      <p>Compara los tiempos de respuesta antes y despues de la implementacion de IA.</p>
      
      <h2>3. Satisfaccion del Cliente</h2>
      <p>Utiliza encuestas NPS y CSAT para medir el impacto en la experiencia del cliente.</p>
      
      <h2>4. Tasa de Conversion</h2>
      <p>Analiza si las interacciones asistidas por IA generan mas conversiones.</p>
      
      <h2>5. Escalabilidad</h2>
      <p>Evalua la capacidad de manejar mayor volumen sin aumentar proporcionalmente los costes.</p>
    ` },
    excerpt: { rendered: "Aprende a calcular el retorno de inversion de tus proyectos de inteligencia artificial." },
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    featured_media: 0,
    categories: [2],
    _embedded: {
      "wp:term": [[{ id: 2, name: "Estrategia", slug: "estrategia" }]]
    }
  },
  {
    id: 3,
    slug: "chatbots-vs-asistentes-virtuales",
    title: { rendered: "Chatbots vs Asistentes Virtuales: Cual Necesita tu Empresa?" },
    content: { rendered: `
      <p>Entender la diferencia entre chatbots y asistentes virtuales es crucial para elegir la solucion correcta.</p>
      
      <h2>Chatbots</h2>
      <p>Los chatbots son ideales para tareas especificas y respuestas rapidas. Funcionan bien para FAQs y consultas simples.</p>
      
      <h2>Asistentes Virtuales</h2>
      <p>Los asistentes virtuales ofrecen una experiencia mas completa, con capacidad de entender contexto y realizar tareas complejas.</p>
      
      <h2>Como Elegir</h2>
      <p>La eleccion depende de tus necesidades especificas, presupuesto y objetivos a largo plazo.</p>
    ` },
    excerpt: { rendered: "Guia completa para elegir la solucion de IA conversacional adecuada." },
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    featured_media: 0,
    categories: [1],
    _embedded: {
      "wp:term": [[{ id: 1, name: "Automatizacion", slug: "automatizacion" }]]
    }
  },
  {
    id: 4,
    slug: "tendencias-ia-2024",
    title: { rendered: "Las Tendencias de IA que Dominaran 2024" },
    content: { rendered: `
      <p>El 2024 promete ser un ano transformador para la inteligencia artificial empresarial.</p>
      
      <h2>IA Generativa</h2>
      <p>La creacion de contenido automatizado seguira creciendo en importancia.</p>
      
      <h2>Automatizacion de Procesos</h2>
      <p>Mas empresas adoptaran la automatizacion inteligente de procesos de negocio.</p>
      
      <h2>IA Etica</h2>
      <p>La transparencia y etica en IA seran cada vez mas importantes.</p>
    ` },
    excerpt: { rendered: "Preparate para el futuro con estas tendencias clave en inteligencia artificial." },
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    featured_media: 0,
    categories: [2],
    _embedded: {
      "wp:term": [[{ id: 2, name: "Estrategia", slug: "estrategia" }]]
    }
  },
  {
    id: 5,
    slug: "automatizar-procesos-rrhh",
    title: { rendered: "Automatizar Procesos de RRHH: Por Donde Empezar" },
    content: { rendered: `
      <p>Los departamentos de recursos humanos pueden beneficiarse enormemente de la automatizacion.</p>
      
      <h2>Reclutamiento</h2>
      <p>Automatiza el screening de CVs y la programacion de entrevistas.</p>
      
      <h2>Onboarding</h2>
      <p>Crea flujos automatizados para la incorporacion de nuevos empleados.</p>
      
      <h2>Gestion de Solicitudes</h2>
      <p>Implementa sistemas de autoservicio para vacaciones y permisos.</p>
    ` },
    excerpt: { rendered: "Transforma tu departamento de recursos humanos con inteligencia artificial." },
    date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    featured_media: 0,
    categories: [3],
    _embedded: {
      "wp:term": [[{ id: 3, name: "RRHH", slug: "rrhh" }]]
    }
  },
  {
    id: 6,
    slug: "ia-pequenas-empresas",
    title: { rendered: "IA para Pequenas Empresas: Mitos y Realidades" },
    content: { rendered: `
      <p>La inteligencia artificial no es solo para grandes corporaciones. Descubre como las PYMEs pueden aprovecharla.</p>
      
      <h2>Mito 1: Es muy cara</h2>
      <p>Existen soluciones accesibles y escalables para cualquier presupuesto.</p>
      
      <h2>Mito 2: Es muy compleja</h2>
      <p>Las herramientas modernas son cada vez mas faciles de implementar.</p>
      
      <h2>Mito 3: Reemplazara empleos</h2>
      <p>La IA complementa el trabajo humano, no lo reemplaza.</p>
    ` },
    excerpt: { rendered: "Desmitificamos la IA y mostramos como puede beneficiar a tu PYME." },
    date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    featured_media: 0,
    categories: [2],
    _embedded: {
      "wp:term": [[{ id: 2, name: "Estrategia", slug: "estrategia" }]]
    }
  }
]

// Helper to format date
function formatDate(dateString: string, locale: string = "es-ES"): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Helper to strip HTML from excerpt
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim()
}

// Helper to get featured image URL
function getFeaturedImageUrl(post: WPPost, size: "medium" | "large" | "full" = "large"): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0]
  if (!media) return null
  
  if ("media_details" in media && media.media_details?.sizes) {
    return media.media_details.sizes[size]?.source_url || media.source_url
  }
  
  return media.source_url
}

async function getPostData(slug: string): Promise<WPPost | null> {
  // First try to get from WordPress API
  try {
    const apiUrl = "https://cms.staffdigital.ai/wp-json/wp/v2"
    const response = await fetch(`${apiUrl}/posts?slug=${slug}&_embed=1`, {
      next: { revalidate: 300 }
    })
    
    if (response.ok) {
      const posts = await response.json()
      if (posts.length > 0) {
        return posts[0]
      }
    }
  } catch (error) {
    console.error("Error fetching post from API:", error)
  }
  
  // Fallback to sample data
  return samplePosts.find(p => p.slug === slug) || null
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    return {
      title: "Post no encontrado - StaffDigital AI",
    }
  }

  return {
    title: `${stripHtml(post.title.rendered)} - StaffDigital AI`,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostData(slug)

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

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:marker:text-primary
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-card prose-pre:border prose-pre:border-border
              prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Footer CTA */}
          <div className="mt-16 p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Quieres saber mas sobre IA para tu negocio?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Descubre como StaffDigital AI puede transformar tu empresa con soluciones de automatizacion inteligente.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/#contact">
                  Solicitar Demo
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/blog">
                  Ver mas articulos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
