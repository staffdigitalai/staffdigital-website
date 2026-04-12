"use client"

import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, MapPin } from "lucide-react"
import { StaffDigitalLogoDark } from "@/components/staffdigital-logo"
import { useTranslations } from "next-intl"

const linkHrefs = {
  solutions: [
    "/soluciones/agentes-ia-voz-humana",
    "/soluciones/atencion-telefonica-ia",
    "/soluciones/whatsapp-ia-empresas",
    "/soluciones/lead-generation-ia",
    "/soluciones/agente-soporte-ia",
    "/soluciones",
  ],
  product: [
    "/precios",
    "/tecnologia",
    "/integraciones",
    "/seguridad-compliance",
    "/sectores",
  ],
  company: [
    "/nosotros",
    "/contacto",
    "/partners",
    "/metodologia",
    "/faq",
  ],
  resources: [
    "/blog",
    "/casos-exito",
    "/demo-voice",
    "/demo",
    "/sectores",
  ],
}

const socialLinks = [
  { icon: FacebookIcon, href: "https://www.facebook.com/staffdigitalai", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/staffdigitalai", label: "Instagram" },
  { icon: YoutubeIcon, href: "https://www.youtube.com/@staffdigitalai", label: "Youtube" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/staffdigitalai", label: "LinkedIn" },
]

export function Footer() {
  const t = useTranslations("footer")

  const solutionsTitles = t.raw("solutions_links") as string[]
  const productTitles = t.raw("product_links") as string[]
  const companyTitles = t.raw("company_links") as string[]
  const resourcesTitles = t.raw("resources_links") as string[]

  return (
    <footer className="relative w-full border-t border-foreground/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] dark:bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        {/* 5 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Logo + Slogan + Addresses + Social Icons */}
          <div className="space-y-5 lg:col-span-1">
            <StaffDigitalLogoDark variant="full" size="md" />
            <p className="text-foreground/50 text-sm leading-relaxed">
              {t("slogan")}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                <p className="text-foreground/50 text-sm leading-relaxed">
                  Carrer d&apos;Aragó, 308, 1o 2a<br />
                  08009 Barcelona
                </p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                <p className="text-foreground/50 text-sm leading-relaxed">
                  Av. Afonso Costa 22 B<br />
                  Lisbon Business Center<br />
                  1900-036 Lisboa
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4 text-foreground/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h3 className="text-sm font-medium text-foreground/80 mb-4">{t("col_solutions")}</h3>
            <ul className="space-y-3">
              {solutionsTitles.map((title, i) => (
                <li key={i}>
                  <a
                    href={linkHrefs.solutions[i]}
                    className="text-foreground/50 hover:text-foreground text-sm transition-colors duration-200"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product */}
          <div>
            <h3 className="text-sm font-medium text-foreground/80 mb-4">{t("col_product")}</h3>
            <ul className="space-y-3">
              {productTitles.map((title, i) => (
                <li key={i}>
                  <a
                    href={linkHrefs.product[i]}
                    className="text-foreground/50 hover:text-foreground text-sm transition-colors duration-200"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-medium text-foreground/80 mb-4">{t("col_company")}</h3>
            <ul className="space-y-3">
              {companyTitles.map((title, i) => (
                <li key={i}>
                  <a
                    href={linkHrefs.company[i]}
                    className="text-foreground/50 hover:text-foreground text-sm transition-colors duration-200"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div>
            <h3 className="text-sm font-medium text-foreground/80 mb-4">{t("col_resources")}</h3>
            <ul className="space-y-3">
              {resourcesTitles.map((title, i) => (
                <li key={i}>
                  <a
                    href={linkHrefs.resources[i]}
                    className="text-foreground/50 hover:text-foreground text-sm transition-colors duration-200"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="pt-6 border-t border-foreground/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4">
          <a href="/privacidad" className="text-foreground/40 hover:text-foreground/70 text-xs transition-colors">
            {t("privacy")}
          </a>
          <a href="/aviso-legal" className="text-foreground/40 hover:text-foreground/70 text-xs transition-colors">
            {t("legal")}
          </a>
          <a href="/cookies" className="text-foreground/40 hover:text-foreground/70 text-xs transition-colors">
            {t("cookies")}
          </a>
          <a href="/terminos" className="text-foreground/40 hover:text-foreground/70 text-xs transition-colors">
            {t("terms")}
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/40 text-sm" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} StaffDigital AI. {t("rights")}
          </p>
          <p className="text-foreground/40 text-sm">
            {t("dev_by")}{" "}
            <a
              href="https://www.webdesignvip.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground/70 transition-colors"
            >
              Web Design VIP
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
