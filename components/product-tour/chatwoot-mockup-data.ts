// Static data for the Chatwoot dashboard mockup
// This file contains all fake conversations, messages, and contacts
// used across the 15 tour steps.

export interface Conversation {
  id: string
  contactName: string
  contactInitials: string
  contactColor: string
  lastMessage: string
  timestamp: string
  channel: "whatsapp" | "phone" | "email" | "web"
  badge?: string
  badgeColor?: string
  unread?: boolean
  assignee?: string
}

export interface ChatMessage {
  id: string
  sender: "customer" | "agent" | "system"
  text: string
  timestamp: string
  agentName?: string
  agentAvatar?: string
  systemType?: "lifecycle" | "contact" | "assignment" | "booking"
}

export interface ContactInfo {
  name: string
  email: string
  phone: string
  company: string
  source: string
  lifecycleStage: string
  lifecycleColor: string
  tags: string[]
  deal?: {
    name: string
    value: string
    stage: string
  }
}

export const conversations: Conversation[] = [
  {
    id: "1",
    contactName: "Kara Finley",
    contactInitials: "KF",
    contactColor: "bg-rose-500",
    lastMessage: "Hi Kara! 👋 How can I help you today?",
    timestamp: "Yesterday",
    channel: "whatsapp",
    badge: "Hot Lead",
    badgeColor: "bg-orange-500",
    unread: true,
    assignee: "AI Sales Agent",
  },
  {
    id: "2",
    contactName: "Lee Chen",
    contactInitials: "LC",
    contactColor: "bg-emerald-500",
    lastMessage: "Thank you for the confirmation. Let..",
    timestamp: "Oct 8",
    channel: "web",
    badge: "New Lead",
    badgeColor: "bg-blue-500",
    assignee: "AI Sales Agent",
  },
  {
    id: "3",
    contactName: "Shanny López",
    contactInitials: "SL",
    contactColor: "bg-amber-500",
    lastMessage: "I see. I think this could work for..",
    timestamp: "Oct 6",
    channel: "phone",
    badge: "New Lead",
    badgeColor: "bg-blue-500",
  },
  {
    id: "4",
    contactName: "Mohamed Al-Rashid",
    contactInitials: "MA",
    contactColor: "bg-violet-500",
    lastMessage: "Yes sure! When can we schedule?",
    timestamp: "Sep 30",
    channel: "email",
    badge: "New Lead",
    badgeColor: "bg-blue-500",
  },
  {
    id: "5",
    contactName: "Ana Martínez",
    contactInitials: "AM",
    contactColor: "bg-pink-500",
    lastMessage: "Me interesa el plan Enterprise...",
    timestamp: "Sep 28",
    channel: "whatsapp",
    badge: "Customer",
    badgeColor: "bg-green-500",
  },
  {
    id: "6",
    contactName: "João Silva",
    contactInitials: "JS",
    contactColor: "bg-cyan-500",
    lastMessage: "Obrigado, vou analisar a proposta",
    timestamp: "Sep 25",
    channel: "web",
    badge: "Payment",
    badgeColor: "bg-yellow-500",
  },
]

export const chatMessages: ChatMessage[] = [
  {
    id: "m1",
    sender: "agent",
    text: "Hi Kara! 👋 How can I help you today?",
    timestamp: "10:30",
    agentName: "AI Sales Agent",
  },
  {
    id: "m2",
    sender: "customer",
    text: "Sure, its kara@abcd.com. I'm from ABCD company.",
    timestamp: "10:31",
  },
  {
    id: "m3",
    sender: "system",
    text: "Contact fields updated (Email and Company)",
    timestamp: "10:31",
    systemType: "contact",
  },
  {
    id: "m4",
    sender: "system",
    text: "Lifecycle Stage New Lead updated to Hot Lead by AI Sales Agent",
    timestamp: "10:31",
    systemType: "lifecycle",
  },
  {
    id: "m5",
    sender: "system",
    text: "Contact Assigned to You",
    timestamp: "10:31",
    systemType: "assignment",
  },
  {
    id: "m6",
    sender: "agent",
    text: "Thank you for sharing, Kara. We've got an available slot in 30 minutes. Would you be available?",
    timestamp: "10:32",
    agentName: "AI Sales Agent",
  },
  {
    id: "m7",
    sender: "customer",
    text: "Yes, I am free.",
    timestamp: "10:33",
  },
  {
    id: "m8",
    sender: "system",
    text: "@Sales team - user has confirmed the appointment.",
    timestamp: "10:33",
    systemType: "assignment",
  },
]

// Messages for multilanguage step (step 14)
export const chatMessagesMultilang: ChatMessage[] = [
  {
    id: "ml1",
    sender: "customer",
    text: "Olá, gostaria de saber mais sobre os vossos serviços de IA.",
    timestamp: "14:20",
  },
  {
    id: "ml2",
    sender: "agent",
    text: "Olá! 👋 Bem-vindo à StaffDigital AI. Temos agentes IA para atendimento telefónico, WhatsApp, chat web e email. Em que canal está mais interessado?",
    timestamp: "14:20",
    agentName: "AI Sales Agent",
  },
  {
    id: "ml3",
    sender: "customer",
    text: "WhatsApp e telefone, para a minha clínica dentária.",
    timestamp: "14:21",
  },
  {
    id: "ml4",
    sender: "agent",
    text: "Excelente! Temos uma solução específica para clínicas. O agente IA gere marcações, envia lembretes automáticos e atende pacientes 24/7. Posso agendar uma demo personalizada?",
    timestamp: "14:21",
    agentName: "AI Sales Agent",
  },
]

// Qualifying questions for step 5
export const chatMessagesQualifying: ChatMessage[] = [
  {
    id: "q1",
    sender: "agent",
    text: "Could you share with me your email address and company name?",
    timestamp: "10:30",
    agentName: "AI Sales Agent",
  },
  {
    id: "q2",
    sender: "customer",
    text: "Sure, its kara@abcd.com. I'm from ABCD company.",
    timestamp: "10:31",
  },
  {
    id: "q3",
    sender: "system",
    text: "Contact fields updated (Email and Company)",
    timestamp: "10:31",
    systemType: "contact",
  },
  {
    id: "q4",
    sender: "agent",
    text: "Great! How many customer interactions do you handle per month, and which channels are you currently using?",
    timestamp: "10:32",
    agentName: "AI Sales Agent",
  },
  {
    id: "q5",
    sender: "customer",
    text: "About 2,000 calls and 500 WhatsApp messages. We're overwhelmed.",
    timestamp: "10:33",
  },
]

export const contactInfoBase: ContactInfo = {
  name: "Kara Finley",
  email: "kara@abcd.com",
  phone: "+34 612 345 678",
  company: "ABCD Company",
  source: "WhatsApp",
  lifecycleStage: "Hot Lead",
  lifecycleColor: "bg-orange-500",
  tags: ["Enterprise", "Healthcare"],
}

export const contactInfoNewLead: ContactInfo = {
  ...contactInfoBase,
  lifecycleStage: "New Lead",
  lifecycleColor: "bg-blue-500",
  email: "",
  company: "",
}

export const contactInfoWithDeal: ContactInfo = {
  ...contactInfoBase,
  deal: {
    name: "ABCD — AI Agents Implementation",
    value: "€2,400/mo",
    stage: "Proposal Sent",
  },
}

// Sidebar navigation items
export interface SidebarItem {
  id: string
  icon: string // lucide icon name
  label: string
  count?: number
}

export const sidebarItems: SidebarItem[] = [
  { id: "inbox", icon: "Inbox", label: "Inbox", count: 80 },
  { id: "contacts", icon: "Users", label: "Contacts" },
  { id: "reports", icon: "BarChart3", label: "Reports" },
  { id: "campaigns", icon: "Megaphone", label: "Campaigns" },
  { id: "settings", icon: "Settings", label: "Settings" },
]

// Lifecycle stages for the sidebar filter
export const lifecycleFilters = [
  { label: "New Lead", count: 13, color: "bg-blue-500" },
  { label: "Hot Lead", count: 2, color: "bg-orange-500" },
  { label: "Payment", count: 2, color: "bg-yellow-500" },
  { label: "Customer", count: 2, color: "bg-green-500" },
  { label: "Closed - Won", count: 5, color: "bg-emerald-500" },
]
