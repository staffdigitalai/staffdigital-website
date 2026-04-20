"use client"

import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, MapPin, Mail, Phone } from "lucide-react"
import { StaffDigitalLogoDark } from "@/components/staffdigital-logo"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { SERVICE_SLUGS, cptPath } from "@/lib/cpt-slugs"

// The 5 featured solutions rendered in the footer, in the order that
// matches `footer.solutions_links` in each messages/*.json. These are
// ES master slugs — the real href per active locale is computed at
// render time via cptPath() so /en and /pt get their WPML-translated
// slugs instead of the ES ones (the old hardcoded list 404'd on non-ES
// locales).
const FOOTER_SOLUTION_SLUGS = [
  "agentes-ia-voz-humana",
  "atencion-telefonica-ia",
  "whatsapp-ia-empresas",
  "lead-generation-ia",
  "agente-soporte-ia",
]

// Path fragments (no locale prefix). Prefixed at render time with
// the active locale via `localePrefix` so that /en and /pt footer
// links navigate within the current locale instead of dropping the
// visitor back to the ES root.
const linkHrefs = {
  product: [
    "/tecnologia",
    "/integraciones",
    "/seguridad-compliance",
    "/sectores",
    "/metodologia",
  ],
  company: [
    "/nosotros",
    "/contacto",
    "/partners",
    "/blog",
    "/faq",
  ],
  resources: [
    "/casos-exito",
    "/demo-voice",
    "/demo",
    "/sectores",
  ],
  legal: {
    privacy: "/privacidad",
    legal: "/aviso-legal",
    cookies: "/cookies",
    terms: "/terminos",
  },
}

const socialLinks = [
  { icon: FacebookIcon, href: "https://www.facebook.com/staffdigitalai", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/staffdigitalai", label: "Instagram" },
  { icon: YoutubeIcon, href: "https://www.youtube.com/@staffdigitalai", label: "Youtube" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/staffdigitalai", label: "LinkedIn" },
]

export function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()

  // Locale-aware solutions hrefs: 5 specific services + a final
  // "/soluciones" catch-all that needs its own locale prefix. Matches
  // 1:1 with the 6-entry `footer.solutions_links` i18n array.
  const localePrefix = locale === "es" ? "" : `/${locale}`
  const solutionsHrefs = [
    ...FOOTER_SOLUTION_SLUGS.map((esSlug) =>
      cptPath("/soluciones", esSlug, locale, SERVICE_SLUGS),
    ),
    `${localePrefix}/soluciones`,
  ]

  // Prepend locale to the static hrefs so /en and /pt footer links
  // navigate inside the active locale instead of jumping back to
  // the ES root (the old behaviour 404'd visually by dropping EN/PT
  // users onto /tecnologia, /nosotros, etc. in Spanish).
  const productHrefs = linkHrefs.product.map((p) => `${localePrefix}${p}`)
  const companyHrefs = linkHrefs.company.map((p) => `${localePrefix}${p}`)
  const legalHrefs = {
    privacy: `${localePrefix}${linkHrefs.legal.privacy}`,
    legal: `${localePrefix}${linkHrefs.legal.legal}`,
    cookies: `${localePrefix}${linkHrefs.legal.cookies}`,
    terms: `${localePrefix}${linkHrefs.legal.terms}`,
  }

  const solutionsTitles = t.raw("solutions_links") as string[]
  const productTitles = t.raw("product_links") as string[]
  const companyTitles = t.raw("company_links") as string[]
  const resourcesTitles = t.raw("resources_links") as string[]

  return (
    <footer className="relative w-full">
      {/* Premium top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,120,170,0.2) 20%, rgba(124,58,237,0.2) 80%, transparent 100%)",
        }}
      />
      
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 opacity-50 dark:opacity-30"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,120,170,0.03) 0%, transparent 60%)",
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-12 lg:pt-24 lg:pb-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Logo + Slogan + Contact (spans 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <StaffDigitalLogoDark variant="full" size="md" />
            <p className="text-foreground/50 text-sm sm:text-base leading-relaxed max-w-sm">
              {t("slogan")}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <a 
                href="mailto:info@staffdigital.ai" 
                className="flex items-center gap-3 text-foreground/50 hover:text-foreground/80 text-sm transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.06] flex items-center justify-center group-hover:bg-foreground/[0.08] dark:group-hover:bg-white/[0.1] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                info@staffdigital.ai
              </a>
              <a 
                href="tel:+34931229129" 
                className="flex items-center gap-3 text-foreground/50 hover:text-foreground/80 text-sm transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.06] flex items-center justify-center group-hover:bg-foreground/[0.08] dark:group-hover:bg-white/[0.1] transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                +34 931 229 129
              </a>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-foreground/[0.04] dark:bg-white/[0.06] border border-foreground/[0.06] dark:border-white/[0.08] flex items-center justify-center hover:bg-foreground/[0.08] dark:hover:bg-white/[0.1] hover:border-foreground/[0.12] dark:hover:border-white/[0.15] transition-all duration-200"
                >
                  <social.icon className="w-4 h-4 text-foreground/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-foreground/90 mb-5 tracking-wide">{t("col_solutions")}</h3>
            <ul className="space-y-3.5">
              {solutionsTitles.map((title, i) => (
                <li key={i}>
                  <Link
                    href={solutionsHrefs[i]}
                    className="text-foreground/45 hover:text-foreground/80 text-sm transition-colors duration-200"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product */}
          <div>
            <h3 className="text-sm font-semibold text-foreground/90 mb-5 tracking-wide">{t("col_product")}</h3>
            <ul className="space-y-3.5">
              {productTitles.map((title, i) => (
                <li key={i}>
                  <Link
                    href={productHrefs[i]}
                    className="text-foreground/45 hover:text-foreground/80 text-sm transition-colors duration-200"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground/90 mb-5 tracking-wide">{t("col_company")}</h3>
            <ul className="space-y-3.5">
              {companyTitles.map((title, i) => (
                <li key={i}>
                  <Link
                    href={companyHrefs[i]}
                    className="text-foreground/45 hover:text-foreground/80 text-sm transition-colors duration-200"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Offices */}
          <div>
            <h3 className="text-sm font-semibold text-foreground/90 mb-5 tracking-wide">{t("col_offices") || "Oficinas"}</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-foreground/40" />
                </div>
                <p className="text-foreground/45 text-sm leading-relaxed">
                  Carrer d&apos;Arago, 308<br />
                  08009 Barcelona
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-foreground/40" />
                </div>
                <p className="text-foreground/45 text-sm leading-relaxed">
                  Av. Afonso Costa 22 B<br />
                  1900-036 Lisboa
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-foreground/[0.06] dark:border-white/[0.08]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-foreground/35 text-sm" suppressHydrationWarning>
              &copy; {new Date().getFullYear()} StaffDigital AI. {t("rights")}
            </p>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link href={legalHrefs.privacy} className="text-foreground/35 hover:text-foreground/60 text-sm transition-colors">
                {t("privacy")}
              </Link>
              <Link href={legalHrefs.legal} className="text-foreground/35 hover:text-foreground/60 text-sm transition-colors">
                {t("legal")}
              </Link>
              <Link href={legalHrefs.cookies} className="text-foreground/35 hover:text-foreground/60 text-sm transition-colors">
                {t("cookies")}
              </Link>
              <Link href={legalHrefs.terms} className="text-foreground/35 hover:text-foreground/60 text-sm transition-colors">
                {t("terms")}
              </Link>
            </div>
            
            {/* Dev Credit */}
            <p className="text-foreground/35 text-sm">
              {t("dev_by")}{" "}
              <a
                href="https://www.webdesignvip.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground/60 transition-colors"
              >
                Web Design VIP
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
