"use client"

import { Phone, PhoneIncoming, PhoneMissed, PhoneOff, MessageCircle, Bot, Send, User, MoreHorizontal, Columns3, Euro, Ticket, Calendar, Building2, Mail, PhoneCall, Clock } from "lucide-react"

// Shared styles
const brandCyan = "rgb(0, 120, 170)"
const brandViolet = "rgb(124, 58, 237)"

// 1. Call Center Mockup
export function CallCenterMockup() {
  return (
    <div className="w-full h-32 bg-gray-50 rounded-lg p-3 flex flex-col gap-2 overflow-hidden">
      {/* Audio waveform */}
      <div className="flex items-center gap-1 h-6">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 rounded-full"
            style={{ 
              height: `${Math.random() * 16 + 4}px`,
              backgroundColor: i % 3 === 0 ? brandCyan : "#d1d5db"
            }}
          />
        ))}
        <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: brandCyan }}>IA Activa</span>
      </div>
      {/* Call list */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-2 bg-white rounded px-2 py-1 text-[10px]">
          <PhoneIncoming className="w-3 h-3 text-green-500" />
          <span className="text-gray-700 font-medium">María G.</span>
          <span className="text-gray-400 ml-auto">2:34</span>
          <span className="text-[8px] px-1 py-0.5 rounded bg-green-100 text-green-600">Atendida</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded px-2 py-1 text-[10px]">
          <Phone className="w-3 h-3" style={{ color: brandCyan }} />
          <span className="text-gray-700 font-medium">Carlos R.</span>
          <span className="text-gray-400 ml-auto">1:12</span>
          <span className="text-[8px] px-1 py-0.5 rounded text-white" style={{ backgroundColor: brandCyan }}>En curso</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded px-2 py-1 text-[10px]">
          <PhoneMissed className="w-3 h-3 text-red-500" />
          <span className="text-gray-700 font-medium">Ana S.</span>
          <span className="text-gray-400 ml-auto">0:00</span>
          <span className="text-[8px] px-1 py-0.5 rounded bg-red-100 text-red-600">Perdida</span>
        </div>
      </div>
    </div>
  )
}

// 2. WhatsApp Mockup
export function WhatsAppMockup() {
  return (
    <div className="w-full h-32 bg-gray-50 rounded-lg flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r border-gray-200 p-1.5 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-gray-300" />
          <div className="flex-1">
            <div className="w-full h-1.5 bg-gray-200 rounded" />
            <div className="w-2/3 h-1 bg-gray-100 rounded mt-0.5" />
          </div>
          <span className="w-3 h-3 rounded-full text-[6px] text-white flex items-center justify-center" style={{ backgroundColor: brandCyan }}>2</span>
        </div>
        <div className="flex items-center gap-1 opacity-60">
          <div className="w-5 h-5 rounded-full bg-gray-200" />
          <div className="flex-1">
            <div className="w-full h-1.5 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-40">
          <div className="w-5 h-5 rounded-full bg-gray-200" />
          <div className="flex-1">
            <div className="w-3/4 h-1.5 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
      {/* Chat */}
      <div className="flex-1 flex flex-col p-2">
        <div className="flex-1 flex flex-col gap-1.5">
          {/* Customer message */}
          <div className="self-start bg-white rounded-lg px-2 py-1 text-[9px] text-gray-700 max-w-[70%] shadow-sm">
            Hola, necesito información
          </div>
          {/* Bot message */}
          <div className="self-end rounded-lg px-2 py-1 text-[9px] text-white max-w-[70%] flex items-center gap-1" style={{ backgroundColor: brandCyan }}>
            <Bot className="w-2.5 h-2.5" />
            ¡Hola! Soy tu asistente IA
          </div>
          <div className="self-end rounded-lg px-2 py-1 text-[9px] text-white max-w-[70%]" style={{ backgroundColor: brandCyan }}>
            ¿En qué puedo ayudarte?
          </div>
        </div>
        {/* Input */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex-1 bg-white rounded-full px-2 py-1 text-[8px] text-gray-400">Escribe un mensaje...</div>
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: brandCyan }}>
            <Send className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. Web Chat Mockup
export function WebChatMockup() {
  return (
    <div className="w-full h-32 bg-gray-50 rounded-lg p-2 flex justify-end">
      {/* Chat widget */}
      <div className="w-28 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="px-2 py-1.5 text-white text-[8px] font-semibold flex items-center gap-1" style={{ backgroundColor: brandCyan }}>
          <MessageCircle className="w-3 h-3" />
          StaffDigital AI
        </div>
        {/* Messages */}
        <div className="flex-1 p-1.5 flex flex-col gap-1">
          <div className="bg-gray-100 rounded px-1.5 py-0.5 text-[7px] text-gray-600 self-start">
            ¿Cómo te puedo ayudar?
          </div>
          <div className="rounded px-1.5 py-0.5 text-[7px] text-white self-end" style={{ backgroundColor: brandViolet }}>
            Quiero más info
          </div>
          {/* Typing indicator */}
          <div className="flex gap-0.5 self-start mt-0.5">
            <div className="w-1 h-1 rounded-full bg-gray-300 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-1 h-1 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
        {/* Lead form */}
        <div className="border-t border-gray-100 p-1">
          <div className="bg-gray-50 rounded px-1 py-0.5 text-[6px] text-gray-400 mb-0.5">Tu email...</div>
          <div className="rounded px-1.5 py-0.5 text-[6px] text-white text-center" style={{ backgroundColor: brandCyan }}>Enviar</div>
        </div>
      </div>
    </div>
  )
}

// 4. Sales Pipeline Mockup
export function SalesPipelineMockup() {
  return (
    <div className="w-full h-32 bg-gray-50 rounded-lg p-2 overflow-hidden">
      <div className="flex gap-1.5 h-full">
        {/* Columns */}
        {[
          { title: "Nuevo", cards: [{ name: "Lead A", value: "2.500€" }], color: "bg-blue-100" },
          { title: "Cualificado", cards: [{ name: "Lead B", value: "4.200€" }, { name: "Lead C", value: "1.800€" }], color: "bg-yellow-100" },
          { title: "Propuesta", cards: [{ name: "Lead D", value: "8.000€" }], color: "bg-purple-100" },
          { title: "Cierre", cards: [{ name: "Lead E", value: "12.500€" }], color: "bg-green-100" },
        ].map((col, i) => (
          <div key={i} className="flex-1 flex flex-col min-w-0">
            <div className={`text-[7px] font-semibold text-gray-600 px-1 py-0.5 rounded-t ${col.color}`}>
              {col.title}
            </div>
            <div className="flex-1 bg-white/50 rounded-b p-0.5 flex flex-col gap-0.5 overflow-hidden">
              {col.cards.map((card, j) => (
                <div key={j} className="bg-white rounded px-1 py-0.5 shadow-sm border border-gray-100">
                  <div className="text-[7px] text-gray-700 font-medium truncate">{card.name}</div>
                  <div className="text-[8px] font-semibold" style={{ color: brandCyan }}>{card.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 5. Support Tickets Mockup
export function SupportTicketsMockup() {
  return (
    <div className="w-full h-32 bg-gray-50 rounded-lg p-2 overflow-hidden">
      <div className="bg-white rounded-lg h-full flex flex-col shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 px-2 py-1 border-b border-gray-100 text-[7px] font-semibold text-gray-500">
          <span className="w-8">ID</span>
          <span className="flex-1">Asunto</span>
          <span className="w-12 text-center">Prioridad</span>
          <span className="w-12 text-center">Estado</span>
        </div>
        {/* Rows */}
        {[
          { id: "#1042", subject: "Error en facturación", priority: "Alta", prColor: "bg-red-100 text-red-600", status: "Abierto", sColor: "bg-yellow-100 text-yellow-700" },
          { id: "#1041", subject: "Consulta de precios", priority: "Media", prColor: "bg-yellow-100 text-yellow-600", status: "En curso", sColor: `text-white`, sBg: brandCyan },
          { id: "#1040", subject: "Soporte técnico", priority: "Baja", prColor: "bg-gray-100 text-gray-600", status: "Resuelto", sColor: "bg-green-100 text-green-600" },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5 text-[8px] border-b border-gray-50 last:border-0">
            <span className="w-8 text-gray-400 font-mono">{row.id}</span>
            <span className="flex-1 text-gray-700 truncate">{row.subject}</span>
            <span className={`w-12 text-center text-[6px] px-1 py-0.5 rounded ${row.prColor}`}>{row.priority}</span>
            <span 
              className={`w-12 text-center text-[6px] px-1 py-0.5 rounded ${row.sColor}`}
              style={row.sBg ? { backgroundColor: row.sBg } : undefined}
            >{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 6. Calendar Booking Mockup
export function CalendarBookingMockup() {
  return (
    <div className="w-full h-32 bg-gray-50 rounded-lg p-2 flex gap-2 overflow-hidden">
      {/* Calendar */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-1.5">
        <div className="text-[8px] font-semibold text-gray-600 mb-1">Abril 2026</div>
        <div className="grid grid-cols-7 gap-px text-[6px] text-gray-400 mb-0.5">
          {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
            <div key={d} className="text-center">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px text-[7px]">
          {[...Array(30)].map((_, i) => {
            const day = i + 1
            const hasEvent = [8, 15, 22].includes(day)
            const isToday = day === 7
            return (
              <div 
                key={i} 
                className={`text-center py-0.5 rounded ${isToday ? "font-bold" : ""}`}
                style={hasEvent ? { backgroundColor: `${brandCyan}20`, color: brandCyan } : { color: "#6b7280" }}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>
      {/* Booking form */}
      <div className="w-20 bg-white rounded-lg shadow-sm p-1.5 flex flex-col gap-1">
        <div className="text-[7px] font-semibold text-gray-600">Nueva cita</div>
        <div className="bg-gray-50 rounded px-1 py-0.5 text-[6px] text-gray-500 flex items-center gap-0.5">
          <Calendar className="w-2 h-2" /> 15 Abr
        </div>
        <div className="bg-gray-50 rounded px-1 py-0.5 text-[6px] text-gray-500 flex items-center gap-0.5">
          <Clock className="w-2 h-2" /> 10:00
        </div>
        <div className="bg-gray-50 rounded px-1 py-0.5 text-[6px] text-gray-500">Consulta</div>
        <div 
          className="rounded px-1 py-0.5 text-[6px] text-white text-center mt-auto"
          style={{ backgroundColor: brandCyan }}
        >
          Reservar
        </div>
      </div>
    </div>
  )
}

// 7. Lead Prospecting Mockup
export function LeadProspectingMockup() {
  return (
    <div className="w-full h-32 bg-gray-50 rounded-lg p-2 overflow-hidden">
      <div className="bg-white rounded-lg h-full flex flex-col shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-100 text-[6px] font-semibold text-gray-500">
          <span className="w-16">Empresa</span>
          <span className="w-12">Sector</span>
          <span className="w-14">Contacto</span>
          <span className="flex-1 text-right">Score</span>
        </div>
        {/* Rows */}
        {[
          { name: "Tech Corp", sector: "Software", contact: "+34 91...", score: 92 },
          { name: "Retail Plus", sector: "Comercio", contact: "+34 93...", score: 78 },
          { name: "Industria SA", sector: "Manufactura", contact: "+34 96...", score: 65 },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-1 px-2 py-1.5 text-[7px] border-b border-gray-50 last:border-0">
            <div className="w-16 flex items-center gap-1">
              <Building2 className="w-2.5 h-2.5 text-gray-400" />
              <span className="text-gray-700 font-medium truncate">{row.name}</span>
            </div>
            <span className="w-12 text-gray-500 truncate">{row.sector}</span>
            <span className="w-14 text-gray-400 font-mono truncate">{row.contact}</span>
            <div className="flex-1 flex items-center justify-end gap-1">
              <div className="w-10 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ width: `${row.score}%`, backgroundColor: row.score > 80 ? "#22c55e" : row.score > 60 ? brandCyan : "#eab308" }}
                />
              </div>
              <span className="text-[6px] font-semibold" style={{ color: brandCyan }}>{row.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 8. CRM Contact Mockup
export function CRMContactMockup() {
  return (
    <div className="w-full h-32 bg-gray-50 rounded-lg p-2 overflow-hidden">
      <div className="bg-white rounded-lg h-full flex gap-2 shadow-sm p-2">
        {/* Contact info */}
        <div className="flex flex-col items-center w-16">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: brandViolet }}>
            MG
          </div>
          <div className="text-[8px] font-semibold text-gray-700 mt-1">María G.</div>
          <div className="text-[6px] text-gray-400">Tech Corp</div>
          <div className="flex gap-0.5 mt-1">
            <span className="px-1 py-0.5 rounded text-[5px] text-white" style={{ backgroundColor: brandCyan }}>VIP</span>
            <span className="px-1 py-0.5 rounded text-[5px] bg-purple-100 text-purple-600">Lead</span>
          </div>
        </div>
        {/* Timeline */}
        <div className="flex-1 border-l border-gray-100 pl-2">
          <div className="text-[7px] font-semibold text-gray-500 mb-1">Actividad</div>
          <div className="flex flex-col gap-1">
            {[
              { icon: PhoneCall, text: "Llamada - 5 min", time: "Hoy 10:30", color: brandCyan },
              { icon: Mail, text: "Email enviado", time: "Ayer 15:00", color: brandViolet },
              { icon: MessageCircle, text: "WhatsApp", time: "Mar 12:20", color: "#22c55e" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1 text-[6px]">
                <item.icon className="w-2.5 h-2.5" style={{ color: item.color }} />
                <span className="text-gray-600 flex-1">{item.text}</span>
                <span className="text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Export array for easy mapping
export const serviceMockups = [
  CallCenterMockup,
  WhatsAppMockup,
  WebChatMockup,
  SalesPipelineMockup,
  SupportTicketsMockup,
  CalendarBookingMockup,
  LeadProspectingMockup,
  CRMContactMockup,
]
