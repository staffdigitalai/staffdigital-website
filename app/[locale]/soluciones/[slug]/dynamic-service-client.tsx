"use client"

import Link from "next/link"
import { 
  Play, 
  ChevronRight, 
  Phone, 
  MessageSquare, 
  Globe, 
  Check,
  ArrowRight,
  Building2,
  Headphones,
  Calendar,
  ShoppingCart,
  Stethoscope,
  Home,
  GraduationCap,
  Wrench,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Bot
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useFormModals } from "@/components/contact-form-modals"
import type { WPService } from "@/lib/wordpress"
import { stripHtml } from "@/lib/wordpress"

// Service icon mapping
const serviceIcons: Record<string, LucideIcon> = {
  "atencion-telefonica-ia": Phone,
  "whatsapp-ia-empresas": MessageSquare,
  "agente-chat-web-ia": Globe,
  "agente-ventas-ia": TrendingUp,
  "agente-soporte-ia": Headphones,
  "agente-agendamientos-ia": Calendar,
  "lead-generation-ia": Users,
  "crm-automation-ia": Building2,
}

// Stats data
const solutionStats = [
  { value: "24/7", label: "Atención continua" },
  { value: "80%", label: "Reducción de costes" },
  { value: "92%", label: "Satisfacción cliente" },
]

// Channels data
const channels = [
  { icon: Phone, name: "Llamadas Telefónicas", desc: "Voz natural con latencia mínima. Atiende y realiza llamadas 24/7." },
  { icon: MessageSquare, name: "WhatsApp Business", desc: "Respuestas instantáneas con contexto completo del cliente." },
  { icon: Globe, name: "Chat Web", desc: "Widget integrado en tu web con el mismo agente IA." },
]

// Features data
const features = [
  { icon: Bot, text: "Agente IA con voz humana natural" },
  { icon: Clock, text: "Disponibilidad 24/7 sin interrupciones" },
  { icon: Shield, text: "Datos protegidos bajo GDPR" },
  { icon: Zap, text: "Integración en menos de 48h" },
  { icon: Users, text: "Escalado automático según demanda" },
  { icon: TrendingUp, text: "Analytics y métricas en tiempo real" },
]

// Benefits data
const benefits = [
  "Reduce costes operativos hasta un 80% en atención al cliente",
  "Elimina tiempos de espera: respuestas instantáneas 24/7",
  "Aumenta la satisfacción del cliente con interacciones naturales",
  "Escala tu equipo sin límites de contratación",
  "Libera a tu equipo humano para tareas de alto valor",
  "Integración perfecta con tu CRM y herramientas existentes",
]

// Sectors data
const sectors = [
  { name: "Concesionarios", icon: Building2 },
  { name: "Clínicas", icon: Stethoscope },
  { name: "Inmobiliarias", icon: Home },
  { name: "Restaurantes", icon: ShoppingCart },
  { name: "E-commerce", icon: ShoppingCart },
  { name: "Turismo", icon: Globe },
  { name: "Educación", icon: GraduationCap },
  { name: "Servicios Locales", icon: Wrench },
]

// Other solutions
const otherSolutions = [
  { label: "IA para Call Center", href: "/soluciones/atencion-telefonica-ia", slug: "atencion-telefonica-ia" },
  { label: "WhatsApp IA", href: "/soluciones/whatsapp-ia-empresas", slug: "whatsapp-ia-empresas" },
  { label: "Chat Web IA", href: "/soluciones/agente-chat-web-ia", slug: "agente-chat-web-ia" },
  { label: "Ventas con IA", href: "/soluciones/agente-ventas-ia", slug: "agente-ventas-ia" },
  { label: "Soporte IA", href: "/soluciones/agente-soporte-ia", slug: "agente-soporte-ia" },
  { label: "Agendamiento IA", href: "/soluciones/agente-agendamientos-ia", slug: "agente-agendamientos-ia" },
]

// Testimonial data
const testimonial = {
  quote: "Desde que implementamos el agente IA de StaffDigital, hemos reducido un 75% las llamadas perdidas y aumentado las conversiones en un 40%.",
  author: "María García",
  role: "Directora de Operaciones",
  company: "AutoPremium Madrid",
}

interface DynamicServiceClientProps {
  service: WPService
}

export function DynamicServiceClient({ service }: DynamicServiceClientProps) {
  const { openContactForm } = useFormModals()
  
  const title = stripHtml(service.title.rendered)
  const excerpt = stripHtml(service.excerpt.rendered)
  const ServiceIcon = serviceIcons[service.slug] || Phone

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://staffdigital.ai" },
      { "@type": "ListItem", position: 2, name: "Soluciones", item: "https://staffdigital.ai/soluciones" },
      { "@type": "ListItem", position: 3, name: title, item: `https://staffdigital.ai/soluciones/${service.slug}` },
    ],
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ═══════════════════════════════════════
          SECCIÓN 1 — BREADCRUMB
          ═══════════════════════════════════════ */}
      <nav className="pt-28 pb-4 px-4 max-w-6xl mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Inicio
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <li>
            <Link href="/soluciones" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Soluciones
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <li className="text-gray-900 dark:text-white font-medium">
            {title}
          </li>
        </ol>
      </nav>

      {/* ═══════════════════════════════════════
          SECCIÓN 2 — HERO (centrado)
          ═══════════════════════════════════════ */}
      <section className="px-4 pt-8 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
            {excerpt}
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={openContactForm}
              className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] text-white rounded-lg px-6 py-3 font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Pedir Demo
            </button>
            <a
              href="tel:+34931229129"
              className="border border-gray-300 dark:border-[rgb(61,61,64)] rounded-lg px-6 py-3 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              Escucha la voz IA
            </a>
          </div>

          {/* Video Placeholder */}
          <div className="mt-12 max-w-5xl mx-auto aspect-video rounded-[20px] border border-gray-200 dark:border-[rgb(61,61,64)] bg-white dark:bg-[rgba(101,101,106,0.16)] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#0078AA] to-[#7C3AED] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm">Video Demo</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 3 — STATS BAR (3 métricas)
          ═══════════════════════════════════════ */}
      <section className="px-4 py-10 border-y border-gray-200 dark:border-[rgb(61,61,64)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0">
          {solutionStats.map((stat, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && (
                <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-[rgb(61,61,64)] mr-12" />
              )}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 4 — CANALES (3 cards)
          ═══════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Un agente, todos los canales
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tu agente IA atiende con la misma calidad en todos los puntos de contacto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {channels.map((channel, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] hover:border-[#0078AA]/50 transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg, #0078AA, #7C3AED)" }}
                >
                  <channel.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{channel.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{channel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 5 — FEATURES (6 cards grid)
          ═══════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Qué incluye esta solución
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Todo lo que necesitas para automatizar la atención al cliente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0078AA]/10 dark:bg-[#0078AA]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-[#0078AA]" />
                </div>
                <p className="text-gray-900 dark:text-white font-medium">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 6 — BENEFICIOS (2 columnas)
          ═══════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Beneficios para tu negocio
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg, #0078AA, #7C3AED)" }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Imagen placeholder */}
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 border border-gray-200 dark:border-[rgb(61,61,64)] flex items-center justify-center">
              <ServiceIcon className="w-24 h-24 text-[#0078AA]/30" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 7 — SECTORES (pills)
          ═══════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ideal para estos sectores
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Agentes IA entrenados con el conocimiento de cada industria
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {sectors.map((sector, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] hover:border-[#0078AA]/50 transition-colors"
              >
                <sector.icon className="w-4 h-4 text-[#0078AA]" />
                <span className="text-gray-900 dark:text-white text-sm font-medium">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 8 — TESTIMONIAL
          ═══════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)]">
            <blockquote className="text-xl md:text-2xl text-gray-900 dark:text-white font-medium text-center mb-8">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0078AA] to-[#7C3AED] flex items-center justify-center text-white font-bold">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 9 — OTRAS SOLUCIONES (pills)
          ═══════════════════════════════════════ */}
      <section className="px-4 py-16 border-t border-gray-200 dark:border-[rgb(61,61,64)]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-gray-500 text-sm uppercase tracking-wider mb-6">
            Otras soluciones IA
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {otherSolutions.filter(s => s.slug !== service.slug).map((s, i) => (
              <Link
                key={i}
                href={s.href}
                className="px-4 py-2 rounded-full bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] text-gray-900 dark:text-white text-sm font-medium hover:border-[#0078AA]/50 transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 10 — CTA FINAL
          ═══════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Listo para automatizar tu atención al cliente?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Agenda una demo personalizada y descubre cómo los agentes IA pueden transformar tu negocio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openContactForm}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0078AA] to-[#7C3AED] text-white rounded-lg px-8 py-4 font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Solicitar Demo Gratuita
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-[rgb(61,61,64)] rounded-lg px-8 py-4 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              Contactar con ventas
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
