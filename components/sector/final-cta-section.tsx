"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { useFormModals } from "@/components/contact-form-modals"

interface FinalCtaSectionProps {
  title: string
  subtitle: string
  ctaLabel: string
  sectorName: string
  placeholderEmail?: string
}

export function SectorFinalCtaSection({
  title,
  subtitle,
  ctaLabel,
  sectorName,
  placeholderEmail = "tu@email.com",
}: FinalCtaSectionProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const { openContactForm } = useFormModals()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return
    // Trigger full contact form modal pre-filled (or ideally API call)
    openContactForm()
    setSubmitted(true)
  }

  return (
    <section
      aria-labelledby="sector-final-cta-title"
      className="px-4 sm:px-6 py-20 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div
          className="relative rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0078AA 0%, #5B21B6 100%)",
            boxShadow: "0 20px 60px rgba(0,120,170,0.25), 0 40px 80px rgba(124,58,237,0.2)",
          }}
        >
          {/* Decorative blur orbs */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative text-center text-white">
            <h2
              id="sector-final-cta-title"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance leading-tight tracking-tight"
            >
              {title}
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              {subtitle}
            </p>

            {submitted ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm">
                <Check size={18} className="text-emerald-300" aria-hidden="true" />
                <span className="text-sm font-medium">Gracias. Te contactaremos en breve.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
                aria-label={`Pedir demo para ${sectorName}`}
              >
                <label htmlFor="final-cta-email" className="sr-only">
                  Email
                </label>
                <input
                  id="final-cta-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholderEmail}
                  className="w-full flex-1 px-5 py-3.5 rounded-full text-white bg-white/10 border border-white/25 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/50 backdrop-blur-sm text-sm"
                  aria-label="Introduce tu email"
                />
                <button
                  type="submit"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-[#0078AA] bg-white hover:bg-white/95 hover:scale-[1.02] transition-all shrink-0"
                  aria-label={`${ctaLabel} para ${sectorName}`}
                >
                  {ctaLabel}
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </button>
              </form>
            )}

            <p className="mt-6 text-xs text-white/50 tracking-wide">
              Sin compromiso · Implementación llave en mano · Respuesta en 24h
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
