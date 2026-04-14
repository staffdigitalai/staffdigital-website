import type { Metadata } from "next"
import { getPageSEO } from "@/lib/wordpress"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { BackgroundEffects } from "@/components/background-effects"

// ─── SEO from WordPress Yoast + WPML ─────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { yoast, hreflang } = await getPageSEO("homepage", locale)

  // Fallback to static translations if Yoast data isn't available
  if (!yoast) {
    return {
      title: "StaffDigital AI",
      description: "AI agents that act, decide and execute.",
    }
  }

  return {
    title: yoast.title,
    description: yoast.description,
    openGraph: {
      title: yoast.og_title ?? yoast.title,
      description: yoast.og_description ?? yoast.description,
      ...(yoast.og_image?.[0] && {
        images: [{ url: yoast.og_image[0].url, width: yoast.og_image[0].width, height: yoast.og_image[0].height }],
      }),
    },
    alternates: {
      canonical: yoast.canonical ?? `https://www.staffdigital.ai/${locale === "es" ? "" : locale}`,
      languages: Object.fromEntries(
        hreflang
          .filter((h) => h.hreflang !== "x-default")
          .map((h) => [h.hreflang, h.href]),
      ),
    },
  }
}

// Homepage blocks — new positioning: AI operational platform
import { HeroBlock } from "@/components/homepage/hero-block"
import { AIWorking247Block } from "@/components/homepage/ai-working-247-block"
import { ClarificationBlock } from "@/components/homepage/clarification-block"
import { UseCasesBlock } from "@/components/homepage/use-cases-block"
import { HowItWorksBlock } from "@/components/homepage/how-it-works-block"
import { DifferentiationBlock } from "@/components/homepage/differentiation-block"
import { SocialProofBlock } from "@/components/homepage/social-proof-block"
import { VoiceBlock } from "@/components/homepage/voice-block"
import { SolutionsBlock } from "@/components/homepage/solutions-block"
import { CTABlock } from "@/components/homepage/cta-block"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden transition-colors duration-300">
      <main className="min-h-screen relative overflow-hidden">
        {/* Aurora background */}
        <div className="fixed inset-0 w-full h-full dark:opacity-100 opacity-20 transition-opacity duration-500">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        {/* Neon background effects (grid + floating orbs) */}
        <BackgroundEffects intensity="low" />

        <div className="relative z-10">
          <GlassmorphismNav />

          {/* 1 -- Hero: Full viewport, commanding entry */}
          <div id="inicio">
            <HeroBlock />
          </div>

          {/* 2 -- AI Working 24/7: Centerpiece animated cards */}
          <AIWorking247Block />

          {/* 3 -- Clarification: Editorial breathing room */}
          <ClarificationBlock />

          {/* 4 -- How It Works: Unified process + cards */}
          <HowItWorksBlock />

          {/* Section divider */}
          <div className="section-divider max-w-3xl mx-auto" />

          {/* 5 -- Use Cases: Practical applications */}
          <div id="soluciones">
            <UseCasesBlock />
          </div>

          {/* Section divider */}
          <div className="section-divider max-w-3xl mx-auto" />

          {/* 7 -- Differentiation: Why us */}
          <DifferentiationBlock />

          {/* 8 -- Social Proof: Trust and credibility */}
          <SocialProofBlock />

          {/* 9 -- Voice: HD voice capability */}
          <VoiceBlock />

          {/* Section divider */}
          <div className="section-divider max-w-3xl mx-auto" />

          {/* 10 -- Solutions: Categories exploration */}
          <SolutionsBlock />

          {/* 11 -- Final CTA: Climax */}
          <CTABlock />

          <Footer />
        </div>
      </main>
    </div>
  )
}
