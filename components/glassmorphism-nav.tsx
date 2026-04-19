"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight, ChevronDown, Scissors, UtensilsCrossed, Car, ShoppingBag, Building2, Warehouse, Wrench, BriefcaseMedical, Globe, MessageSquare, Layers, Home, GraduationCap, Dumbbell, Headphones, Phone, UserPlus, TrendingUp, Database, Scale, Rocket, Zap, HeartPulse, Activity } from "lucide-react"
import Link from "next/link"
import { usePathname as useNextPathname } from "next/navigation"
import { useRouter as useIntlRouter, usePathname as useIntlPathname } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"
import { StaffDigitalLogo } from "@/components/staffdigital-logo"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useLocalizedSlugs } from "@/components/localized-slugs-provider"

import type { LucideIcon } from "lucide-react"

// ES slug is the "master" (matches WPML master language). EN + PT slugs
// come from SERVICE_SLUGS / SECTOR_SLUGS below and are resolved at render
// time so the dropdown links navigate to the right localized URL instead
// of 404'ing on /en/soluciones/ia-omnicanal (EN slug is
// "omnichannel-conversational-ai").
//
// Services are grouped by functional category (agentes / canales /
// automatizacion). The category drives which sub-section of the
// dropdown the item renders into.
type ServiceCategory = "agentes" | "canales" | "automatizacion"

const servicesMeta: { slug: string; icon: LucideIcon; category: ServiceCategory }[] = [
  // Agentes (6)
  { slug: "agentes-ia-voz-humana",     icon: MessageSquare,    category: "agentes" },
  { slug: "agente-ventas-ia",          icon: BriefcaseMedical, category: "agentes" },
  { slug: "agente-soporte-ia",         icon: Headphones,       category: "agentes" },
  { slug: "agente-agendamientos-ia",   icon: GraduationCap,    category: "agentes" },
  { slug: "agente-chat-web-ia",        icon: MessageSquare,    category: "agentes" },
  { slug: "agente-chat-productos-ia",  icon: ShoppingBag,      category: "agentes" },
  // Canales (4)
  { slug: "whatsapp-ia-empresas",      icon: MessageSquare,    category: "canales" },
  { slug: "ia-omnicanal",              icon: Layers,           category: "canales" },
  { slug: "ia-call-center",            icon: Phone,            category: "canales" },
  { slug: "atencion-telefonica-ia",    icon: Phone,            category: "canales" },
  // Automatización (3)
  { slug: "automacion-ventas-ia",      icon: TrendingUp,       category: "automatizacion" },
  { slug: "lead-generation-ia",        icon: Zap,              category: "automatizacion" },
  { slug: "onboarding-automatico",     icon: UserPlus,         category: "automatizacion" },
]

// All 19 sectors live in the nav. The 4 featured ones render in a
// prominent top strip; the other 15 render below alphabetically
// (EN/PT display order mirrors the i18n file, which is alphabetical in
// ES for the "all" group).
const sectorsMeta: { slug: string; icon: LucideIcon; featured?: boolean }[] = [
  // Featured (4) — order here must match the first 4 i18n sectors_items
  { slug: "clinicas",             icon: HeartPulse,       featured: true },
  { slug: "restaurantes",         icon: UtensilsCrossed,  featured: true },
  { slug: "inmobiliarias",        icon: Home,             featured: true },
  { slug: "ecommerce",            icon: ShoppingBag,      featured: true },
  // All sectors (15) — alphabetical by ES name
  { slug: "centros-belleza",      icon: Scissors },
  { slug: "clubs-deportivos",     icon: Dumbbell },
  { slug: "concesionarios",       icon: Car },
  { slug: "crm-automation",       icon: Database },
  { slug: "despachos-abogados",   icon: Scale },
  { slug: "educacion",            icon: GraduationCap },
  { slug: "gimnasios",            icon: Activity },
  { slug: "home-staging-virtual", icon: Home },
  { slug: "lead-generation-pymes", icon: Zap },
  { slug: "logistica",            icon: Warehouse },
  { slug: "oficinas",             icon: Building2 },
  { slug: "retail",               icon: ShoppingBag },
  { slug: "saas-startups",        icon: Rocket },
  { slug: "servicios-tecnicos",   icon: Wrench },
  { slug: "turismo-hoteleria",    icon: Globe },
]

// Per-locale slug maps, keyed by ES slug (the master). Values come from
// WPML `wpml_translations` field on each CPT; verified via REST. When
// WP adds a new sector / service, add one row here with the 3 slugs.
const SERVICE_SLUGS: Record<string, { en: string; pt: string }> = {
  "agentes-ia-voz-humana":     { en: "ai-agents-human-voice",         pt: "agentes-ia-voz-humana-2" },
  "agente-ventas-ia":          { en: "ai-sales-agent",                pt: "agente-vendas-ia" },
  "agente-soporte-ia":         { en: "ai-support-agent",              pt: "agente-suporte-ia" },
  "agente-agendamientos-ia":   { en: "ai-scheduling-agent",           pt: "agente-agendamentos-ia" },
  "agente-chat-web-ia":        { en: "intelligent-website-chat",      pt: "chat-inteligente-websites" },
  "agente-chat-productos-ia":  { en: "intelligent-product-chat",      pt: "chat-inteligente-produtos" },
  "whatsapp-ia-empresas":      { en: "ai-whatsapp-business",          pt: "whatsapp-ia-empresas-2" },
  "ia-omnicanal":              { en: "omnichannel-conversational-ai", pt: "ia-conversacional-omnicanal" },
  "ia-call-center":            { en: "ai-call-center",                pt: "ia-call-center-2" },
  "atencion-telefonica-ia":    { en: "ai-phone-support",              pt: "atendimento-telefonico-ia" },
  "automacion-ventas-ia":      { en: "ai-sales-funnel",               pt: "funil-vendas-ia" },
  "lead-generation-ia":        { en: "ai-lead-generation",            pt: "lead-generation-ia-2" },
  "onboarding-automatico":     { en: "automated-ai-onboarding",       pt: "onboarding-automatico-ia" },
}

const SECTOR_SLUGS: Record<string, { en: string; pt: string }> = {
  // Featured
  "clinicas":             { en: "ai-clinics-medical-centers",  pt: "ia-clinicas-centros-medicos" },
  "restaurantes":         { en: "ai-restaurants-hospitality",  pt: "ia-restaurantes-hotelaria" },
  "inmobiliarias":        { en: "ai-real-estate",              pt: "ia-imobiliarias" },
  "ecommerce":            { en: "ai-ecommerce",                pt: "ia-ecommerce" },
  // All sectors
  "centros-belleza":      { en: "ai-beauty-aesthetics",        pt: "ia-centros-beleza-estetica" },
  "clubs-deportivos":     { en: "sports-clubs",                pt: "clubes-desportivos" },
  "concesionarios":       { en: "ai-car-dealerships",          pt: "ia-concessionarios-automoveis" },
  "crm-automation":       { en: "ai-crm-automation",           pt: "crm-automation-ia" },
  "despachos-abogados":   { en: "law-firms",                   pt: "escritorios-advogados" },
  "educacion":            { en: "ai-education-training",       pt: "ia-centros-educativos-formacao" },
  "gimnasios":            { en: "ai-gyms-sports-centers",      pt: "ia-ginasios-centros-desportivos" },
  "home-staging-virtual": { en: "virtual-home-staging-ai",     pt: "home-staging-virtual-ia" },
  "lead-generation-pymes": { en: "ai-lead-generation-smbs",    pt: "lead-generation-ia-pmes" },
  "logistica":            { en: "ai-logistics-transport",      pt: "ia-logistica-transporte" },
  "oficinas":             { en: "ai-professional-offices",     pt: "ia-escritorios-gabinetes" },
  "retail":               { en: "ai-retail-commerce",          pt: "ia-retalho-comercio" },
  "saas-startups":        { en: "ai-saas-startups",            pt: "ia-saas-startups" },
  "servicios-tecnicos":   { en: "ai-technical-services",       pt: "ia-servicos-tecnicos" },
  "turismo-hoteleria":    { en: "ai-tourism-hospitality",      pt: "ia-turismo-hotelaria" },
}

// Build a locale-aware path like /en/soluciones/ai-sales-agent.
// Falls back to the ES slug if a translation is missing so the link still
// resolves to something (the landing page handles 404 gracefully).
function cptPath(
  base: "/soluciones" | "/sectores",
  esSlug: string,
  locale: string,
  slugMap: Record<string, { en: string; pt: string }>,
): string {
  const targetSlug =
    locale === "en" ? (slugMap[esSlug]?.en ?? esSlug) :
    locale === "pt" ? (slugMap[esSlug]?.pt ?? esSlug) :
    esSlug
  const prefix = locale === "es" ? "" : `/${locale}`
  return `${prefix}${base}/${targetSlug}`
}

const languages = [
  { code: "es", label: "Espanol" },
  { code: "en", label: "English" },
  { code: "pt", label: "Portugues" },
]

const navItemsDef = [
  { key: "home", href: "/" },
  { key: "solutions", href: "/soluciones", dropdown: "services" },
  { key: "sectors", href: "/sectores", dropdown: "sectors" },
  { key: "about", href: "/nosotros" },
]

export function GlassmorphismNav() {
  const t = useTranslations("nav")
  const servicesT = t.raw("services_items") as { name: string; description: string }[]
  const sectorsT = t.raw("sectors_items") as { name: string; description: string }[]
  const services = servicesMeta.map((meta, i) => ({ ...meta, name: servicesT[i]?.name ?? "", description: servicesT[i]?.description ?? "" }))
  const sectors = sectorsMeta.map((meta, i) => ({ ...meta, name: sectorsT[i]?.name ?? "", description: sectorsT[i]?.description ?? "" }))
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isSectorsOpen, setIsSectorsOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileSectorsOpen, setIsMobileSectorsOpen] = useState(false)
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false)
  const activeLocale = useLocale()
  const intlRouter = useIntlRouter()
  const intlPathname = useIntlPathname()
  const localizedSlugs = useLocalizedSlugs()
  const [currentLang, setCurrentLang] = useState(activeLocale)

  // Navigate to the current page in `target` locale. Per-page WPML slug map
  // (registered via <LocalizedSlugs> in content pages) wins over a naive
  // "swap the locale prefix on the current pathname" — that would 404 on
  // blog / sector / service pages whose WPML translations use different
  // slugs per locale (e.g. ES "telemedicina-ia-pacientes" vs EN
  // "telemedicine-ai-patient-followup").
  const switchLocale = (target: "es" | "pt" | "en") => {
    const { slugs, basePath } = localizedSlugs
    if (slugs && basePath) {
      const translatedSlug = slugs[target]
      if (translatedSlug) {
        // Translation exists — navigate to the correct localized URL.
        intlRouter.replace(`${basePath}/${translatedSlug}`, { locale: target })
      } else {
        // No translation in target locale — fall back to the section listing
        // so the user doesn't land on a 404.
        intlRouter.replace(basePath, { locale: target })
      }
      return
    }
    // Page has no localized slug map (static pages, home, etc.) — safe to
    // just swap the locale prefix.
    intlRouter.replace(intlPathname, { locale: target })
  }
  const navItems = navItemsDef.map((item) => ({ ...item, label: t(item.key) }))
  const [isVisible, setIsVisible] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("#inicio")
  const lastScrollY = useRef(0)
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sectorsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const langTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = useNextPathname()

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true)
    }, 100)

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY
        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            setIsVisible(false)
            setIsServicesOpen(false)
            setIsSectorsOpen(false)
            setIsLangOpen(false)
          } else if (lastScrollY.current - currentScrollY > 5) {
            setIsVisible(true)
          }
        } else {
          setIsVisible(true)
        }
        lastScrollY.current = currentScrollY
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true })
      return () => {
        window.removeEventListener("scroll", controlNavbar)
        clearTimeout(timer)
      }
    }

    return () => clearTimeout(timer)
  }, [])

  // Track active section on homepage using IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") return

    const sectionIds = ["inicio", "sobre", "soluciones", "sectores", "testemunhos"]
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(`#${id}`)
              }
            })
          },
          { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [pathname])

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current)
    setIsSectorsOpen(false)
    setIsLangOpen(false)
    setIsServicesOpen(true)
  }

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 200)
  }

  const handleSectorsEnter = () => {
    if (sectorsTimeoutRef.current) clearTimeout(sectorsTimeoutRef.current)
    setIsServicesOpen(false)
    setIsLangOpen(false)
    setIsSectorsOpen(true)
  }

  const handleSectorsLeave = () => {
    sectorsTimeoutRef.current = setTimeout(() => setIsSectorsOpen(false), 200)
  }

  const handleLangEnter = () => {
    if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current)
    setIsServicesOpen(false)
    setIsSectorsOpen(false)
    setIsLangOpen(true)
  }

  const handleLangLeave = () => {
    langTimeoutRef.current = setTimeout(() => setIsLangOpen(false), 200)
  }

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) return

    if (pathname !== "/") {
      window.location.href = "/" + href
      return
    }

    const element = document.querySelector(href)
    if (element) {
      const rect = element.getBoundingClientRect()
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      const elementAbsoluteTop = rect.top + currentScrollY
      const navbarHeight = 100
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight)
      window.scrollTo({ top: targetPosition, behavior: "smooth" })
    }
    setIsOpen(false)
    setIsServicesOpen(false)
    setIsSectorsOpen(false)
    setIsLangOpen(false)
  }

  const selectedLang = languages.find((l) => l.code === currentLang)

  // Check if nav item is active
  const isNavItemActive = (item: { label: string; href: string; dropdown?: string }) => {
    // On subpages, check if we're on a solutions or sectors page
    if (pathname.startsWith("/soluciones") && item.dropdown === "services") return true
    if (pathname.startsWith("/sectores") && item.dropdown === "sectors") return true
    
    // Check for blog and cases pages
    if (pathname.startsWith("/blog") && item.href === "/blog") return true
    if (pathname.startsWith("/casos-exito") && item.href === "/casos-exito") return true
    if (pathname.startsWith("/precios") && item.href === "/precios") return true
    if (pathname.startsWith("/nosotros") && item.href === "/nosotros") return true
    
    // Homepage active
    if (pathname === "/" && item.href === "/") return true
    
    return false
  }

  return (
    <>
      <nav
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 md:-translate-y-24 opacity-0"
        } ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{
          transition: hasLoaded ? "all 0.5s ease-out" : "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <div className="w-[92vw] max-w-xs md:max-w-5xl mx-auto">
          <div className="bg-foreground/10 backdrop-blur-md border border-foreground/20 rounded-full px-4 py-3 md:px-5 md:py-2">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer flex-shrink-0"
              >
                <StaffDigitalLogo variant="full" size="sm" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  if (item.dropdown === "services") {
                    const isActive = isNavItemActive(item)
                    return (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={handleServicesEnter}
                        onMouseLeave={handleServicesLeave}
                      >
                        <button
                          className={`flex items-center gap-1 transition-all duration-200 text-sm font-medium cursor-pointer px-3 py-2 rounded-full ${
                            isActive 
                              ? "text-foreground bg-foreground/10" 
                              : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                          }`}
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                        >
                          {item.label}
                          <ChevronDown
                            size={13}
                            className={`transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Services Dropdown */}
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
                            isServicesOpen
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 -translate-y-2 pointer-events-none"
                          }`}
                        >
                          <div
                            className="bg-white dark:bg-slate-900/95 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[20px] shadow-2xl w-[760px] overflow-hidden"
                            style={{ boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.25)" }}
                          >
                            <div className="p-6">
                              {/* Three functional categories: Agentes · Canales · Automatización.
                                  Per PR #81: no "Request free demo" CTA in the dropdown; the
                                  nav header already carries the single "Pedir Demo" button. */}
                              {(["agentes", "canales", "automatizacion"] as const).map((cat) => {
                                const groupLabel = t(`services_group_${cat}`)
                                const items = services.filter(s => s.category === cat)
                                return (
                                  <div key={cat} className="mb-5 last:mb-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-white/40 mb-2">
                                      {groupLabel}
                                    </p>
                                    <div className="grid grid-cols-2 gap-1">
                                      {items.map((service) => {
                                        const Icon = service.icon
                                        return (
                                          <Link
                                            key={service.slug}
                                            href={cptPath("/soluciones", service.slug, activeLocale, SERVICE_SLUGS)}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 group"
                                            onClick={() => setIsServicesOpen(false)}
                                          >
                                            <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-white/10 group-hover:border-gray-300 dark:group-hover:border-white/20 transition-all duration-200 flex-shrink-0">
                                              <Icon size={16} className="text-gray-500 dark:text-white/60 group-hover:text-brand-secondary dark:group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="min-w-0">
                                              <p className="text-sm font-medium text-gray-900 dark:text-white/90 group-hover:text-brand-secondary dark:group-hover:text-white transition-colors truncate">
                                                {service.name}
                                              </p>
                                              <p className="text-[11px] text-gray-400 dark:text-white/35 group-hover:text-gray-600 dark:group-hover:text-white/55 transition-colors truncate">
                                                {service.description}
                                              </p>
                                            </div>
                                          </Link>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )
                              })}

                              {/* Footer link: "View all solutions" kept (not in the removed CTAs). */}
                              <Link
                                href="/soluciones"
                                className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/15 text-gray-700 dark:text-white/75 font-medium text-sm hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/25 transition-all duration-200"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                {t("services_cta_view_all")}
                                <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  if (item.dropdown === "sectors") {
                    const isActive = isNavItemActive(item)
                    return (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={handleSectorsEnter}
                        onMouseLeave={handleSectorsLeave}
                      >
                        <button
                          className={`flex items-center gap-1 transition-all duration-200 text-sm font-medium cursor-pointer px-3 py-2 rounded-full ${
                            isActive 
                              ? "text-foreground bg-foreground/10" 
                              : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                          }`}
                          onClick={() => setIsSectorsOpen(!isSectorsOpen)}
                        >
                          {item.label}
                          <ChevronDown
                            size={13}
                            className={`transition-transform duration-200 ${isSectorsOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Sectors Dropdown */}
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
                            isSectorsOpen
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 -translate-y-2 pointer-events-none"
                          }`}
                        >
                          <div
                            className="bg-white dark:bg-slate-900/95 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[20px] shadow-2xl w-[760px] overflow-hidden"
                            style={{ boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.25)" }}
                          >
                            <div className="p-6">
                              {/* Featured sectors (4) — larger cards at the top. */}
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-white/40 mb-2">
                                {t("sectors_group_featured")}
                              </p>
                              <div className="grid grid-cols-2 gap-2 mb-5">
                                {sectors.filter(s => s.featured).map((sector) => {
                                  const Icon = sector.icon
                                  return (
                                    <Link
                                      key={sector.slug}
                                      href={cptPath("/sectores", sector.slug, activeLocale, SECTOR_SLUGS)}
                                      className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 border border-brand-secondary/20 hover:border-brand-secondary/40 transition-all duration-200 group"
                                      onClick={() => setIsSectorsOpen(false)}
                                    >
                                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-gradient-from to-brand-primary">
                                        <Icon size={18} className="text-white" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand-secondary dark:group-hover:text-white transition-colors truncate">
                                          {sector.name}
                                        </p>
                                        <p className="text-[12px] text-gray-500 dark:text-white/50 group-hover:text-gray-700 dark:group-hover:text-white/70 transition-colors truncate">
                                          {sector.description}
                                        </p>
                                      </div>
                                      <ArrowRight size={14} className="text-gray-400 dark:text-white/40 group-hover:text-brand-secondary group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                  )
                                })}
                              </div>

                              {/* All other sectors (15) — compact 3-col alphabetical grid. */}
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-white/40 mb-2">
                                {t("sectors_group_all")}
                              </p>
                              <div className="grid grid-cols-3 gap-1">
                                {sectors.filter(s => !s.featured).map((sector) => {
                                  const Icon = sector.icon
                                  return (
                                    <Link
                                      key={sector.slug}
                                      href={cptPath("/sectores", sector.slug, activeLocale, SECTOR_SLUGS)}
                                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 group"
                                      onClick={() => setIsSectorsOpen(false)}
                                    >
                                      <div className="w-7 h-7 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-white/10 flex-shrink-0">
                                        <Icon size={13} className="text-gray-500 dark:text-white/60 group-hover:text-brand-secondary dark:group-hover:text-white transition-colors" />
                                      </div>
                                      <p className="text-xs font-medium text-gray-800 dark:text-white/85 group-hover:text-brand-secondary dark:group-hover:text-white transition-colors truncate">
                                        {sector.name}
                                      </p>
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  const isActive = isNavItemActive(item)
                  // Check if it's an internal page link (starts with /) vs anchor link (starts with #)
                  const isPageLink = item.href.startsWith("/")
                  
                  if (isPageLink) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`transition-all duration-200 text-sm font-medium cursor-pointer px-3 py-2 rounded-full ${
                          isActive 
                            ? "text-foreground bg-foreground/10" 
                            : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  }
                  
                  return (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className={`transition-all duration-200 text-sm font-medium cursor-pointer px-3 py-2 rounded-full ${
                        isActive 
                          ? "text-foreground bg-foreground/10" 
                          : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>

              {/* Right side: Theme + Language + CTA */}
              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                {/* Theme Switcher */}
                <ThemeSwitcher />
                
                {/* Language Selector */}
                <div
                  className="relative"
                  onMouseEnter={handleLangEnter}
                  onMouseLeave={handleLangLeave}
                >
                  <button
                    className="flex items-center gap-1.5 text-foreground/60 hover:text-foreground transition-all duration-200 text-sm cursor-pointer px-2.5 py-2 rounded-full hover:bg-foreground/5"
                    onClick={() => setIsLangOpen(!isLangOpen)}
                  >
                    <Globe size={14} className="flex-shrink-0" />
                    <span className="uppercase text-xs font-semibold tracking-wider">{currentLang}</span>
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`absolute top-full right-0 pt-3 transition-all duration-200 ${
                      isLangOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 shadow-2xl min-w-[140px]">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            switchLocale(lang.code as "es" | "pt" | "en")
                            setCurrentLang(lang.code)
                            setIsLangOpen(false)
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            currentLang === lang.code
                              ? "bg-white/10 text-white font-medium"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span>{lang.label}</span>
                          {currentLang === lang.code && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  className="relative text-white font-medium px-5 py-1.5 rounded-full flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group text-sm"
                  style={{ backgroundImage: "linear-gradient(to right, rgb(0, 120, 170), rgb(124, 58, 237) 50%, rgb(0, 120, 170))", backgroundSize: "200% 100%" }}
                  onClick={() => scrollToSection("#contact")}
                >
                  <span className="mr-1.5">{t("cta")}</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  setIsOpen(!isOpen)
                  if (isOpen) {
                    setIsMobileServicesOpen(false)
                    setIsMobileSectorsOpen(false)
                    setIsMobileLangOpen(false)
                  }
                }}
                className="md:hidden text-foreground hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => {
              setIsOpen(false)
              setIsMobileServicesOpen(false)
              setIsMobileSectorsOpen(false)
              setIsMobileLangOpen(false)
            }}
            style={{ top: "0", left: "0", right: "0", bottom: "0", zIndex: -1 }}
          />

          <div
            className={`mt-2 w-[92vw] max-w-xs mx-auto transition-all duration-500 ease-out transform-gpu ${
              isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-foreground/10 backdrop-blur-md border border-foreground/20 rounded-2xl p-4 shadow-2xl max-h-[75vh] overflow-y-auto">
              <div className="flex flex-col space-y-0.5">
                {navItems.map((item) => {
                  if (item.dropdown === "services") {
                    const isActive = isNavItemActive(item)
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className={`w-full flex items-center justify-between rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer ${
                            isActive 
                              ? "text-foreground bg-foreground/10" 
                              : "text-foreground/80 hover:text-foreground hover:bg-foreground/10"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isMobileServicesOpen ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="pl-2 pb-2">
                            {(["agentes", "canales", "automatizacion"] as const).map((cat) => (
                              <div key={cat} className="mb-3 last:mb-0">
                                <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
                                  {t(`services_group_${cat}`)}
                                </p>
                                <div className="space-y-0.5">
                                  {services.filter(s => s.category === cat).map((service) => {
                                    const Icon = service.icon
                                    return (
                                      <Link
                                        key={service.slug}
                                        href={cptPath("/soluciones", service.slug, activeLocale, SERVICE_SLUGS)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-foreground/10 transition-all duration-200 group"
                                        onClick={() => {
                                          setIsOpen(false)
                                          setIsMobileServicesOpen(false)
                                        }}
                                      >
                                        <Icon size={16} className="text-foreground/50 group-hover:text-foreground/80 transition-colors flex-shrink-0" />
                                        <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                                          {service.name}
                                        </span>
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  }

                  if (item.dropdown === "sectors") {
                    const isActive = isNavItemActive(item)
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() => setIsMobileSectorsOpen(!isMobileSectorsOpen)}
                          className={`w-full flex items-center justify-between rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer ${
                            isActive 
                              ? "text-foreground bg-foreground/10" 
                              : "text-foreground/80 hover:text-foreground hover:bg-foreground/10"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${isMobileSectorsOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isMobileSectorsOpen ? "max-h-[820px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="pl-2 pb-2">
                            {(["featured", "all"] as const).map((group) => {
                              const items = group === "featured"
                                ? sectors.filter(s => s.featured)
                                : sectors.filter(s => !s.featured)
                              return (
                                <div key={group} className="mb-3 last:mb-0">
                                  <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
                                    {t(`sectors_group_${group}`)}
                                  </p>
                                  <div className="space-y-0.5">
                                    {items.map((sector) => {
                                      const Icon = sector.icon
                                      return (
                                        <Link
                                          key={sector.slug}
                                          href={cptPath("/sectores", sector.slug, activeLocale, SECTOR_SLUGS)}
                                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-foreground/10 transition-all duration-200 group"
                                          onClick={() => {
                                            setIsOpen(false)
                                            setIsMobileSectorsOpen(false)
                                          }}
                                        >
                                          <Icon size={16} className="text-foreground/50 group-hover:text-foreground/80 transition-colors flex-shrink-0" />
                                          <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                                            {sector.name}
                                          </span>
                                        </Link>
                                      )
                                    })}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  }

                  const isActive = isNavItemActive(item)
                  // Check if it's an internal page link (starts with /) vs anchor link (starts with #)
                  const isPageLink = item.href.startsWith("/")
                  
                  if (isPageLink) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer block ${
                          isActive 
                            ? "text-foreground bg-foreground/10" 
                            : "text-foreground/80 hover:text-foreground hover:bg-foreground/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  }
                  
                  return (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className={`rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer ${
                        isActive 
                          ? "text-foreground bg-foreground/10" 
                          : "text-foreground/80 hover:text-foreground hover:bg-foreground/10"
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}

                {/* Mobile Theme Switcher */}
                <div className="h-px bg-foreground/10 my-1" />
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-foreground/60">Theme</span>
                  <ThemeSwitcher variant="minimal" />
                </div>
                
                {/* Mobile Language Selector */}
                <div className="h-px bg-foreground/10 my-1" />
                <button
                  onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                  className="w-full flex items-center justify-between text-foreground/60 hover:text-foreground hover:bg-foreground/10 rounded-lg px-3 py-3 text-left transition-all duration-300 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Globe size={15} />
                    <span className="text-sm">{selectedLang?.label}</span>
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isMobileLangOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isMobileLangOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-2 space-y-0.5 pb-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          switchLocale(lang.code as "es" | "pt" | "en")
                          setCurrentLang(lang.code)
                          setIsMobileLangOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          currentLang === lang.code
                            ? "bg-foreground/10 text-foreground font-medium"
                            : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                        }`}
                      >
                        <span>{lang.label}</span>
                        {currentLang === lang.code && (
                          <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-foreground/10 my-1" />
                <button
                  className="relative text-white font-medium px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group"
                  style={{ backgroundImage: "linear-gradient(to right, rgb(0, 120, 170), rgb(124, 58, 237) 50%, rgb(0, 120, 170))", backgroundSize: "200% 100%" }}
                  onClick={() => scrollToSection("#contact")}
                >
                  <span className="mr-2">Empezar</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
