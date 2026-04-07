"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, Check, Phone, MessageSquare, Globe, Shield, Home, BarChart3, FileText, Megaphone, Zap, Bot, Users, Headphones, Calendar, Mail, Database, Settings, Cpu, Sparkles, Clock, Target, PiggyBank, Plug, TrendingUp, CheckCircle, FolderOpen, Scan, Repeat, LayoutDashboard, Star, Play } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useFormModals } from "@/components/contact-form-modals"
import type { WPService } from "@/lib/wordpress"
import { stripHtml } from "@/lib/wordpress"

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Phone,
  MessageSquare,
  Globe,
  Shield,
  Home,
  BarChart3,
  FileText,
  Megaphone,
  Zap,
  Bot,
  Users,
  Headphones,
  Calendar,
  Mail,
  Database,
  Settings,
  Cpu,
  Sparkles,
  Clock,
  Target,
  PiggyBank,
  Plug,
  TrendingUp,
  CheckCircle,
  FolderOpen,
  Scan,
  Repeat,
  LayoutDashboard,
  Star,
  Check,
}

interface TOCItem {
  id: string
  text: string
}

interface DynamicServiceClientProps {
  service: WPService
}

// Stats data for solution pages
const solutionStats = [
  { value: "24/7", label: "Atención sin interrupciones" },
  { value: "60-80%", label: "Reducción de costes" },
  { value: "92%", label: "Satisfacción del cliente" },
]

// Other solutions for navigation
const otherSolutions = [
  { label: "IA para Call Center", href: "/soluciones/atencion-telefonica-ia", slug: "atencion-telefonica-ia" },
  { label: "WhatsApp IA", href: "/soluciones/whatsapp-ia-empresas", slug: "whatsapp-ia-empresas" },
  { label: "Chat Web IA", href: "/soluciones/agente-chat-web-ia", slug: "agente-chat-web-ia" },
  { label: "Ventas con IA", href: "/soluciones/agente-ventas-ia", slug: "agente-ventas-ia" },
  { label: "Soporte IA", href: "/soluciones/agente-soporte-ia", slug: "agente-soporte-ia" },
  { label: "Agendamiento IA", href: "/soluciones/agente-agendamientos-ia", slug: "agente-agendamientos-ia" },
  { label: "LeadGen IA", href: "/soluciones/lead-generation-ia", slug: "lead-generation-ia" },
  { label: "CRM Automation", href: "/soluciones/crm-automation-ia", slug: "crm-automation-ia" },
]

export function DynamicServiceClient({ service }: DynamicServiceClientProps) {
  const { openContactForm } = useFormModals()
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  const title = stripHtml(service.title.rendered)
  const excerpt = stripHtml(service.excerpt.rendered)

  // Extract H2s from content for TOC
  useEffect(() => {
    if (contentRef.current) {
      const h2s = contentRef.current.querySelectorAll("h2")
      const items: TOCItem[] = []
      h2s.forEach((h2, index) => {
        const id = `section-${index}`
        h2.id = id
        items.push({ id, text: h2.textContent || "" })
      })
      setTocItems(items)
      if (items.length > 0) setActiveId(items[0].id)
    }
  }, [service.content.rendered])

  // Scroll spy for TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    )

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -100
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }, [])

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
    <div className="min-h-screen bg-white dark:bg-black">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO (centrado, full-width)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-black pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* H1 */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance text-gray-900 dark:text-gray-50">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-6">
            {excerpt}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={openContactForm}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-white text-gray-900 border border-gray-300 dark:border-gray-600 font-medium text-[15px] transition-all duration-200 hover:bg-gray-50 cursor-pointer"
            >
              Pedir Demo
            </button>
            <a
              href="tel:+34931229129"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium text-[15px] transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: "rgb(0, 120, 170)" }}
            >
              <Phone size={16} />
              Escucha la voz IA
            </a>
          </div>

          {/* Video Placeholder */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div 
              className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-[rgb(61,61,64)]"
              style={{ 
                background: "linear-gradient(135deg, rgba(0, 120, 170, 0.1), rgba(124, 58, 237, 0.1))"
              }}
            >
              {/* Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/80 dark:bg-white/20 backdrop-blur flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">
                  <Play size={28} className="text-gray-900 dark:text-white ml-1" fill="currentColor" />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">Video Demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — STATS BAR
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-black border-y border-gray-200 dark:border-[rgb(61,61,64)] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {solutionStats.map((stat, index) => (
              <div key={index} className="flex items-center">
                {/* Stat */}
                <div className="text-center px-8 py-4 md:py-0">
                  <p 
                    className="text-4xl md:text-5xl font-bold"
                    style={{ 
                      background: "linear-gradient(135deg, rgb(0, 120, 170), rgb(124, 58, 237))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                </div>
                {/* Divider (except last) */}
                {index < solutionStats.length - 1 && (
                  <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-[rgb(61,61,64)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — CONTENT + SIDEBAR
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-black px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content (65%) */}
            <div className="lg:w-[65%]">
              <div 
                ref={contentRef}
                className="wp-content prose prose-gray dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: service.content.rendered }}
              />
            </div>

            {/* Sidebar (35%) */}
            <aside className="lg:w-[35%]">
              <div className="lg:sticky lg:top-28 space-y-5">
                {/* Table of Contents */}
                {tocItems.length > 0 && (
                  <nav
                    className="p-6 rounded-2xl bg-white dark:bg-[rgba(255,255,255,0.03)] border border-gray-200 dark:border-[rgb(61,61,64)]"
                    style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)" }}
                    aria-label="Índice de contenido"
                  >
                    <p className="text-xs uppercase tracking-wider font-semibold mb-4 text-gray-500 dark:text-gray-500">
                      En esta página
                    </p>
                    <ul className="space-y-1">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full text-left py-2 text-sm transition-all duration-200 cursor-pointer ${
                              activeId === item.id
                                ? "text-[rgb(0,120,170)] font-medium border-l-2 border-[rgb(0,120,170)] pl-3"
                                : "text-gray-600 dark:text-gray-400 hover:text-[rgb(0,120,170)] pl-0"
                            }`}
                          >
                            {item.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {/* Demo CTA Card */}
                <div
                  className="p-6 rounded-2xl bg-gradient-to-br from-[rgba(0,120,170,0.05)] to-[rgba(124,58,237,0.05)] dark:from-[rgba(0,120,170,0.1)] dark:to-[rgba(124,58,237,0.1)] border border-[rgba(0,120,170,0.2)] dark:border-[rgba(0,120,170,0.3)]"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-50">
                    ¿Listo para empezar?
                  </h3>
                  <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                    Configura tu agente IA en menos de 48h
                  </p>
                  <button
                    onClick={openContactForm}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90 cursor-pointer"
                    style={{ background: "linear-gradient(135deg, rgb(0, 120, 170), rgb(124, 58, 237))" }}
                  >
                    Solicitar Demo
                    <ArrowRight size={16} />
                  </button>
                  <p className="text-xs text-center mt-3 text-gray-500 dark:text-gray-500">
                    o llámanos: +34 931 229 129
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — TECH LOGOS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-black px-4 py-12 border-y border-gray-200 dark:border-[rgb(61,61,64)]">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs uppercase tracking-wider mb-8 text-gray-500 dark:text-gray-500">
            Tecnología que impulsa nuestros agentes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {[
              { src: "/images/partners/openai.svg", alt: "OpenAI" },
              { src: "/images/partners/anthropic.svg", alt: "Anthropic" },
              { src: "/images/partners/google-cloud.svg", alt: "Google Cloud" },
              { src: "/images/partners/twilio.svg", alt: "Twilio" },
              { src: "/images/partners/salesforce.svg", alt: "Salesforce" },
            ].map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-6 sm:h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 dark:brightness-0 dark:invert dark:opacity-40 dark:hover:brightness-100 dark:hover:invert-0 dark:hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — OTHER SOLUTIONS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-black px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
              Otras Soluciones
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Descubre más formas de transformar tu negocio con IA
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {otherSolutions
              .filter((s) => s.slug !== service.slug)
              .slice(0, 6)
              .map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 bg-white dark:bg-[rgba(255,255,255,0.03)] border border-gray-200 dark:border-[rgb(61,61,64)] text-gray-700 dark:text-gray-300 hover:border-[rgb(0,120,170)] hover:text-[rgb(0,120,170)] hover:bg-[rgba(0,120,170,0.05)] dark:hover:border-[rgb(0,120,170)] dark:hover:text-[rgb(0,120,170)] dark:hover:bg-[rgba(0,120,170,0.1)]"
                >
                  {s.label}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — FINAL CTA
          ═══════════════════════════════════════════════════════════════════════ */}
      <section 
        className="px-4 py-20 border-t border-gray-200 dark:border-[rgb(61,61,64)]"
        style={{ 
          background: "linear-gradient(to bottom right, rgba(0, 120, 170, 0.05), transparent, rgba(124, 58, 237, 0.05))"
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">¿Listo para transformar la </span>
            <span 
              style={{ 
                background: "linear-gradient(135deg, rgb(0, 120, 170), rgb(124, 58, 237))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              atención al cliente
            </span>
            <span className="text-gray-900 dark:text-white">?</span>
          </h2>
          <p className="text-lg mb-8 text-gray-500 dark:text-gray-400">
            Agenda una demo gratuita y descubre cómo los agentes IA pueden revolucionar tu negocio
          </p>
          <button
            onClick={openContactForm}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-white font-medium text-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer"
            style={{ background: "linear-gradient(135deg, rgb(0, 120, 170), rgb(124, 58, 237))" }}
          >
            Habla con un Experto
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WORDPRESS CONTENT STYLES
          ═══════════════════════════════════════════════════════════════════════ */}
      <style jsx global>{`
        /* WordPress Content Styling - Light Mode */
        .wp-content h2 {
          font-size: 28px;
          font-weight: 700;
          color: rgb(17, 24, 39);
          margin-top: 48px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid rgb(229, 231, 235);
        }
        
        .wp-content h2:first-child {
          margin-top: 0;
        }

        .wp-content h3 {
          font-size: 22px;
          font-weight: 600;
          color: rgb(17, 24, 39);
          margin-top: 32px;
          margin-bottom: 16px;
        }

        .wp-content p {
          font-size: 16px;
          line-height: 1.75;
          color: rgb(75, 85, 99);
          margin-bottom: 20px;
        }

        .wp-content ul {
          list-style: none;
          padding-left: 0;
          margin-bottom: 24px;
        }

        .wp-content ul li {
          position: relative;
          padding-left: 32px;
          margin-bottom: 12px;
          font-size: 16px;
          line-height: 1.6;
          color: rgb(75, 85, 99);
        }

        .wp-content ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 4px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(0, 120, 170), rgb(124, 58, 237));
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
        }

        .wp-content ol {
          list-style: none;
          padding-left: 0;
          margin-bottom: 24px;
          counter-reset: ol-counter;
        }

        .wp-content ol li {
          position: relative;
          padding-left: 40px;
          margin-bottom: 16px;
          font-size: 16px;
          line-height: 1.6;
          color: rgb(75, 85, 99);
          counter-increment: ol-counter;
        }

        .wp-content ol li::before {
          content: counter(ol-counter);
          position: absolute;
          left: 0;
          top: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(0, 120, 170), rgb(124, 58, 237));
          color: white;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wp-content blockquote {
          border-left: 4px solid rgb(0, 120, 170);
          padding-left: 24px;
          margin: 32px 0;
          font-style: italic;
          color: rgb(75, 85, 99);
        }

        .wp-content a {
          color: rgb(0, 120, 170);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .wp-content a:hover {
          color: rgb(124, 58, 237);
        }

        .wp-content strong {
          font-weight: 600;
          color: rgb(17, 24, 39);
        }

        /* Dark Mode */
        .dark .wp-content h2 {
          color: rgb(248, 249, 250);
          border-bottom-color: rgb(61, 61, 64);
        }

        .dark .wp-content h3 {
          color: rgb(248, 249, 250);
        }

        .dark .wp-content p {
          color: rgb(163, 163, 163);
        }

        .dark .wp-content ul li,
        .dark .wp-content ol li {
          color: rgb(163, 163, 163);
        }

        .dark .wp-content blockquote {
          color: rgb(163, 163, 163);
        }

        .dark .wp-content strong {
          color: rgb(248, 249, 250);
        }
      `}</style>
    </div>
  )
}
