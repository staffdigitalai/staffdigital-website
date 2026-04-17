"use client"

import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { PageWrapper } from "@/components/page-wrapper"
import { useFormModals } from "@/components/contact-form-modals"
import type { WPSectorPage } from "@/lib/wordpress"
import { stripHtml } from "@/lib/wordpress"
import { getSectorFallback } from "@/lib/sector-fallback-content"
import { SectorHeroSection } from "@/components/sector/hero-section"
import { SectorProblemsSection } from "@/components/sector/problems-section"
import { SectorSolutionsSection } from "@/components/sector/solutions-section"
import { SectorUseCasesSection } from "@/components/sector/use-cases-section"
import { SectorIntegrationsSection } from "@/components/sector/integrations-section"
import { SectorFaqSection } from "@/components/sector/faq-section"
import { SectorCrossSellSection } from "@/components/sector/cross-sell-section"
import { SectorFinalCtaSection } from "@/components/sector/final-cta-section"

interface DynamicSectorClientProps {
  sector: WPSectorPage
}

export function DynamicSectorClient({ sector }: DynamicSectorClientProps) {
  const { openContactForm } = useFormModals()

  const slug = sector.slug
  const title = stripHtml(sector.title.rendered)
  const subtitle = sector.acf?.subtitulo
  const excerpt = stripHtml(sector.excerpt?.rendered ?? "")

  // ─── Data fallback chain: ACF → sector map → generic ──────────
  const fallback = getSectorFallback(slug)

  const heroIconName = sector.acf?.icono || fallback.heroIcon
  const HeroIconComponent = (Icons[heroIconName as keyof typeof Icons] as LucideIcon) || Icons.Building2

  // Problems: prefer new sector_problemas, then old problemas_sector, then fallback
  const problems = sector.acf?.sector_problemas?.length
    ? sector.acf.sector_problemas.map((p) => ({
        titulo: p.titulo,
        descripcion: p.descripcion,
        icono: p.icono || "AlertTriangle",
      }))
    : sector.acf?.problemas_sector?.length
    ? sector.acf.problemas_sector.map((p) => ({
        titulo: p.problema,
        descripcion: p.descripcion,
        icono: "AlertTriangle",
      }))
    : fallback.problems

  // Solutions: prefer sector_soluciones (with metric), then soluciones, then fallback
  const solutions = sector.acf?.sector_soluciones?.length
    ? sector.acf.sector_soluciones.map((s) => ({
        titulo: s.titulo,
        descripcion: s.descripcion,
        metrica: s.metrica || "Ver detalle",
        icono: s.icono || "Check",
      }))
    : sector.acf?.soluciones?.length && sector.acf?.metricas?.length
    ? sector.acf.soluciones.map((s, i) => ({
        titulo: s.titulo,
        descripcion: s.descripcion,
        metrica: sector.acf?.metricas?.[i]?.valor ?? "",
        icono: s.icono || "Check",
      }))
    : fallback.solutions

  // Use cases: only from fallback for now (ACF not planned)
  const useCases = fallback.useCases

  // Integrations: prefer sector_integraciones slugs, then fallback
  const integrations = sector.acf?.sector_integraciones?.length
    ? sector.acf.sector_integraciones.map((i) => i.slug || "openai").filter(Boolean)
    : fallback.integrations

  // FAQ: prefer sector_faq, then fallback
  const faqs = sector.acf?.sector_faq?.length
    ? sector.acf.sector_faq
    : fallback.faq

  const breadcrumbs = [
    { label: "Sectores", href: "/sectores" },
    { label: title },
  ]

  return (
    <PageWrapper breadcrumbs={breadcrumbs}>
      <SectorHeroSection
        title={title}
        subtitle={subtitle}
        excerpt={excerpt || `Agentes IA especializados para ${title.toLowerCase()}.`}
        heroImage={fallback.heroImage}
        heroIcon={HeroIconComponent}
        onContactClick={openContactForm}
        ctaPrimary="Pedir Demo"
        ctaSecondary="Hablar con ventas"
      />

      <SectorProblemsSection
        problems={problems}
        title="Problemas que enfrentan"
        subtitle="Los desafíos diarios que frenan el crecimiento de tu negocio."
        sectorName={title.replace(/^Agentes IA para /i, "").replace(/^IA para /i, "")}
      />

      <SectorSolutionsSection
        solutions={solutions}
        title="Cómo StaffDigital AI transforma"
        sectorName={title.replace(/^Agentes IA para /i, "").replace(/^IA para /i, "")}
      />

      <SectorUseCasesSection
        useCases={useCases}
        title="Casos de uso reales"
        subtitle="Escenarios concretos donde nuestros agentes IA ya están operando."
      />

      <SectorIntegrationsSection
        integrations={integrations}
        title="Integrado con tu stack"
        subtitle="Conectamos con las herramientas que ya usas. Sin migraciones, sin dolor."
      />

      <SectorFaqSection
        faqs={faqs}
        title="Preguntas frecuentes"
        subtitle="Las dudas más comunes antes de implementar agentes IA en tu sector."
      />

      <SectorCrossSellSection
        currentSlug={slug}
        title="Otros sectores que atendemos"
        subtitle="Descubre cómo ayudamos a otros negocios con agentes IA especializados."
        ctaAll="Ver todos los sectores"
      />

      <SectorFinalCtaSection
        title="¿Listo para transformar tu negocio?"
        subtitle="Implementación llave en mano en 2-6 semanas. Sin permanencia."
        ctaLabel="Pedir Demo"
        sectorName={title}
      />
    </PageWrapper>
  )
}
