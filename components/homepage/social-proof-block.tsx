"use client"

import { useTranslations } from "next-intl"

interface Metric {
  value: string
  label: string
}

export function SocialProofBlock() {
  const t = useTranslations("social_proof")

  const metrics = t.raw("metrics") as Metric[]

  return (
    <section className="py-20 px-4 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-foreground">
          {t("title")}
        </h2>

        {/* 4 Metrics */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="border-l-4 border-transparent pl-5 py-2"
              style={{
                borderImage: "linear-gradient(to bottom, #0078AA, #7C3AED) 1",
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-foreground/60">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="relative">
            <span className="absolute -top-6 -left-2 text-6xl text-[#0078AA]/20 dark:text-[var(--neon-blue)]/20 font-serif leading-none select-none">
              &ldquo;
            </span>
            <p className="text-xl md:text-2xl text-foreground/80 italic leading-relaxed">
              {t("quote")}
            </p>
            <span className="absolute -bottom-8 right-0 text-6xl text-[#7C3AED]/20 font-serif leading-none select-none">
              &rdquo;
            </span>
          </blockquote>
          <p className="mt-8 text-sm font-semibold text-foreground/50 tracking-wide uppercase">
            {t("quote_author")}
          </p>
        </div>
      </div>
    </section>
  )
}
