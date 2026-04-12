"use client"

import {
  Inbox, Users, BarChart3, Settings, Megaphone,
  Search, Phone, MessageSquare, Mail, Globe,
  Sparkles, Tag, Building2, AtSign, Calendar,
  ChevronDown, MoreHorizontal, Clock, PhoneCall,
} from "lucide-react"
import type {
  Conversation, ChatMessage, ContactInfo,
} from "./chatwoot-mockup-data"
import {
  conversations as defaultConversations,
  chatMessages as defaultMessages,
  contactInfoBase,
  lifecycleFilters,
} from "./chatwoot-mockup-data"

// ─── Types ───────────────────────────────────────────────────────────
export interface MockupState {
  activeTab: string
  activeConversationId: string
  conversations: Conversation[]
  messages: ChatMessage[]
  contact: ContactInfo
  showTyping: boolean
}

export const defaultMockupState: MockupState = {
  activeTab: "inbox",
  activeConversationId: "1",
  conversations: defaultConversations,
  messages: defaultMessages,
  contact: contactInfoBase,
  showTyping: false,
}

interface ChatwootMockupProps {
  state: MockupState
}

// ─── Channel icon helper ─────────────────────────────────────────────
function ChannelIcon({ channel, size = 12 }: { channel: string; size?: number }) {
  const cls = "shrink-0"
  switch (channel) {
    case "whatsapp": return <MessageSquare size={size} className={`${cls} text-green-400`} />
    case "phone": return <Phone size={size} className={`${cls} text-blue-400`} />
    case "email": return <Mail size={size} className={`${cls} text-amber-400`} />
    case "web": return <Globe size={size} className={`${cls} text-purple-400`} />
    default: return <MessageSquare size={size} className={cls} />
  }
}

// ─── Sidebar ─────────────────────────────────────────────────────────
const sidebarIcons = [
  { id: "inbox", Icon: Inbox, count: 80 },
  { id: "contacts", Icon: Users },
  { id: "reports", Icon: BarChart3 },
  { id: "campaigns", Icon: Megaphone },
  { id: "settings", Icon: Settings },
]

function Sidebar({ activeTab }: { activeTab: string }) {
  return (
    <div
      data-tour-target="sidebar"
      className="w-12 bg-slate-900 border-r border-slate-700 flex flex-col items-center py-3 gap-1 shrink-0"
    >
      {/* Brand icon */}
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--purple-dark)] flex items-center justify-center mb-4">
        <span className="text-white text-xs font-bold">SD</span>
      </div>
      {sidebarIcons.map(({ id, Icon, count }) => (
        <button
          key={id}
          className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
            activeTab === id
              ? "bg-slate-700 text-white"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <Icon size={18} />
          {count && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ─── Conversation List ───────────────────────────────────────────────
function ConversationList({
  conversations,
  activeId,
}: {
  conversations: Conversation[]
  activeId: string
}) {
  return (
    <div
      data-tour-target="conversation-list"
      className="w-60 bg-slate-850 border-r border-slate-700 flex flex-col shrink-0"
      style={{ backgroundColor: "rgb(20, 27, 45)" }}
    >
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Chats</span>
            <span className="text-sm text-slate-400">Calls</span>
          </div>
          <div className="flex items-center gap-1">
            <Search size={14} className="text-slate-400" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-300">All, Newest</span>
          <ChevronDown size={12} className="text-slate-400" />
          <span className="text-slate-500 ml-auto">Unreplied</span>
        </div>
      </div>

      {/* Filters */}
      <div className="px-3 py-2 border-b border-slate-700 space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">AI Agents</span>
          <ChevronDown size={10} className="text-slate-500" />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[8px] text-white">🤖</span>
          <span className="text-slate-300">AI Sales Agent</span>
          <span className="text-slate-500 ml-auto">50</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-slate-400">Lifecycle</span>
          <ChevronDown size={10} className="text-slate-500" />
        </div>
        {lifecycleFilters.slice(0, 3).map((f) => (
          <div key={f.label} className="flex items-center gap-2 text-xs">
            <span className={`w-3 h-3 rounded-sm ${f.color}`} />
            <span className="text-slate-300">{f.label}</span>
            <span className="text-slate-500 ml-auto">{f.count}</span>
          </div>
        ))}
      </div>

      {/* Conversation items */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`px-3 py-2.5 border-b border-slate-700/50 cursor-pointer transition-colors ${
              conv.id === activeId
                ? "bg-slate-700/50"
                : "hover:bg-slate-800/50"
            }`}
          >
            <div className="flex items-start gap-2">
              <div className={`w-8 h-8 rounded-full ${conv.contactColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {conv.contactInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white truncate">{conv.contactName}</span>
                  <span className="text-[10px] text-slate-500 shrink-0">{conv.timestamp}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <ChannelIcon channel={conv.channel} size={10} />
                  <span className="text-xs text-slate-400 truncate">{conv.lastMessage}</span>
                </div>
                {conv.badge && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${conv.badgeColor} text-white font-medium`}>
                      {conv.badge}
                    </span>
                    {conv.unread && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 ml-auto" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Chat Thread ─────────────────────────────────────────────────────
function ChatThread({
  messages,
  contact,
  showTyping,
}: {
  messages: ChatMessage[]
  contact: ContactInfo
  showTyping: boolean
}) {
  return (
    <div
      data-tour-target="chat-thread"
      className="flex-1 flex flex-col bg-slate-800 min-w-0"
    >
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold">
            {contact.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white">{contact.name}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded ${contact.lifecycleColor} text-white font-medium`}>
                {contact.lifecycleStage}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Search size={16} />
          <Clock size={16} />
          <PhoneCall size={16} />
          <MoreHorizontal size={16} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <div className="text-center text-xs text-slate-500 mb-2">Jun 18, 2025</div>
        {messages.map((msg) => {
          if (msg.sender === "system") {
            return (
              <div key={msg.id} className="flex justify-center">
                <span className="text-[11px] text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
                  {msg.systemType === "lifecycle" && "🔄 "}
                  {msg.systemType === "contact" && "📋 "}
                  {msg.systemType === "assignment" && "👤 "}
                  {msg.systemType === "booking" && "📅 "}
                  {msg.text}
                </span>
              </div>
            )
          }
          if (msg.sender === "customer") {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[70%] bg-slate-700 rounded-2xl rounded-bl-md px-3 py-2">
                  <p className="text-sm text-slate-100">{msg.text}</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">{msg.timestamp}</span>
                </div>
              </div>
            )
          }
          // agent
          return (
            <div key={msg.id} className="flex justify-end gap-2">
              <div className="max-w-[70%] bg-[var(--neon-blue)]/20 border border-[var(--neon-blue)]/30 rounded-2xl rounded-br-md px-3 py-2">
                <p className="text-sm text-slate-100">{msg.text}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                  {msg.agentName && (
                    <span className="text-[10px] text-[var(--neon-blue)]">• {msg.agentName}</span>
                  )}
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--purple-dark)] flex items-center justify-center shrink-0 mt-auto">
                <span className="text-[8px] text-white font-bold">AI</span>
              </div>
            </div>
          )
        })}

        {showTyping && (
          <div className="flex justify-end gap-2">
            <div className="bg-[var(--neon-blue)]/10 border border-[var(--neon-blue)]/20 rounded-2xl px-4 py-2.5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-blue)] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-blue)] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-blue)] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--purple-dark)] flex items-center justify-center shrink-0 mt-auto">
              <span className="text-[8px] text-white font-bold">AI</span>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="h-12 px-4 flex items-center gap-2 border-t border-slate-700 shrink-0">
        <div className="flex-1 bg-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-500">
          Type a message...
        </div>
      </div>
    </div>
  )
}

// ─── Contact Panel ───────────────────────────────────────────────────
function ContactPanel({ contact }: { contact: ContactInfo }) {
  return (
    <div
      data-tour-target="contact-panel"
      className="w-64 bg-slate-850 border-l border-slate-700 flex flex-col shrink-0 overflow-y-auto"
      style={{ backgroundColor: "rgb(20, 27, 45)" }}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 text-center">
        <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white text-lg font-bold mx-auto mb-2">
          {contact.name.split(" ").map(n => n[0]).join("")}
        </div>
        <h3 className="text-sm font-semibold text-white">{contact.name}</h3>
        <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full ${contact.lifecycleColor} text-white font-medium mt-1`}>
          {contact.lifecycleStage}
        </span>
      </div>

      {/* Contact details */}
      <div className="p-4 space-y-3 border-b border-slate-700">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact Info</h4>
        {[
          { icon: Mail, label: "Email", value: contact.email, auto: !!contact.email },
          { icon: Phone, label: "Phone", value: contact.phone, auto: false },
          { icon: Building2, label: "Company", value: contact.company, auto: !!contact.company },
          { icon: Globe, label: "Source", value: contact.source, auto: false },
        ].map((field) => (
          <div key={field.label} className="flex items-center gap-2">
            <field.icon size={13} className="text-slate-500 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-slate-500">{field.label}</div>
              <div className="text-xs text-slate-200 truncate flex items-center gap-1">
                {field.value || <span className="text-slate-600">—</span>}
                {field.auto && <Sparkles size={10} className="text-amber-400 shrink-0" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="p-4 space-y-2 border-b border-slate-700">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <Tag size={12} /> Tags
        </h4>
        <div className="flex flex-wrap gap-1">
          {contact.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CRM Deal */}
      {contact.deal && (
        <div className="p-4 space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <AtSign size={12} /> CRM Deal
          </h4>
          <div className="bg-slate-700/50 rounded-lg p-3 space-y-1.5">
            <div className="text-xs font-medium text-white">{contact.deal.name}</div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[var(--lime-green)] font-semibold">{contact.deal.value}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {contact.deal.stage}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Booking card placeholder */}
      <div className="p-4 space-y-2 border-t border-slate-700">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <Calendar size={12} /> Appointments
        </h4>
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <div className="text-[11px] text-slate-400">Next: Today, 11:00 AM</div>
          <div className="text-[10px] text-[var(--neon-blue)] mt-0.5">Cal.com integration</div>
        </div>
      </div>
    </div>
  )
}

// ─── Reports panel (shown when tab=reports) ──────────────────────────
function ReportsPanel() {
  const bars = [65, 85, 45, 92, 73, 58, 88]
  return (
    <div className="flex-1 flex flex-col bg-slate-800 p-6">
      <h2 className="text-lg font-bold text-white mb-4">Agent Performance</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Conversations", value: "1,247", change: "+12%" },
          { label: "Resolution Rate", value: "94.3%", change: "+3.2%" },
          { label: "Avg Response", value: "< 1s", change: "-0.3s" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-700/50 rounded-xl p-4">
            <div className="text-xs text-slate-400">{stat.label}</div>
            <div className="text-xl font-bold text-white mt-1">{stat.value}</div>
            <div className="text-xs text-green-400 mt-0.5">{stat.change}</div>
          </div>
        ))}
      </div>
      <div className="bg-slate-700/50 rounded-xl p-4 flex-1">
        <div className="text-sm text-slate-400 mb-3">Weekly Activity</div>
        <div className="flex items-end gap-3 h-32">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-gradient-to-t from-[var(--neon-blue)] to-[var(--purple-dark)] transition-all"
                style={{ height: `${h}%` }}
              />
              <span className="text-[10px] text-slate-500">{["M","T","W","T","F","S","S"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Settings panel (shown when tab=settings) ────────────────────────
function SettingsPanel() {
  return (
    <div className="flex-1 flex flex-col bg-slate-800 p-6">
      <h2 className="text-lg font-bold text-white mb-4">Configuration</h2>
      <div className="space-y-4 max-w-md">
        {[
          { label: "AI Agent Name", value: "AI Sales Agent", done: true },
          { label: "Response Language", value: "Auto-detect (ES, EN, PT)", done: true },
          { label: "WhatsApp Channel", value: "Connected ✓", done: true },
          { label: "Phone (Telnyx SIP)", value: "+34 931 229 129 ✓", done: true },
          { label: "CRM Integration", value: "Twenty CRM ✓", done: true },
          { label: "Calendar", value: "Cal.com ✓", done: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
            <div>
              <div className="text-sm text-white">{item.label}</div>
              <div className="text-xs text-slate-400">{item.value}</div>
            </div>
            {item.done && <span className="text-green-400 text-sm">✓</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Mockup Component ───────────────────────────────────────────
export function ChatwootMockup({ state }: ChatwootMockupProps) {
  const showInbox = state.activeTab === "inbox"
  const showReports = state.activeTab === "reports"
  const showSettings = state.activeTab === "settings"

  return (
    <div
      data-tour-target="full-mockup"
      className="w-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-[var(--neon-blue)]/5"
      style={{ height: "540px" }}
    >
      <div className="flex h-full bg-slate-800">
        <Sidebar activeTab={state.activeTab} />

        {showInbox && (
          <>
            <ConversationList
              conversations={state.conversations}
              activeId={state.activeConversationId}
            />
            <ChatThread
              messages={state.messages}
              contact={state.contact}
              showTyping={state.showTyping}
            />
            <ContactPanel contact={state.contact} />
          </>
        )}

        {showReports && <ReportsPanel />}
        {showSettings && <SettingsPanel />}
      </div>
    </div>
  )
}
