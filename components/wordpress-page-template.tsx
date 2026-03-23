"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Shield, Cpu, Users, Zap, Globe, Lock, Settings, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WPPage } from "@/lib/wordpress"
import { getPageFeaturedImageUrl } from "@/lib/wordpress"

interface WordPressPageTemplateProps {
  page: WPPage | null
  fallbackTitle: string
  fallbackSubtitle?: string
  fallbackContent?: React.ReactNode
  showCta?: boolean
}

// Icon mapping for ACF sections
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  cpu: Cpu,
  users: Users,
  zap: Zap,
  globe: Globe,
  lock: Lock,
  settings: Settings,
  layers: Layers,
  check: Check,
}

function getIcon(iconName?: string) {
  if (!iconName) return Check
  return iconMap[iconName.toLowerCase()] || Check
}

export function WordPressPageTemplate({
  page,
  fallbackTitle,
  fallbackSubtitle,
  fallbackContent,
  showCta = true,
}: WordPressPageTemplateProps) {
  const title = page?.title?.rendered || fallbackTitle
  const subtitle = page?.acf?.subtitulo || fallbackSubtitle
  const featuredImage = page ? getPageFeaturedImageUrl(page) : null
  const sections = page?.acf?.secciones || []

  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            {subtitle}
          </p>
        )}
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      )}

      {/* WordPress Content */}
      {page?.content?.rendered && (
        <div
          className="prose prose-invert prose-lg max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      )}

      {/* ACF Sections */}
      {sections.length > 0 && (
        <div className="space-y-16">
          {sections.map((section, index) => (
            <div key={index} className="space-y-8">
              {section.titulo && (
                <h2 className="text-2xl md:text-3xl font-bold text-center">
                  {section.titulo}
                </h2>
              )}
              
              {section.contenido && (
                <div
                  className="prose prose-invert max-w-3xl mx-auto"
                  dangerouslySetInnerHTML={{ __html: section.contenido }}
                />
              )}

              {section.items && section.items.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, i) => {
                    const Icon = getIcon(item.icono)
                    return (
                      <div
                        key={i}
                        className="p-6 rounded-xl border border-border bg-card/50 space-y-3"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 w-fit">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold">{item.titulo}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.descripcion}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Fallback Content */}
      {!page && fallbackContent && fallbackContent}

      {/* CTA */}
      {showCta && (
        <div className="text-center space-y-6 p-8 lg:p-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <h2 className="text-2xl md:text-3xl font-bold">
            Quieres saber mas?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Contacta con nuestro equipo para descubrir como podemos ayudarte a
            transformar tu negocio con IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/demo">
                Solicitar demo gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/precios">Ver precios</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
