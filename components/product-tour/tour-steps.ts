const WP = "https://cms.staffdigital.ai/wp-content/uploads/2026/04"

export interface SpotlightArea {
  x: number; y: number; w: number; h: number // all in % of image
}

export interface TourStep {
  id: string
  image: string
  i18nKey: string
  // Hotspot beacon position (% of image where the pulsing dot appears)
  beacon: { x: number; y: number }
  // Tooltip placement relative to beacon
  tooltipSide: "top" | "bottom" | "left" | "right"
  // Spotlight: rectangular area to keep visible (rest gets dark overlay)
  spotlight: SpotlightArea
  // Optional zoom: how much to scale + pan toward the spotlight area
  zoom?: number // 1 = no zoom, 1.5 = 150% etc. Default 1
}

export const tourSteps: TourStep[] = [
  {
    id: "settings",
    image: `${WP}/tour-01-inbox.png`,
    i18nKey: "welcome",
    beacon: { x: 2.5, y: 54 },
    tooltipSide: "right",
    spotlight: { x: 0, y: 48, w: 5, h: 12 },
    zoom: 1,
  },
  {
    id: "channel-catalog",
    image: `${WP}/tour-04-channel-catalog.png`,
    i18nKey: "channel_catalog",
    beacon: { x: 45, y: 35 },
    tooltipSide: "bottom",
    spotlight: { x: 15, y: 10, w: 80, h: 55 },
    zoom: 1,
  },
  {
    id: "channels",
    image: `${WP}/tour-03-channels.png`,
    i18nKey: "channels",
    beacon: { x: 45, y: 25 },
    tooltipSide: "bottom",
    spotlight: { x: 15, y: 5, w: 80, h: 50 },
    zoom: 1,
  },
  {
    id: "inbox",
    image: `${WP}/tour-01-inbox.png`,
    i18nKey: "unified_inbox",
    beacon: { x: 15, y: 8 },
    tooltipSide: "bottom",
    spotlight: { x: 3, y: 0, w: 40, h: 100 },
    zoom: 1.2,
  },
  {
    id: "conversation",
    image: `${WP}/tour-02-conversation.png`,
    i18nKey: "ai_conversation",
    beacon: { x: 55, y: 50 },
    tooltipSide: "left",
    spotlight: { x: 35, y: 5, w: 40, h: 90 },
    zoom: 1.15,
  },
  {
    id: "contact-detail",
    image: `${WP}/tour-06-contact-detail.png`,
    i18nKey: "contact_enrichment",
    beacon: { x: 70, y: 30 },
    tooltipSide: "left",
    spotlight: { x: 55, y: 5, w: 42, h: 60 },
    zoom: 1.2,
  },
  {
    id: "lifecycle",
    image: `${WP}/tour-13-lifecycle.png`,
    i18nKey: "lifecycle",
    beacon: { x: 65, y: 25 },
    tooltipSide: "left",
    spotlight: { x: 50, y: 5, w: 45, h: 50 },
    zoom: 1.2,
  },
  {
    id: "ai-agent",
    image: `${WP}/tour-11-ai-agent.png`,
    i18nKey: "ai_agents",
    beacon: { x: 50, y: 45 },
    tooltipSide: "left",
    spotlight: { x: 30, y: 10, w: 45, h: 80 },
    zoom: 1.1,
  },
  {
    id: "contacts",
    image: `${WP}/tour-05-contacts.png`,
    i18nKey: "contacts",
    beacon: { x: 50, y: 25 },
    tooltipSide: "bottom",
    spotlight: { x: 15, y: 5, w: 80, h: 50 },
    zoom: 1,
  },
  {
    id: "automation",
    image: `${WP}/tour-09-automation.png`,
    i18nKey: "automation",
    beacon: { x: 50, y: 35 },
    tooltipSide: "bottom",
    spotlight: { x: 15, y: 10, w: 80, h: 50 },
    zoom: 1,
  },
  {
    id: "integrations",
    image: `${WP}/tour-08-integrations.png`,
    i18nKey: "integrations",
    beacon: { x: 50, y: 35 },
    tooltipSide: "bottom",
    spotlight: { x: 15, y: 10, w: 80, h: 50 },
    zoom: 1,
  },
  {
    id: "reports",
    image: `${WP}/tour-10-reports.png`,
    i18nKey: "reports",
    beacon: { x: 50, y: 25 },
    tooltipSide: "bottom",
    spotlight: { x: 15, y: 5, w: 80, h: 55 },
    zoom: 1,
  },
  {
    id: "campaigns",
    image: `${WP}/tour-14-campaigns.png`,
    i18nKey: "campaigns",
    beacon: { x: 50, y: 35 },
    tooltipSide: "bottom",
    spotlight: { x: 15, y: 10, w: 80, h: 50 },
    zoom: 1,
  },
  {
    id: "agents",
    image: `${WP}/tour-12-agents.png`,
    i18nKey: "settings",
    beacon: { x: 50, y: 30 },
    tooltipSide: "bottom",
    spotlight: { x: 15, y: 5, w: 80, h: 55 },
    zoom: 1,
  },
  {
    id: "csat",
    image: `${WP}/tour-15-csat.png`,
    i18nKey: "cta_final",
    beacon: { x: 50, y: 40 },
    tooltipSide: "bottom",
    spotlight: { x: 10, y: 5, w: 80, h: 70 },
    zoom: 1,
  },
]
