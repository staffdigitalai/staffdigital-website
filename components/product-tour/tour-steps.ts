// Tour steps: each step = one real screenshot + tooltip positioned over it
// Screenshots are hosted on cms.staffdigital.ai (WordPress media)

const WP = "https://cms.staffdigital.ai/wp-content/uploads/2026/04"

export interface TourStep {
  id: string
  image: string
  i18nKey: string
  // Tooltip position as percentage of the image (where the pointer should aim)
  tooltipAnchor: { x: number; y: number }
  // Which side of the anchor the tooltip appears on
  tooltipSide: "top" | "bottom" | "left" | "right"
}

export const tourSteps: TourStep[] = [
  {
    id: "inbox",
    image: `${WP}/tour-01-inbox.png`,
    i18nKey: "welcome",
    tooltipAnchor: { x: 3, y: 55 },
    tooltipSide: "right",
  },
  {
    id: "conversation",
    image: `${WP}/tour-02-conversation.png`,
    i18nKey: "unified_inbox",
    tooltipAnchor: { x: 25, y: 40 },
    tooltipSide: "right",
  },
  {
    id: "channels",
    image: `${WP}/tour-03-channels.png`,
    i18nKey: "channels",
    tooltipAnchor: { x: 50, y: 30 },
    tooltipSide: "bottom",
  },
  {
    id: "channel-catalog",
    image: `${WP}/tour-04-channel-catalog.png`,
    i18nKey: "channel_catalog",
    tooltipAnchor: { x: 50, y: 50 },
    tooltipSide: "bottom",
  },
  {
    id: "contacts",
    image: `${WP}/tour-05-contacts.png`,
    i18nKey: "contacts",
    tooltipAnchor: { x: 50, y: 30 },
    tooltipSide: "bottom",
  },
  {
    id: "contact-detail",
    image: `${WP}/tour-06-contact-detail.png`,
    i18nKey: "contact_enrichment",
    tooltipAnchor: { x: 70, y: 40 },
    tooltipSide: "left",
  },
  {
    id: "settings",
    image: `${WP}/tour-07-settings.png`,
    i18nKey: "settings",
    tooltipAnchor: { x: 50, y: 30 },
    tooltipSide: "bottom",
  },
  {
    id: "integrations",
    image: `${WP}/tour-08-integrations.png`,
    i18nKey: "integrations",
    tooltipAnchor: { x: 50, y: 40 },
    tooltipSide: "bottom",
  },
  {
    id: "automation",
    image: `${WP}/tour-09-automation.png`,
    i18nKey: "automation",
    tooltipAnchor: { x: 50, y: 40 },
    tooltipSide: "bottom",
  },
  {
    id: "reports",
    image: `${WP}/tour-10-reports.png`,
    i18nKey: "reports",
    tooltipAnchor: { x: 50, y: 30 },
    tooltipSide: "bottom",
  },
  {
    id: "ai-agent",
    image: `${WP}/tour-11-ai-agent.png`,
    i18nKey: "ai_conversation",
    tooltipAnchor: { x: 55, y: 50 },
    tooltipSide: "left",
  },
  {
    id: "agents",
    image: `${WP}/tour-12-agents.png`,
    i18nKey: "ai_agents",
    tooltipAnchor: { x: 50, y: 35 },
    tooltipSide: "bottom",
  },
  {
    id: "lifecycle",
    image: `${WP}/tour-13-lifecycle.png`,
    i18nKey: "lifecycle",
    tooltipAnchor: { x: 70, y: 35 },
    tooltipSide: "left",
  },
  {
    id: "campaigns",
    image: `${WP}/tour-14-campaigns.png`,
    i18nKey: "campaigns",
    tooltipAnchor: { x: 50, y: 40 },
    tooltipSide: "bottom",
  },
  {
    id: "csat",
    image: `${WP}/tour-15-csat.png`,
    i18nKey: "cta_final",
    tooltipAnchor: { x: 50, y: 50 },
    tooltipSide: "bottom",
  },
]
