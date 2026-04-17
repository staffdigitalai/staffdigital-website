"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useMotionReveal } from "@/hooks/use-motion-reveal"

interface IntegrationsSectionProps {
  integrations: string[] // partner slugs (openai, twilio, etc.)
  title: string
  subtitle?: string
}

// Known partner logos in /public/images/partners/
const PARTNER_INFO: Record<string, { name: string; ext: "svg" | "png" }> = {
  openai: { name: "OpenAI", ext: "svg" },
  anthropic: { name: "Anthropic", ext: "svg" },
  claude: { name: "Claude", ext: "svg" },
  "google-cloud": { name: "Google Cloud", ext: "svg" },
  "google-gemini": { name: "Google Gemini", ext: "svg" },
  twilio: { name: "Twilio", ext: "svg" },
  salesforce: { name: "Salesforce", ext: "svg" },
  openclaw: { name: "OpenClaw", ext: "svg" },
  synthesia: { name: "Synthesia", ext: "svg" },
}

export function SectorIntegrationsSection({
  integrations,
  title,
  subtitle,
}: IntegrationsSectionProps) {
  const headerReveal = useMotionReveal()
  const gridReveal = useMotionReveal()

  return (
    <section
      aria-labelledby="sector-integrations-title"
      className="px-4 sm:px-6 py-20 md:py-24"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...headerReveal}
          className="text-center mb-10 md:mb-12"
        >
          <h2
            id="sector-integrations-title"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 text-balance leading-tight tracking-tight"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-foreground/55 max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          {...gridReveal}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 items-center"
        >
          {integrations.map((slug) => {
            const info = PARTNER_INFO[slug] ?? { name: slug, ext: "svg" as const }
            return (
              <div
                key={slug}
                className="group flex items-center justify-center h-20 px-5 rounded-xl border border-foreground/5 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/15 transition-all duration-300"
                title={info.name}
              >
                <Image
                  src={`/images/partners/${slug}.${info.ext}`}
                  alt={info.name}
                  width={80}
                  height={28}
                  className="max-h-8 w-auto grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 dark:invert dark:group-hover:invert-0"
                  loading="lazy"
                />
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
