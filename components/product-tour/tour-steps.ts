// Tour steps with percentage-based target areas for the real Chatwoot iframe.
// Since we can't query DOM inside cross-origin iframe, we define target
// rectangles as percentages of the container dimensions.

export interface TargetArea {
  x: number  // % from left
  y: number  // % from top
  w: number  // % width
  h: number  // % height
}

export interface TourStep {
  id: string
  target: TargetArea | null  // null = full mockup (no spotlight cutout)
  popoverPosition: "top" | "bottom" | "left" | "right"
  i18nKey: string
}

// Chatwoot layout reference (approximate percentages):
// Sidebar:           x=0,    w=4%
// Conversation list: x=4%,   w=20%
// Chat thread:       x=24%,  w=52%
// Contact panel:     x=76%,  w=24%

const SIDEBAR: TargetArea        = { x: 0,  y: 0,  w: 4,  h: 100 }
const CONV_LIST: TargetArea      = { x: 4,  y: 0,  w: 20, h: 100 }
const CHAT_THREAD: TargetArea    = { x: 24, y: 0,  w: 52, h: 100 }
const CHAT_HEADER: TargetArea    = { x: 24, y: 0,  w: 52, h: 8 }
const CHAT_MESSAGES: TargetArea  = { x: 24, y: 8,  w: 52, h: 84 }
const CONTACT_PANEL: TargetArea  = { x: 76, y: 0,  w: 24, h: 100 }
const CONTACT_INFO: TargetArea   = { x: 76, y: 0,  w: 24, h: 50 }
const CONTACT_BOTTOM: TargetArea = { x: 76, y: 50, w: 24, h: 50 }

export const tourSteps: TourStep[] = [
  {
    id: "welcome",
    target: null,
    popoverPosition: "bottom",
    i18nKey: "welcome",
  },
  {
    id: "unified-inbox",
    target: CONV_LIST,
    popoverPosition: "right",
    i18nKey: "unified_inbox",
  },
  {
    id: "channels",
    target: SIDEBAR,
    popoverPosition: "right",
    i18nKey: "channels",
  },
  {
    id: "ai-conversation",
    target: CHAT_MESSAGES,
    popoverPosition: "left",
    i18nKey: "ai_conversation",
  },
  {
    id: "ai-qualifying",
    target: CHAT_MESSAGES,
    popoverPosition: "left",
    i18nKey: "ai_qualifying",
  },
  {
    id: "contact-enrichment",
    target: CONTACT_INFO,
    popoverPosition: "left",
    i18nKey: "contact_enrichment",
  },
  {
    id: "lifecycle",
    target: CHAT_HEADER,
    popoverPosition: "bottom",
    i18nKey: "lifecycle",
  },
  {
    id: "booking",
    target: CHAT_MESSAGES,
    popoverPosition: "left",
    i18nKey: "booking",
  },
  {
    id: "team-handoff",
    target: CHAT_MESSAGES,
    popoverPosition: "left",
    i18nKey: "team_handoff",
  },
  {
    id: "crm",
    target: CONTACT_BOTTOM,
    popoverPosition: "left",
    i18nKey: "crm",
  },
  {
    id: "ai-agents-count",
    target: CONV_LIST,
    popoverPosition: "right",
    i18nKey: "ai_agents",
  },
  {
    id: "reports",
    target: { x: 0, y: 30, w: 4, h: 12 }, // reports icon in sidebar
    popoverPosition: "right",
    i18nKey: "reports",
  },
  {
    id: "settings",
    target: { x: 0, y: 55, w: 4, h: 12 }, // settings icon in sidebar
    popoverPosition: "right",
    i18nKey: "settings",
  },
  {
    id: "multilanguage",
    target: CHAT_THREAD,
    popoverPosition: "left",
    i18nKey: "multilanguage",
  },
  {
    id: "cta-final",
    target: null,
    popoverPosition: "bottom",
    i18nKey: "cta_final",
  },
]
