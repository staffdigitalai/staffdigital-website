import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/wordpress"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { BackgroundEffects } from "@/components/background-effects"
import { CSSAurora } from "@/components/css-aurora"

// ─── SEO from WordPress Yoast + WPML ─────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("homepage", locale, {
    title: "StaffDigital AI",
    description: "AI agents that act, decide and execute.",
  })
}

// Homepage blocks — new positioning: AI operational platform
import { HeroBlock } from "@/components/homepage/hero-block"
import { AIWorking247Block } from "@/components/homepage/ai-working-247-block"
import { ClarificationBlock } from "@/components/homepage/clarification-block"
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
        {/* CSS animated aurora background — z-0 */}
        <CSSAurora />

        {/* Neon background effects (grid + floating orbs) — z-[1] */}
        <BackgroundEffects intensity="low" />

        <div className="relative z-10">
          <GlassmorphismNav />

          {/* 1 -- Hero: Transparent bg, aurora shows through */}
          <div id="inicio">
            <HeroBlock />
          </div>

          {/* 2 -- AI Working 24/7: Aurora shows through */}
          <AIWorking247Block />

          {/* Solid background zone — rounded top creates premium transition over aurora */}
          <div className="bg-bg-page dark:bg-bg-page rounded-t-[3rem] relative z-10">
            {/* 3 -- Clarification: Editorial breathing room */}
            <ClarificationBlock />

            {/* 4 -- How It Works: Unified process + cards */}
            <HowItWorksBlock />

            {/* Section divider */}
            <div className="section-divider max-w-3xl mx-auto" />

            {/* 5 -- Differentiation: Why us */}
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
        </div>
      </main>
    </div>
  )
}
