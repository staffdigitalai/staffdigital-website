const WP = "https://cms.staffdigital.ai/wp-content/uploads/2026/04"

export interface SpotlightArea {
  x: number; y: number; w: number; h: number // all in % of image
}

export interface TourStep {
  id: string
  image: string
  i18nKey: string
  beacon: { x: number; y: number } // pulsing dot position (%)
  tooltipSide: "top" | "bottom" | "left" | "right"
  spotlight: SpotlightArea // rect kept visible (rest gets dark overlay)
  zoom?: number // 1 = no zoom, default 1
}

// Chatwoot layout (from real screenshots at 1920×1080):
// Sidebar icons:    0% – 3.5%
// Filter panel:     3.5% – 18%
// Conv list:        18% – 36%
// Chat area:        36% – 72%
// Right panel:      72% – 100%

export const tourSteps: TourStep[] = [
  {
    id: "settings",
    image: `${WP}/tour-01-inbox.png`,
    i18nKey: "welcome",
    beacon: { x: 1.8, y: 87 }, // settings icon bottom-left
    tooltipSide: "right",
    spotlight: { x: 0, y: 78, w: 3.5, h: 15 },
  },
  {
    id: "channel-catalog",
    image: `${WP}/tour-04-channel-catalog.png`,
    i18nKey: "channel_catalog",
    beacon: { x: 50, y: 30 },
    tooltipSide: "bottom",
    spotlight: { x: 18, y: 8, w: 78, h: 52 },
  },
  {
    id: "channels",
    image: `${WP}/tour-03-channels.png`,
    i18nKey: "channels",
    beacon: { x: 50, y: 20 },
    tooltipSide: "bottom",
    spotlight: { x: 18, y: 5, w: 78, h: 40 },
  },
  {
    id: "inbox",
    image: `${WP}/tour-01-inbox.png`,
    i18nKey: "unified_inbox",
    beacon: { x: 27, y: 15 }, // conversation list header area
    tooltipSide: "right",
    spotlight: { x: 18, y: 3, w: 18, h: 94 },
    zoom: 1.3,
  },
  {
    id: "conversation",
    image: `${WP}/tour-02-conversation.png`,
    i18nKey: "ai_conversation",
    beacon: { x: 54, y: 35 }, // center of chat area
    tooltipSide: "right",
    spotlight: { x: 36, y: 3, w: 36, h: 90 },
    zoom: 1.15,
  },
  {
    id: "contact-detail",
    image: `${WP}/tour-06-contact-detail.png`,
    i18nKey: "contact_enrichment",
    beacon: { x: 45, y: 30 }, // contact form area
    tooltipSide: "right",
    spotlight: { x: 18, y: 8, w: 50, h: 55 },
    zoom: 1.2,
  },
  {
    id: "lifecycle",
    image: `${WP}/tour-13-lifecycle.png`,
    i18nKey: "lifecycle",
    beacon: { x: 55, y: 20 },
    tooltipSide: "bottom",
    spotlight: { x: 18, y: 3, w: 78, h: 40 },
  },
  {
    id: "ai-agent",
    image: `${WP}/tour-11-ai-agent.png`,
    i18nKey: "ai_agents",
    beacon: { x: 54, y: 40 },
    tooltipSide: "left",
    spotlight: { x: 36, y: 3, w: 36, h: 90 },
    zoom: 1.15,
  },
  {
    id: "contacts",
    image: `${WP}/tour-05-contacts.png`,
    i18nKey: "contacts",
    beacon: { x: 50, y: 20 },
    tooltipSide: "bottom",
    spotlight: { x: 18, y: 5, w: 78, h: 45 },
  },
  {
    id: "automation",
    image: `${WP}/tour-09-automation.png`,
    i18nKey: "automation",
    beacon: { x: 50, y: 30 },
    tooltipSide: "bottom",
    spotlight: { x: 18, y: 8, w: 78, h: 50 },
  },
  {
    id: "integrations",
    image: `${WP}/tour-08-integrations.png`,
    i18nKey: "integrations",
    beacon: { x: 50, y: 30 },
    tooltipSide: "bottom",
    spotlight: { x: 18, y: 8, w: 78, h: 50 },
  },
  {
    id: "reports",
    image: `${WP}/tour-10-reports.png`,
    i18nKey: "reports",
    beacon: { x: 50, y: 20 },
    tooltipSide: "bottom",
    spotlight: { x: 18, y: 5, w: 78, h: 50 },
  },
  {
    id: "campaigns",
    image: `${WP}/tour-14-campaigns.png`,
    i18nKey: "campaigns",
    beacon: { x: 50, y: 30 },
    tooltipSide: "bottom",
    spotlight: { x: 18, y: 8, w: 78, h: 50 },
  },
  {
    id: "agents",
    image: `${WP}/tour-12-agents.png`,
    i18nKey: "settings",
    beacon: { x: 50, y: 25 },
    tooltipSide: "bottom",
    spotlight: { x: 18, y: 5, w: 78, h: 50 },
  },
  {
    id: "csat",
    image: `${WP}/tour-15-csat.png`,
    i18nKey: "cta_final",
    beacon: { x: 50, y: 35 },
    tooltipSide: "bottom",
    spotlight: { x: 10, y: 5, w: 80, h: 65 },
  },
]
