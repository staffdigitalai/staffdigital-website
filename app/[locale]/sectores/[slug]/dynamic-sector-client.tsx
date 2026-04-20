"use client"

import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"
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
  locale: string
}

export function DynamicSectorClient({ sector, locale }: DynamicSectorClientProps) {
  const { openContactForm } = useFormModals()
  const t = useTranslations("sector_ui")
  const tNav = useTranslations("nav")

  const slug = sector.slug
  const title = stripHtml(sector.title.rendered)
  const subtitle = sector.acf?.subtitulo
  const excerpt = stripHtml(sector.excerpt?.rendered ?? "")

  // ─── Data fallback chain: ACF → sector map (locale-aware) → generic ──
  // The ES master slug drives fallback lookup even on /en or /pt, because
  // WPML translations carry the ES slug via wpml_translations.es.slug.
  // Fallback to the current post's slug when translations map is absent.
  const esMasterSlug = sector.wpml_translations?.es?.slug ?? slug
  const fallback = getSectorFallback(esMasterSlug, locale)

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
    { label: tNav("sectors"), href: "/sectores" },
    { label: title },
  ]

  // Strip common ES prefixes so "Agentes IA para Clínicas" → "Clínicas"
  // when passed as a templated name inside section headings. For EN/PT
  // the WP title won't carry these prefixes, so the regex is a no-op
  // and the full title is used verbatim.
  const sectorName = title
    .replace(/^Agentes IA para /i, "")
    .replace(/^IA para /i, "")

  return (
    <PageWrapper breadcrumbs={breadcrumbs}>
      <SectorHeroSection
        title={title}
        subtitle={subtitle}
        excerpt={excerpt || t("hero_excerpt_fallback", { sector: title.toLowerCase() })}
        heroImage={fallback.heroImage}
        heroIcon={HeroIconComponent}
        onContactClick={openContactForm}
        ctaPrimary={t("cta_primary")}
        ctaSecondary={t("cta_secondary_hero")}
      />

      <SectorProblemsSection
        problems={problems}
        title={t("problems_title")}
        subtitle={t("problems_subtitle")}
        sectorName={sectorName}
      />

      <SectorSolutionsSection
        solutions={solutions}
        title={t("solutions_title")}
        sectorName={sectorName}
      />

      <SectorUseCasesSection
        useCases={useCases}
        title={t("use_cases_title")}
        subtitle={t("use_cases_subtitle")}
      />

      <SectorIntegrationsSection
        integrations={integrations}
        title={t("integrations_title")}
        subtitle={t("integrations_subtitle")}
      />

      <SectorFaqSection
        faqs={faqs}
        title={t("faq_title")}
        subtitle={t("faq_subtitle")}
      />

      <SectorCrossSellSection
        currentSlug={slug}
        title={t("cross_sell_title")}
        subtitle={t("cross_sell_subtitle")}
        ctaAll={t("cross_sell_cta_all")}
      />

      <SectorFinalCtaSection
        title={t("final_cta_title")}
        subtitle={t("final_cta_subtitle")}
        ctaLabel={t("final_cta_label")}
        sectorName={title}
      />
    </PageWrapper>
  )
}
