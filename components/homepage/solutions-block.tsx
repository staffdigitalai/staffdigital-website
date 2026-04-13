"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

interface SolutionItem {
  label: string
  href: string
}

interface Category {
  name: string
  items: SolutionItem[]
}

export function SolutionsBlock() {
  const t = useTranslations("solutions_explore")

  const categories = t.raw("categories") as Category[]

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      {/* Subtle background */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,120,170,0.04) 0%, transparent 60%)",
        }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Title — Editorial */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 text-foreground leading-tight tracking-tight">
          {t("title")}
        </h2>

        {/* 3 Columns — Premium cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="p-6 sm:p-8 rounded-2xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.06] dark:border-white/[0.08]"
            >
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-6 pb-4 border-b border-foreground/[0.08] dark:border-white/[0.1]">
                {category.name}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-foreground/55 hover:text-[#0078AA] dark:hover:text-[#00D4FF] text-sm sm:text-[0.9375rem] transition-all duration-200 group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA — Premium button */}
        <div className="text-center mt-14 sm:mt-16">
          <Link
            href="/soluciones"
            className="group relative inline-flex items-center gap-2.5 rounded-full px-8 sm:px-10 py-4 text-base font-semibold text-white transition-all duration-500 hover:scale-[1.03] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0078AA 0%, #5B21B6 100%)",
              boxShadow: "0 4px 20px rgba(0,120,170,0.3), 0 8px 32px rgba(91,33,182,0.2)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("cta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              style={{ background: "linear-gradient(135deg, #0090CC 0%, #7C3AED 100%)" }} 
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
