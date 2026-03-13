"use client"

import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, MapPin } from "lucide-react"
import { StaffDigitalLogoDark } from "@/components/staffdigital-logo"

const productLinks = [
  { title: "Funcionalidades", href: "/#funcionalidades" },
  { title: "Equipo IA", href: "/#equipo-ia" },
  { title: "Calculadora ROI", href: "/#calculadora" },
  { title: "Integracion", href: "/#integracion" },
]

const empresaLinks = [
  { title: "Sobre Nosotros", href: "/sobre-nosotros" },
  { title: "Contacto", href: "/contacto" },
  { title: "Politica de Privacidad", href: "/privacidad" },
  { title: "Terminos de Servicio", href: "/terminos" },
]

const recursosLinks = [
  { title: "Blog", href: "/blog" },
  { title: "Casos de Exito", href: "/casos" },
  { title: "Documentacion", href: "/docs" },
  { title: "Soporte", href: "/soporte" },
]

const socialLinks = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: YoutubeIcon, href: "#", label: "Youtube" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Column 1: Logo + Slogan + Addresses + Social Icons */}
          <div className="space-y-5">
            <StaffDigitalLogoDark variant="full" size="md" />
            <p className="text-white/50 text-sm leading-relaxed">
              Automatizacion IA para empresas. Chat inteligente, flujos de trabajo y automatizaciones.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <p className="text-white/50 text-sm leading-relaxed">
                  Carrer d&apos;Arago, 308, 1o 2a<br />
                  08009 Barcelona
                </p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <p className="text-white/50 text-sm leading-relaxed">
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
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4 text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Producto */}
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-4">Producto</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Empresa */}
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-4">Empresa</h3>
            <ul className="space-y-3">
              {empresaLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Recursos */}
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-4">Recursos</h3>
            <ul className="space-y-3">
              {recursosLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} StaffDigital AI. Todos los derechos reservados.
          </p>
          <p className="text-white/40 text-sm">
            Desarrollo Web por{" "}
            <a
              href="https://www.webdesignvip.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              Web Design VIP
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
