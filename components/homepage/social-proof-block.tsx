"use client"

import { useTranslations } from "next-intl"
import { TrendingUp, Clock, Users, Zap, Quote } from "lucide-react"
import Image from "next/image"

const metricIcons = [TrendingUp, Clock, Users, Zap]

export function SocialProofBlock() {
  const t = useTranslations("social_proof")

  const metrics = t.raw("metrics") as { value: string; label: string }[]

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      {/* Premium gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,120,170,0.06) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(124,58,237,0.04) 0%, transparent 50%)",
        }}
      />
      
      {/* Top border accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,120,170,0.15) 30%, rgba(124,58,237,0.15) 70%, transparent 100%)",
        }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section badge */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.03] dark:bg-white/[0.05] border border-foreground/[0.06] dark:border-white/[0.08] text-xs font-semibold tracking-wide text-foreground/60 dark:text-white/60 uppercase">
            {t("badge") || "Resultados reales"}
          </span>
        </div>
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-center mb-16 sm:mb-20 text-foreground leading-[1.1] tracking-tight">
          {t("title")}
        </h2>

        {/* Metrics Grid - Concrete numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20 sm:mb-24">
          {metrics.map((metric, index) => {
            const Icon = metricIcons[index] || TrendingUp
            return (
              <div
                key={index}
                className="relative p-6 sm:p-8 rounded-2xl lg:rounded-3xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.06] dark:border-white/[0.08] text-center group hover:bg-foreground/[0.04] dark:hover:bg-white/[0.05] transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 dark:from-[#0078AA]/15 dark:to-[#7C3AED]/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-[#0078AA] dark:text-[#00D4FF]" />
                </div>
                
                {/* Value - Large and bold */}
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                  {metric.value}
                </div>
                
                {/* Label */}
                <p className="text-sm sm:text-base text-foreground/55 leading-snug">
                  {metric.label}
                </p>
              </div>
            )
          })}
        </div>

        {/* Testimonial Card - Premium design */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-10 md:p-14 rounded-3xl bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.04] dark:from-white/[0.03] dark:to-white/[0.06] border border-foreground/[0.08] dark:border-white/[0.1]">
            {/* Quote icon */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 flex items-center justify-center">
                <Quote className="w-6 h-6 text-[#0078AA] dark:text-[#00D4FF]" />
              </div>
            </div>
            
            {/* Quote text */}
            <blockquote className="relative pt-10 sm:pt-8 text-center sm:text-left sm:pl-16">
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/85 leading-relaxed font-light italic">
                {t("quote")}
              </p>
            </blockquote>
            
            {/* Author section with company */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center sm:justify-start sm:pl-16 gap-4">
              {/* Author info */}
              <div className="flex items-center gap-4">
                {/* Avatar with initials */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">{t("quote_author_initials") || "MG"}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-base">
                    {t("quote_author_name") || "Miguel Garcia"}
                  </p>
                  <p className="text-sm text-foreground/55">
                    {t("quote_author_role") || "Director de Operaciones"}
                  </p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="hidden sm:block w-px h-12 bg-foreground/10 dark:bg-white/10 mx-4" />
              
              {/* Company */}
              <div className="flex items-center gap-3">
                {/* Company logo placeholder - square box */}
                <div className="w-10 h-10 rounded-lg bg-foreground/[0.05] dark:bg-white/[0.08] border border-foreground/[0.08] dark:border-white/[0.12] flex items-center justify-center">
                  <span className="text-xs font-bold text-foreground/40 dark:text-white/40">
                    {t("quote_company_abbr") || "CH"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground/80 text-sm">
                    {t("quote_company") || "Clinica Horizonte"}
                  </p>
                  <p className="text-xs text-foreground/45">
                    {t("quote_company_type") || "Red de clinicas privadas"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
