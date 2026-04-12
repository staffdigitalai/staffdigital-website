"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { tourSteps, type TourStep } from "./tour-steps"
import {
  conversations as allConversations,
  chatMessages,
  chatMessagesQualifying,
  chatMessagesMultilang,
  contactInfoBase,
  contactInfoNewLead,
  contactInfoWithDeal,
} from "./chatwoot-mockup-data"
import type { MockupState } from "./chatwoot-mockup"

// Per-conversation message/contact data (so clicking a conversation loads different content)
const conversationData: Record<string, { messages: import("./chatwoot-mockup-data").ChatMessage[]; contact: import("./chatwoot-mockup-data").ContactInfo }> = {
  "1": { messages: chatMessages, contact: contactInfoBase },
  "2": { messages: chatMessagesQualifying, contact: { ...contactInfoNewLead, name: "Lee Chen", email: "lee@techcorp.com", company: "TechCorp", phone: "+1 555 234 567", source: "Web Chat", lifecycleStage: "New Lead", lifecycleColor: "bg-blue-500", tags: ["Tech", "SMB"] } },
  "3": { messages: [{ id: "s1", sender: "customer", text: "Hola, vi su anuncio y me interesa saber más sobre los agentes IA para mi clínica.", timestamp: "09:15" }, { id: "s2", sender: "agent", text: "¡Hola! Gracias por contactarnos. Tenemos una solución específica para clínicas que gestiona citas, envía recordatorios y atiende pacientes 24/7. ¿Cuántos pacientes atienden al mes?", timestamp: "09:15", agentName: "AI Sales Agent" }], contact: { ...contactInfoNewLead, name: "Shanny López", email: "", company: "", phone: "+34 611 222 333", source: "Phone", lifecycleStage: "New Lead", lifecycleColor: "bg-blue-500", tags: ["Healthcare"] } },
  "4": { messages: [{ id: "e1", sender: "customer", text: "Hi, I'd like to schedule a demo for our hotel chain.", timestamp: "14:00" }, { id: "e2", sender: "agent", text: "Hello Mohamed! I'd be happy to help. We have AI agents specialized for hotels and tourism. Could you tell me how many properties you manage?", timestamp: "14:00", agentName: "AI Sales Agent" }], contact: { ...contactInfoNewLead, name: "Mohamed Al-Rashid", email: "mohamed@luxuryhotels.ae", company: "Luxury Hotels Group", phone: "+971 50 123 4567", source: "Email", lifecycleStage: "New Lead", lifecycleColor: "bg-blue-500", tags: ["Hotels", "Enterprise"] } },
  "5": { messages: [{ id: "a1", sender: "customer", text: "Me interesa el plan Enterprise para múltiples tiendas.", timestamp: "11:00" }, { id: "a2", sender: "agent", text: "¡Excelente, Ana! El plan Enterprise incluye agentes IA ilimitados para todos tus canales. ¿Cuántas tiendas necesitas cubrir?", timestamp: "11:00", agentName: "AI Sales Agent" }, { id: "a3", sender: "customer", text: "Tenemos 12 tiendas en España y Portugal.", timestamp: "11:02" }], contact: { ...contactInfoBase, name: "Ana Martínez", email: "ana@retailmax.es", company: "RetailMax", lifecycleStage: "Customer", lifecycleColor: "bg-green-500", tags: ["Retail", "Enterprise"], deal: { name: "RetailMax — Enterprise Plan", value: "€4,800/mo", stage: "Closed Won" } } },
  "6": { messages: chatMessagesMultilang, contact: { ...contactInfoBase, name: "João Silva", email: "joao@clinica.pt", company: "Clínica Sorriso", source: "WhatsApp", lifecycleStage: "New Lead", lifecycleColor: "bg-blue-500", tags: ["Healthcare", "Portugal"] } },
}

export const defaultMockupState: MockupState = {
  activeTab: "inbox",
  activeConversationId: "1",
  conversations: allConversations,
  messages: chatMessages,
  contact: contactInfoBase,
  showTyping: false,
}

interface TourContextValue {
  currentStep: number
  totalSteps: number
  step: TourStep
  mockupState: MockupState
  isActive: boolean
  start: () => void
  next: () => void
  prev: () => void
  skip: () => void
  selectConversation: (id: string) => void
  selectTab: (tab: string) => void
}

const TourContext = createContext<TourContextValue | null>(null)

export function useTour() {
  const ctx = useContext(TourContext)
  if (!ctx) throw new Error("useTour must be used within TourProvider")
  return ctx
}

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(-1)
  const [mockupState, setMockupState] = useState<MockupState>(defaultMockupState)
  const totalSteps = tourSteps.length
  const isActive = currentStep >= 0
  const step = tourSteps[Math.max(0, currentStep)] ?? tourSteps[0]

  // When tour step changes, apply state override
  useEffect(() => {
    if (!isActive) return
    const s = tourSteps[currentStep]
    if (!s) return
    setMockupState((prev) => ({ ...defaultMockupState, ...s.stateOverride }))
  }, [currentStep, isActive])

  const start = useCallback(() => setCurrentStep(0), [])
  const next = useCallback(() => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1)), [totalSteps])
  const prev = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 0)), [])
  const skip = useCallback(() => { setCurrentStep(-1); setMockupState(defaultMockupState) }, [])

  // Interactive: click a conversation → load its messages + contact
  const selectConversation = useCallback((id: string) => {
    const data = conversationData[id]
    if (!data) return
    setMockupState((prev) => ({
      ...prev,
      activeTab: "inbox",
      activeConversationId: id,
      messages: data.messages,
      contact: data.contact,
    }))
  }, [])

  // Interactive: click a sidebar tab
  const selectTab = useCallback((tab: string) => {
    setMockupState((prev) => ({ ...prev, activeTab: tab }))
  }, [])

  // Keyboard
  useEffect(() => {
    if (!isActive) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); next() }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev() }
      else if (e.key === "Escape") { e.preventDefault(); skip() }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isActive, next, prev, skip])

  const value = useMemo<TourContextValue>(
    () => ({ currentStep, totalSteps, step, mockupState, isActive, start, next, prev, skip, selectConversation, selectTab }),
    [currentStep, totalSteps, step, mockupState, isActive, start, next, prev, skip, selectConversation, selectTab],
  )

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>
}
