"use client"

import {
  Inbox, Users, BarChart3, Settings, Megaphone,
  Search, Phone, MessageSquare, Mail, Globe,
  Sparkles, Tag, Building2, AtSign, Calendar,
  ChevronDown, MoreHorizontal, Clock, PhoneCall,
} from "lucide-react"
import type { Conversation, ChatMessage, ContactInfo } from "./chatwoot-mockup-data"
import { conversations as allConversations, contactInfoBase, lifecycleFilters } from "./chatwoot-mockup-data"

// ─── Types ───────────────────────────────────────────────────────────
export interface MockupState {
  activeTab: string
  activeConversationId: string
  conversations: Conversation[]
  messages: ChatMessage[]
  contact: ContactInfo
  showTyping: boolean
}

interface ChatwootMockupProps {
  state: MockupState
  onSelectConversation: (id: string) => void
  onSelectTab: (tab: string) => void
}

// ─── Channel icon ────────────────────────────────────────────────────
function ChannelIcon({ channel, size = 12 }: { channel: string; size?: number }) {
  const cls = "shrink-0"
  switch (channel) {
    case "whatsapp": return <MessageSquare size={size} className={`${cls} text-green-500`} />
    case "phone": return <Phone size={size} className={`${cls} text-blue-500`} />
    case "email": return <Mail size={size} className={`${cls} text-amber-500`} />
    case "web": return <Globe size={size} className={`${cls} text-purple-500`} />
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

function Sidebar({ activeTab, onSelectTab }: { activeTab: string; onSelectTab: (t: string) => void }) {
  return (
    <div
      data-tour-target="sidebar"
      className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-3 gap-1 shrink-0"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1F93FF] to-[#7C3AED] flex items-center justify-center mb-4">
        <span className="text-white text-xs font-bold">SD</span>
      </div>
      {sidebarIcons.map(({ id, Icon, count }) => (
        <button
          key={id}
          onClick={() => onSelectTab(id)}
          className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            activeTab === id ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
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
  conversations, activeId, onSelect,
}: {
  conversations: Conversation[]; activeId: string; onSelect: (id: string) => void
}) {
  return (
    <div data-tour-target="conversation-list" className="w-60 bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">Chats</span>
            <span className="text-sm text-gray-400">Calls</span>
          </div>
          <Search size={14} className="text-gray-400" />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-600">All, Newest</span>
          <ChevronDown size={12} className="text-gray-400" />
          <span className="text-gray-400 ml-auto">Unreplied</span>
        </div>
      </div>

      {/* Filters */}
      <div className="px-3 py-2 border-b border-gray-200 space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">AI Agents</span>
          <ChevronDown size={10} className="text-gray-400" />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[8px] text-white">🤖</span>
          <span className="text-gray-700">AI Sales Agent</span>
          <span className="text-gray-400 ml-auto">50</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-gray-500">Lifecycle</span>
          <ChevronDown size={10} className="text-gray-400" />
        </div>
        {lifecycleFilters.slice(0, 3).map((f) => (
          <div key={f.label} className="flex items-center gap-2 text-xs">
            <span className={`w-3 h-3 rounded-sm ${f.color}`} />
            <span className="text-gray-700">{f.label}</span>
            <span className="text-gray-400 ml-auto">{f.count}</span>
          </div>
        ))}
      </div>

      {/* Clickable conversation items */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`px-3 py-2.5 border-b border-gray-100 cursor-pointer transition-colors ${
              conv.id === activeId ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start gap-2">
              <div className={`w-8 h-8 rounded-full ${conv.contactColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {conv.contactInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 truncate">{conv.contactName}</span>
                  <span className="text-[10px] text-gray-400 shrink-0">{conv.timestamp}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <ChannelIcon channel={conv.channel} size={10} />
                  <span className="text-xs text-gray-500 truncate">{conv.lastMessage}</span>
                </div>
                {conv.badge && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${conv.badgeColor} text-white font-medium`}>
                      {conv.badge}
                    </span>
                    {conv.unread && <span className="w-2 h-2 rounded-full bg-blue-500 ml-auto" />}
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
function ChatThread({ messages, contact, showTyping }: { messages: ChatMessage[]; contact: ContactInfo; showTyping: boolean }) {
  return (
    <div data-tour-target="chat-thread" className="flex-1 flex flex-col bg-gray-50 min-w-0">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold">
            {contact.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-gray-900">{contact.name}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded ${contact.lifecycleColor} text-white font-medium`}>
              {contact.lifecycleStage}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Search size={16} /><Clock size={16} /><PhoneCall size={16} /><MoreHorizontal size={16} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <div className="text-center text-xs text-gray-400 mb-2">Jun 18, 2025</div>
        {messages.map((msg) => {
          if (msg.sender === "system") {
            return (
              <div key={msg.id} className="flex justify-center">
                <span className="text-[11px] text-gray-500 bg-gray-200/70 px-3 py-1 rounded-full">
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
                <div className="max-w-[70%] bg-white border border-gray-200 rounded-2xl rounded-bl-md px-3 py-2 shadow-sm">
                  <p className="text-sm text-gray-800">{msg.text}</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">{msg.timestamp}</span>
                </div>
              </div>
            )
          }
          return (
            <div key={msg.id} className="flex justify-end gap-2">
              <div className="max-w-[70%] bg-blue-50 border border-blue-100 rounded-2xl rounded-br-md px-3 py-2">
                <p className="text-sm text-gray-800">{msg.text}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                  {msg.agentName && <span className="text-[10px] text-blue-500">• {msg.agentName}</span>}
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 mt-auto">
                <span className="text-[8px] text-white font-bold">AI</span>
              </div>
            </div>
          )
        })}
        {showTyping && (
          <div className="flex justify-end gap-2">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-2.5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 mt-auto">
              <span className="text-[8px] text-white font-bold">AI</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="h-12 px-4 flex items-center gap-2 border-t border-gray-200 bg-white shrink-0">
        <div className="flex-1 bg-gray-100 rounded-lg px-3 py-1.5 text-xs text-gray-400">Type a message...</div>
      </div>
    </div>
  )
}

// ─── Contact Panel ───────────────────────────────────────────────────
function ContactPanel({ contact }: { contact: ContactInfo }) {
  return (
    <div data-tour-target="contact-panel" className="w-64 bg-white border-l border-gray-200 flex flex-col shrink-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 text-center">
        <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white text-lg font-bold mx-auto mb-2">
          {contact.name.split(" ").map(n => n[0]).join("")}
        </div>
        <h3 className="text-sm font-semibold text-gray-900">{contact.name}</h3>
        <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full ${contact.lifecycleColor} text-white font-medium mt-1`}>
          {contact.lifecycleStage}
        </span>
      </div>
      <div className="p-4 space-y-3 border-b border-gray-200">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Info</h4>
        {[
          { icon: Mail, label: "Email", value: contact.email, auto: !!contact.email },
          { icon: Phone, label: "Phone", value: contact.phone, auto: false },
          { icon: Building2, label: "Company", value: contact.company, auto: !!contact.company },
          { icon: Globe, label: "Source", value: contact.source, auto: false },
        ].map((field) => (
          <div key={field.label} className="flex items-center gap-2">
            <field.icon size={13} className="text-gray-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-gray-400">{field.label}</div>
              <div className="text-xs text-gray-700 truncate flex items-center gap-1">
                {field.value || <span className="text-gray-300">—</span>}
                {field.auto && <Sparkles size={10} className="text-amber-500 shrink-0" />}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 space-y-2 border-b border-gray-200">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><Tag size={12} /> Tags</h4>
        <div className="flex flex-wrap gap-1">
          {contact.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">{tag}</span>
          ))}
        </div>
      </div>
      {contact.deal && (
        <div className="p-4 space-y-2">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><AtSign size={12} /> CRM Deal</h4>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 border border-gray-200">
            <div className="text-xs font-medium text-gray-900">{contact.deal.name}</div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-green-600 font-semibold">{contact.deal.value}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-200">{contact.deal.stage}</span>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 space-y-2 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><Calendar size={12} /> Appointments</h4>
        <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
          <div className="text-[11px] text-gray-500">Next: Today, 11:00 AM</div>
          <div className="text-[10px] text-blue-500 mt-0.5">Cal.com integration</div>
        </div>
      </div>
    </div>
  )
}

// ─── Reports ─────────────────────────────────────────────────────────
function ReportsPanel() {
  const bars = [65, 85, 45, 92, 73, 58, 88]
  return (
    <div className="flex-1 flex flex-col bg-gray-50 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Agent Performance</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Conversations", value: "1,247", change: "+12%" },
          { label: "Resolution Rate", value: "94.3%", change: "+3.2%" },
          { label: "Avg Response", value: "< 1s", change: "-0.3s" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className="text-xl font-bold text-gray-900 mt-1">{s.value}</div>
            <div className="text-xs text-green-500 mt-0.5">{s.change}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-4 flex-1 border border-gray-200 shadow-sm">
        <div className="text-sm text-gray-500 mb-3">Weekly Activity</div>
        <div className="flex items-end gap-3 h-32">
          {bars.map((ht, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t bg-gradient-to-t from-blue-500 to-purple-500" style={{ height: `${ht}%` }} />
              <span className="text-[10px] text-gray-400">{["M","T","W","T","F","S","S"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Settings ────────────────────────────────────────────────────────
function SettingsPanel() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Configuration</h2>
      <div className="space-y-4 max-w-md">
        {[
          { label: "AI Agent Name", value: "AI Sales Agent" },
          { label: "Response Language", value: "Auto-detect (ES, EN, PT)" },
          { label: "WhatsApp Channel", value: "Connected ✓" },
          { label: "Phone (Telnyx SIP)", value: "+34 931 229 129 ✓" },
          { label: "CRM Integration", value: "Twenty CRM ✓" },
          { label: "Calendar", value: "Cal.com ✓" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <div>
              <div className="text-sm text-gray-900">{item.label}</div>
              <div className="text-xs text-gray-500">{item.value}</div>
            </div>
            <span className="text-green-500 text-sm">✓</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────
export function ChatwootMockup({ state, onSelectConversation, onSelectTab }: ChatwootMockupProps) {
  return (
    <div
      data-tour-target="full-mockup"
      className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-300/50"
      style={{ height: "540px" }}
    >
      <div className="flex h-full bg-white">
        <Sidebar activeTab={state.activeTab} onSelectTab={onSelectTab} />

        {state.activeTab === "inbox" && (
          <>
            <ConversationList conversations={state.conversations} activeId={state.activeConversationId} onSelect={onSelectConversation} />
            <ChatThread messages={state.messages} contact={state.contact} showTyping={state.showTyping} />
            <ContactPanel contact={state.contact} />
          </>
        )}
        {state.activeTab === "reports" && <ReportsPanel />}
        {state.activeTab === "settings" && <SettingsPanel />}
        {state.activeTab === "contacts" && (
          <div className="flex-1 bg-gray-50 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contacts</h2>
            <div className="space-y-2">
              {allConversations.map((c) => (
                <div key={c.id} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                  <div className={`w-8 h-8 rounded-full ${c.contactColor} flex items-center justify-center text-white text-xs font-bold`}>{c.contactInitials}</div>
                  <div><div className="text-sm font-medium text-gray-900">{c.contactName}</div><div className="text-xs text-gray-500">{c.lastMessage}</div></div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${c.badgeColor} text-white font-medium ml-auto`}>{c.badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {state.activeTab === "campaigns" && (
          <div className="flex-1 bg-gray-50 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Campaigns</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <Megaphone size={32} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Automated campaigns via WhatsApp, email and SMS</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
