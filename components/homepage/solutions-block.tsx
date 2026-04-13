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
    <section className="py-20 px-4 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-foreground">
          {t("title")}
        </h2>

        {/* 3 Columns */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-bold text-foreground border-b border-foreground/10 pb-3">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      className="text-foreground/60 hover:text-[#0078AA] dark:hover:text-[var(--neon-blue)] text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/soluciones"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#0078AA] to-[#7C3AED] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,120,170,0.4)] group"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
