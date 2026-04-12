import type { MockupState } from "./chatwoot-mockup"
import {
  chatMessages,
  chatMessagesQualifying,
  chatMessagesMultilang,
  contactInfoBase,
  contactInfoNewLead,
  contactInfoWithDeal,
  conversations,
} from "./chatwoot-mockup-data"

export interface TourStep {
  id: string
  target: string // data-tour-target value
  popoverPosition: "top" | "bottom" | "left" | "right"
  i18nKey: string // key under tour.steps.*
  stateOverride: Partial<MockupState>
}

export const tourSteps: TourStep[] = [
  {
    id: "welcome",
    target: "full-mockup",
    popoverPosition: "bottom",
    i18nKey: "welcome",
    stateOverride: {},
  },
  {
    id: "unified-inbox",
    target: "conversation-list",
    popoverPosition: "right",
    i18nKey: "unified_inbox",
    stateOverride: {},
  },
  {
    id: "channels",
    target: "sidebar",
    popoverPosition: "right",
    i18nKey: "channels",
    stateOverride: {},
  },
  {
    id: "ai-conversation",
    target: "chat-thread",
    popoverPosition: "left",
    i18nKey: "ai_conversation",
    stateOverride: {
      messages: chatMessages.slice(0, 2),
      showTyping: true,
    },
  },
  {
    id: "ai-qualifying",
    target: "chat-thread",
    popoverPosition: "left",
    i18nKey: "ai_qualifying",
    stateOverride: {
      messages: chatMessagesQualifying,
      showTyping: false,
    },
  },
  {
    id: "contact-enrichment",
    target: "contact-panel",
    popoverPosition: "left",
    i18nKey: "contact_enrichment",
    stateOverride: {
      contact: contactInfoBase,
      messages: chatMessages.slice(0, 4),
    },
  },
  {
    id: "lifecycle",
    target: "contact-panel",
    popoverPosition: "left",
    i18nKey: "lifecycle",
    stateOverride: {
      contact: contactInfoBase,
      messages: chatMessages.slice(0, 5),
    },
  },
  {
    id: "booking",
    target: "chat-thread",
    popoverPosition: "left",
    i18nKey: "booking",
    stateOverride: {
      messages: chatMessages.slice(0, 7),
    },
  },
  {
    id: "team-handoff",
    target: "chat-thread",
    popoverPosition: "left",
    i18nKey: "team_handoff",
    stateOverride: {
      messages: chatMessages,
    },
  },
  {
    id: "crm",
    target: "contact-panel",
    popoverPosition: "left",
    i18nKey: "crm",
    stateOverride: {
      contact: contactInfoWithDeal,
      messages: chatMessages,
    },
  },
  {
    id: "ai-agents-count",
    target: "conversation-list",
    popoverPosition: "right",
    i18nKey: "ai_agents",
    stateOverride: {
      contact: contactInfoWithDeal,
    },
  },
  {
    id: "reports",
    target: "full-mockup",
    popoverPosition: "bottom",
    i18nKey: "reports",
    stateOverride: {
      activeTab: "reports",
    },
  },
  {
    id: "settings",
    target: "full-mockup",
    popoverPosition: "bottom",
    i18nKey: "settings",
    stateOverride: {
      activeTab: "settings",
    },
  },
  {
    id: "multilanguage",
    target: "chat-thread",
    popoverPosition: "left",
    i18nKey: "multilanguage",
    stateOverride: {
      activeTab: "inbox",
      activeConversationId: "6",
      messages: chatMessagesMultilang,
      contact: {
        ...contactInfoBase,
        name: "João Silva",
        email: "joao@clinica.pt",
        company: "Clínica Sorriso",
        source: "WhatsApp",
        lifecycleStage: "New Lead",
        lifecycleColor: "bg-blue-500",
        tags: ["Healthcare", "Portugal"],
      },
    },
  },
  {
    id: "cta-final",
    target: "full-mockup",
    popoverPosition: "bottom",
    i18nKey: "cta_final",
    stateOverride: {
      activeTab: "inbox",
      activeConversationId: "1",
      messages: chatMessages,
      contact: contactInfoWithDeal,
    },
  },
]
