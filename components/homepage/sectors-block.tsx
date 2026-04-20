"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { HeartPulse, UtensilsCrossed, Home, ShoppingBag, ArrowRight, Layers } from "lucide-react"
import { IconBadge } from "@/components/ui/icon-system"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "@/hooks/use-motion-reveal"
import { motion } from "framer-motion"

interface SectorItem {
  slug: string
  name: string
  tagline: string
  proof: string
}

interface Transversal {
  badge: string
  title: string
  description: string
  cta: string
}

// ES master slug → Lucide icon. The href is resolved per current locale
// via the SECTOR_SLUGS map kept in glassmorphism-nav — but the home's 4
// featured cards are a fixed list, so we keep the mapping local and
// small here to avoid coupling to the nav component.
const SECTOR_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  clinicas: HeartPulse,
  restaurantes: UtensilsCrossed,
  inmobiliarias: Home,
  ecommerce: ShoppingBag,
}

const SECTOR_SLUGS: Record<string, { en: string; pt: string }> = {
  clinicas:      { en: "ai-clinics-medical-centers",  pt: "ia-clinicas-centros-medicos" },
  restaurantes:  { en: "ai-restaurants-hospitality",  pt: "ia-restaurantes-hotelaria" },
  inmobiliarias: { en: "ai-real-estate",              pt: "ia-imobiliarias" },
  ecommerce:     { en: "ai-ecommerce",                pt: "ia-ecommerce" },
}

function sectorHref(esSlug: string, locale: string): string {
  const translated =
    locale === "en" ? SECTOR_SLUGS[esSlug]?.en :
    locale === "pt" ? SECTOR_SLUGS[esSlug]?.pt :
    esSlug
  const slug = translated ?? esSlug
  const prefix = locale === "es" ? "" : `/${locale}`
  return `${prefix}/sectores/${slug}`
}

export function SectorsBlock() {
  const t = useTranslations("home_sectors")
  const locale = useLocale()
  const items = t.raw("items") as SectorItem[]
  const transversal = t.raw("transversal") as Transversal

  const header = useMotionReveal()
  const stagger = useStaggerContainer()
  const item = useStaggerItem()

  return (
    <section
      aria-labelledby="home-sectors-title"
      className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative">
        <motion.div {...header} className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/[0.06] border border-foreground/[0.1] dark:border-white/[0.1] text-xs font-semibold tracking-widest text-foreground/65 dark:text-white/55 uppercase backdrop-blur-sm mb-6">
            {t("badge")}
          </span>
          <h2
            id="home-sectors-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-5"
          >
            <span className="block">{t("title_plain")}</span>
            <span className="block bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
              {t("title_gradient")}
            </span>
          </h2>
          <p className="text-foreground/55 dark:text-foreground/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Featured sectors — 4 cards */}
        <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {items.map((s) => {
            const Icon = SECTOR_ICON[s.slug] ?? HeartPulse
            return (
              <motion.div key={s.slug} {...item}>
                <Link
                  href={sectorHref(s.slug, locale)}
                  className="group block p-7 sm:p-8 rounded-2xl card-premium hover:shadow-[0_8px_30px_rgba(0,120,170,0.15)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <IconBadge icon={Icon} size="md" />
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight pt-1">
                      {s.name}
                    </h3>
                  </div>
                  <p className="text-base text-foreground/70 dark:text-foreground/60 leading-relaxed mb-4">
                    {s.tagline}
                  </p>
                  <p className="text-xs font-medium text-brand-secondary dark:text-accent-cyan uppercase tracking-wider">
                    {s.proof}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/70 group-hover:text-brand-primary dark:group-hover:text-accent-violet transition-colors">
                    <span>{s.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Transversal / beyond-any-single-industry card */}
        <motion.div {...header} className="mt-4">
          <div className="p-8 sm:p-10 rounded-2xl border border-foreground/[0.08] dark:border-white/[0.1] bg-gradient-to-br from-brand-secondary/[0.05] to-brand-primary/[0.05] dark:from-brand-secondary/[0.12] dark:to-brand-primary/[0.12]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <IconBadge icon={Layers} size="lg" />
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[11px] font-semibold tracking-widest text-foreground/55 uppercase mb-2">
                  {transversal.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-2">
                  {transversal.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">
                  {transversal.description}
                </p>
              </div>
              <Link
                href={locale === "es" ? "/demo" : `/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-fg-primary text-bg-page hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                {transversal.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
