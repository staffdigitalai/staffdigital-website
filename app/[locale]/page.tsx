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

// Homepage blocks — post-refresh narrative (see PR #80 brief):
//   Hero → How it works → Channels → Integrations → Sectors → Proof → CTA.
// Voice is intentionally NOT a standalone block anymore — it's one of
// the four channels below. AIWorking247 / Clarification / Differentiation
// / Solutions / Voice blocks still exist in this directory for reuse
// elsewhere, but are no longer imported on the home.
import { HeroBlock } from "@/components/homepage/hero-block"
import { HowItWorksBlock } from "@/components/homepage/how-it-works-block"
import { ChannelsBlock } from "@/components/homepage/channels-block"
import { IntegrationsBlock } from "@/components/homepage/integrations-block"
import { SectorsBlock } from "@/components/homepage/sectors-block"
import { SocialProofBlock } from "@/components/homepage/social-proof-block"
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

          {/* 1 — Hero */}
          <div id="inicio">
            <HeroBlock />
          </div>

          {/* Solid background zone — rounded top creates premium transition over aurora */}
          <div className="bg-bg-page dark:bg-bg-page rounded-t-[3rem] relative z-10">
            {/* 2 — How it works: Receive / Understand / Decide / Execute */}
            <HowItWorksBlock />

            <div className="section-divider max-w-3xl mx-auto" />

            {/* 3 — Channels: WhatsApp · Web · Phone · Email (voice is one channel, not the headline) */}
            <ChannelsBlock />

            {/* 4 — Integrations: CRM / ERP / calendar / comms */}
            <IntegrationsBlock />

            {/* 5 — Sectors: 4 featured + transversal pillar (operations · multichannel · automation) */}
            <SectorsBlock />

            <div className="section-divider max-w-3xl mx-auto" />

            {/* 6 — Proof: 3 metrics, each with a one-line context */}
            <SocialProofBlock />

            {/* 7 — Final CTA: single "Solicitar Demo" */}
            <CTABlock />

            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}
