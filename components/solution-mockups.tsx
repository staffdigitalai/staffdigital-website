"use client"

import { Phone, MessageCircle, Mail, Globe, Calendar, Target, Users, Headphones, ShoppingCart, TrendingUp, CheckCircle2, Circle, Clock, Mic } from "lucide-react"

// Shared mini avatar component
const Avatar = ({ name, color = "bg-gray-300" }: { name: string; color?: string }) => (
  <div className={`w-5 h-5 rounded-full ${color} flex items-center justify-center text-[6px] font-bold text-white shrink-0`}>
    {name.split(' ').map(n => n[0]).join('')}
  </div>
)

// Badge component
const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "error" | "info" | "purple" }) => {
  const colors = {
    default: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
    success: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400",
    error: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
  }
  return <span className={`px-1 py-0.5 rounded text-[6px] font-medium ${colors[variant]}`}>{children}</span>
}

// 1. IA Call Center Mockup
function CallCenterMockup() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 flex text-[8px]">
      {/* Sidebar */}
      <div className="w-7 bg-gray-50 dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col items-center py-2 gap-2">
        <Phone className="w-3 h-3 text-[#0078AA]" />
        <MessageCircle className="w-3 h-3 text-gray-400" />
        <Mail className="w-3 h-3 text-gray-400" />
      </div>
      {/* List */}
      <div className="flex-1 p-1.5">
        <div className="text-[7px] font-semibold text-gray-500 dark:text-gray-400 mb-1">Llamadas activas · 12</div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 p-1 bg-blue-50 dark:bg-blue-900/20 rounded">
            <Avatar name="María López" color="bg-pink-400" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 dark:text-gray-200 truncate">María López</div>
            </div>
            <Badge variant="success">En curso</Badge>
            <span className="text-gray-400">2m</span>
          </div>
          <div className="flex items-center gap-1 p-1 rounded">
            <Avatar name="Carlos Ruiz" color="bg-blue-400" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 dark:text-gray-200 truncate">Carlos Ruiz</div>
            </div>
            <Badge variant="warning">En espera</Badge>
            <span className="text-gray-400">5m</span>
          </div>
          <div className="flex items-center gap-1 p-1 rounded">
            <Avatar name="Ana García" color="bg-green-400" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 dark:text-gray-200 truncate">Ana García</div>
            </div>
            <Badge variant="success">En curso</Badge>
            <span className="text-gray-400">1m</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 2. Atención Telefónica Mockup
function AtencionTelefonicaMockup() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-2 text-[8px]">
      {/* Caller info */}
      <div className="text-center mb-1">
        <div className="font-semibold text-gray-800 dark:text-gray-200">Carlos Martín</div>
        <Badge variant="info">Llamada entrante</Badge>
      </div>
      {/* Waveform */}
      <div className="flex items-end gap-0.5 h-6 my-1">
        {[3, 5, 8, 12, 8, 14, 10, 6, 9, 12, 7, 4, 8, 11, 6, 9, 5, 3].map((h, i) => (
          <div key={i} className="w-1 bg-gradient-to-t from-[#0078AA] to-[#7C3AED] rounded-full" style={{ height: `${h}px` }} />
        ))}
      </div>
      {/* Timer */}
      <div className="text-sm font-mono text-gray-600 dark:text-gray-400">02:34</div>
      {/* Actions */}
      <div className="flex gap-2 mt-1">
        <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <Users className="w-2.5 h-2.5 text-gray-500" />
        </div>
        <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <Mic className="w-2.5 h-2.5 text-gray-500" />
        </div>
        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
          <Phone className="w-2.5 h-2.5 text-white rotate-[135deg]" />
        </div>
      </div>
    </div>
  )
}

// 3. WhatsApp Mockup
function WhatsAppMockup() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 flex text-[8px]">
      {/* Sidebar */}
      <div className="w-7 bg-gray-50 dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col items-center py-2 gap-2">
        <Phone className="w-3 h-3 text-gray-400" />
        <div className="w-3 h-3 text-[#25D366] font-bold text-[8px]">W</div>
        <Mail className="w-3 h-3 text-gray-400" />
      </div>
      {/* List */}
      <div className="flex-1 p-1.5">
        <div className="text-[7px] font-semibold text-gray-500 dark:text-gray-400 mb-1">WhatsApp · 28 activas</div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 p-1 bg-green-50 dark:bg-green-900/20 rounded">
            <Avatar name="Pedro Sánchez" color="bg-orange-400" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 dark:text-gray-200 truncate">Pedro Sánchez</div>
              <div className="text-gray-400 truncate">Hola, quiero reservar...</div>
            </div>
            <Badge variant="info">IA</Badge>
          </div>
          <div className="flex items-center gap-1 p-1 rounded">
            <Avatar name="Laura Vega" color="bg-purple-400" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 dark:text-gray-200 truncate">Laura Vega</div>
              <div className="text-gray-400 truncate">Gracias por la info</div>
            </div>
            <Badge variant="success">Humano</Badge>
          </div>
          <div className="flex items-center gap-1 p-1 rounded">
            <Avatar name="Juan López" color="bg-teal-400" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 dark:text-gray-200 truncate">Juan López</div>
              <div className="text-gray-400 truncate">¿Tienen disponibilidad?</div>
            </div>
            <Badge variant="info">IA</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

// 4. Chat Web Mockup
function ChatWebMockup() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 flex text-[8px]">
      {/* Visitors list */}
      <div className="w-1/3 border-r border-gray-100 dark:border-gray-700 p-1">
        <div className="text-[7px] font-semibold text-gray-500 dark:text-gray-400 mb-1">Chat Web · 8</div>
        <div className="space-y-1">
          <div className="p-1 bg-purple-50 dark:bg-purple-900/20 rounded">
            <div className="font-medium text-gray-800 dark:text-gray-200">#1242</div>
            <div className="text-gray-400">/precios</div>
          </div>
          <div className="p-1">
            <div className="font-medium text-gray-800 dark:text-gray-200">#1241</div>
            <div className="text-gray-400">/contacto</div>
          </div>
        </div>
      </div>
      {/* Chat */}
      <div className="flex-1 p-1.5 flex flex-col">
        <div className="flex-1 space-y-1">
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded px-1.5 py-0.5 text-gray-700 dark:text-gray-300 max-w-[80%]">
              Hola, ¿tienen demo?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[#0078AA] rounded px-1.5 py-0.5 text-white max-w-[80%]">
              ¡Sí! Te agendo una demo ahora
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#7C3AED]">
          <div className="flex gap-0.5">
            <span className="w-1 h-1 bg-current rounded-full animate-bounce" />
            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
          <span className="text-[6px]">IA respondiendo</span>
        </div>
      </div>
    </div>
  )
}

// 5. Chat Productos Mockup
function ChatProductosMockup() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-1.5 flex flex-col text-[8px]">
      <div className="flex items-center gap-1 mb-1">
        <ShoppingCart className="w-3 h-3 text-[#0078AA]" />
        <span className="font-semibold text-gray-600 dark:text-gray-400">Asistente de compra</span>
      </div>
      <div className="flex-1 space-y-1">
        <div className="bg-gray-100 dark:bg-gray-700 rounded px-1.5 py-0.5 text-gray-700 dark:text-gray-300 w-fit">
          Busco zapatillas running 42
        </div>
        <div className="bg-[#0078AA]/10 dark:bg-[#0078AA]/20 rounded p-1 flex gap-1.5">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-800 dark:text-gray-200 truncate">Nike Air Zoom</div>
            <div className="text-green-600 font-semibold">89,99€</div>
            <Badge variant="success">En stock</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

// 6. Ventas Pipeline Mockup
function VentasMockup() {
  const columns = [
    { name: "Nuevo", count: 3, color: "bg-gray-200 dark:bg-gray-600" },
    { name: "Cualificado", count: 2, color: "bg-[#0078AA]" },
    { name: "Propuesta", count: 2, color: "bg-yellow-400" },
    { name: "Cierre", count: 1, color: "bg-green-500" },
  ]
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-1.5 text-[7px]">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-gray-600 dark:text-gray-400">Pipeline · €156k</span>
        <TrendingUp className="w-3 h-3 text-green-500" />
      </div>
      <div className="flex gap-1 h-[calc(100%-16px)]">
        {columns.map((col, i) => (
          <div key={i} className="flex-1 flex flex-col">
            <div className={`h-1 ${col.color} rounded-t mb-0.5`} />
            <div className="text-[6px] text-gray-500 dark:text-gray-400 mb-0.5">{col.name}</div>
            <div className="flex-1 space-y-0.5">
              {Array.from({ length: Math.min(col.count, 2) }).map((_, j) => (
                <div key={j} className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded p-0.5">
                  <div className="font-medium text-gray-700 dark:text-gray-300 truncate">Empresa {i * 2 + j + 1}</div>
                  <div className="text-gray-400">€{(Math.random() * 20 + 5).toFixed(1)}k</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 7. Soporte Tickets Mockup
function SoporteMockup() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-1.5 text-[7px]">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <Headphones className="w-3 h-3 text-[#0078AA]" />
          <span className="font-semibold text-gray-600 dark:text-gray-400">Tickets · 145</span>
        </div>
        <Badge variant="success">82% IA</Badge>
      </div>
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mb-1.5 overflow-hidden">
        <div className="h-full w-[82%] bg-gradient-to-r from-[#0078AA] to-[#7C3AED] rounded-full" />
      </div>
      {/* Tickets table */}
      <div className="space-y-0.5">
        {[
          { id: "#4521", subject: "Error al procesar pago", priority: "error", status: "success" },
          { id: "#4520", subject: "Consulta factura", priority: "warning", status: "info" },
          { id: "#4519", subject: "Cambio de plan", priority: "default", status: "success" },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-1 py-0.5">
            <span className="text-gray-400 w-6">{t.id}</span>
            <span className="flex-1 text-gray-700 dark:text-gray-300 truncate">{t.subject}</span>
            <Badge variant={t.priority as "error" | "warning" | "default"}>{t.priority === "error" ? "Alta" : t.priority === "warning" ? "Media" : "Baja"}</Badge>
            <Badge variant={t.status as "success" | "info"}>{t.status === "success" ? "IA" : "Curso"}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

// 8. Agendamientos Mockup
function AgendamientosMockup() {
  const days = ["L", "M", "X", "J", "V", "S", "D"]
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-1.5 flex gap-2 text-[7px]">
      {/* Calendar */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <Calendar className="w-3 h-3 text-[#0078AA]" />
          <span className="font-semibold text-gray-600 dark:text-gray-400">Abril 2026</span>
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {days.map(d => (
            <div key={d} className="text-center text-[5px] text-gray-400">{d}</div>
          ))}
          {Array.from({ length: 21 }).map((_, i) => {
            const day = i + 1
            const isSelected = day === 15
            const isAvailable = [8, 10, 12, 15, 17, 19].includes(day)
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded text-center leading-3 ${
                  isSelected ? "bg-[#0078AA] text-white" : 
                  isAvailable ? "bg-blue-100 dark:bg-blue-900/30 text-[#0078AA]" : 
                  "text-gray-400"
                }`}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>
      {/* Time slots */}
      <div className="w-12 space-y-0.5">
        <div className="text-[6px] text-gray-400 mb-1">Hora</div>
        {["09:00", "09:30", "10:00", "10:30"].map((t, i) => (
          <div key={i} className={`text-center py-0.5 rounded ${i === 2 ? "bg-[#0078AA] text-white" : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}

// 9. Lead Generation Mockup
function LeadGenerationMockup() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-1.5 text-[7px]">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <Target className="w-3 h-3 text-[#7C3AED]" />
          <span className="font-semibold text-gray-600 dark:text-gray-400">Leads · 234</span>
        </div>
      </div>
      <div className="space-y-0.5">
        {[
          { name: "TechCorp SL", sector: "SaaS", score: 85 },
          { name: "RetailMax", sector: "Retail", score: 72 },
          { name: "FinServ SA", sector: "Fintech", score: 91 },
        ].map((lead, i) => (
          <div key={i} className="flex items-center gap-1 py-0.5">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-700 dark:text-gray-300 truncate">{lead.name}</div>
            </div>
            <div className="w-8 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${lead.score > 80 ? "bg-green-500" : lead.score > 60 ? "bg-yellow-500" : "bg-gray-400"}`}
                style={{ width: `${lead.score}%` }}
              />
            </div>
            <Badge variant={lead.score > 80 ? "success" : "default"}>{lead.score}%</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

// 10. Embudo de Ventas Mockup
function EmbudoVentasMockup() {
  const stages = [
    { name: "Visitantes", value: "10.000", color: "bg-gray-300 dark:bg-gray-600", width: "100%" },
    { name: "Leads", value: "2.400", color: "bg-blue-300 dark:bg-blue-700", width: "75%" },
    { name: "Cualificados", value: "890", color: "bg-[#0078AA]", width: "50%" },
    { name: "Clientes", value: "156", color: "bg-[#7C3AED]", width: "25%" },
  ]
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-1.5 flex gap-2 text-[7px]">
      {/* Funnel */}
      <div className="flex-1 flex flex-col justify-center gap-0.5">
        {stages.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`h-2.5 ${s.color} rounded-sm`} style={{ width: s.width }} />
            <span className="text-[6px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{s.value}</span>
          </div>
        ))}
      </div>
      {/* Metrics */}
      <div className="w-14 flex flex-col justify-center gap-1">
        <div className="bg-gray-50 dark:bg-gray-800 rounded p-1 text-center">
          <div className="text-[6px] text-gray-400">CAC</div>
          <div className="font-semibold text-gray-700 dark:text-gray-300">€42</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded p-1 text-center">
          <div className="text-[6px] text-gray-400">LTV</div>
          <div className="font-semibold text-gray-700 dark:text-gray-300">€1.2k</div>
        </div>
      </div>
    </div>
  )
}

// 11. Onboarding Mockup
function OnboardingMockup() {
  const steps = [
    { name: "Email bienvenida", done: true },
    { name: "Datos completados", done: true },
    { name: "Firma contrato", active: true },
    { name: "Formación", done: false },
    { name: "Activación", done: false },
  ]
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-1.5 text-[7px]">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-gray-600 dark:text-gray-400">Onboarding</span>
        <Badge variant="info">Paso 3/5</Badge>
      </div>
      {/* Progress bar */}
      <div className="h-1 bg-gray-100 dark:bg-gray-700 rounded-full mb-1.5 overflow-hidden">
        <div className="h-full w-[60%] bg-gradient-to-r from-[#0078AA] to-[#7C3AED] rounded-full" />
      </div>
      {/* Steps */}
      <div className="flex gap-0.5">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            {s.done ? (
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            ) : s.active ? (
              <div className="w-3 h-3 rounded-full border-2 border-[#0078AA] bg-[#0078AA]/20" />
            ) : (
              <Circle className="w-3 h-3 text-gray-300 dark:text-gray-600" />
            )}
            <span className={`text-[5px] text-center mt-0.5 ${s.active ? "text-[#0078AA] font-medium" : "text-gray-400"}`}>
              {s.name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 12. Omnicanal Mockup
function OmnicanalMockup() {
  const channels = [
    { icon: Phone, color: "text-[#0078AA]", name: "Carlos M.", channel: "Llamada", time: "3m" },
    { icon: MessageCircle, color: "text-[#25D366]", name: "Ana R.", channel: "WhatsApp", time: "5m" },
    { icon: Globe, color: "text-[#7C3AED]", name: "Pedro S.", channel: "Chat Web", time: "1m" },
    { icon: Mail, color: "text-gray-500", name: "Laura V.", channel: "Email", time: "12m" },
  ]
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-1.5 text-[7px]">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-gray-600 dark:text-gray-400">Bandeja unificada · 4 canales</span>
      </div>
      <div className="space-y-0.5">
        {channels.map((c, i) => (
          <div key={i} className="flex items-center gap-1 py-0.5">
            <c.icon className={`w-3 h-3 ${c.color} shrink-0`} />
            <Avatar name={c.name} color="bg-gray-400" />
            <div className="flex-1 min-w-0">
              <span className="text-gray-700 dark:text-gray-300 truncate">{c.name}</span>
            </div>
            <span className="text-[6px] text-gray-400">{c.channel}</span>
            <span className="text-gray-400">{c.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 13. Voz Humana Mockup
function VozHumanaMockup() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-2 text-[8px]">
      {/* Agent info */}
      <div className="flex items-center gap-1 mb-1">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center">
          <Mic className="w-2.5 h-2.5 text-white" />
        </div>
        <div>
          <div className="font-medium text-gray-800 dark:text-gray-200">Agente IA · Voz Ana</div>
          <Badge variant="success">En llamada</Badge>
        </div>
      </div>
      {/* Waveform */}
      <div className="w-full flex items-center justify-center gap-0.5 h-5 my-1">
        {[2, 4, 6, 8, 10, 12, 8, 14, 10, 8, 12, 6, 8, 10, 6, 4, 6, 8, 4, 2].map((h, i) => (
          <div 
            key={i} 
            className="w-1 rounded-full bg-gradient-to-t from-[#0078AA] to-[#7C3AED]" 
            style={{ height: `${h}px` }} 
          />
        ))}
      </div>
      {/* Metrics */}
      <div className="flex gap-2 text-[6px] text-gray-500 dark:text-gray-400">
        <span>Latencia: 280ms</span>
        <span>ES</span>
        <span>Positivo</span>
      </div>
      {/* Timeline */}
      <div className="flex items-center gap-1 mt-1 w-full max-w-[120px]">
        <span className="text-[6px] text-gray-400">00:00</span>
        <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full relative">
          <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#0078AA] rounded-full" />
        </div>
        <span className="text-[6px] text-gray-400">04:21</span>
      </div>
    </div>
  )
}

// Default mockup with icon
function DefaultMockup({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 flex items-center justify-center">
      <Icon className="w-8 h-8 text-[#0078AA]/40" />
    </div>
  )
}

// Main component that selects the right mockup based on slug
export function SolutionMockup({ slug, fallbackIcon }: { slug: string; fallbackIcon?: React.ElementType }) {
  // Map slugs to mockup components
  const mockupMap: Record<string, React.ReactNode> = {
    // Call Center variants
    "ia-call-center": <CallCenterMockup />,
    "call-center-ia": <CallCenterMockup />,
    // Atención telefónica variants
    "atencion-telefonica-ia": <AtencionTelefonicaMockup />,
    "atencion-telefonica": <AtencionTelefonicaMockup />,
    // WhatsApp variants
    "whatsapp-ia-empresas": <WhatsAppMockup />,
    "whatsapp-ia": <WhatsAppMockup />,
    "agente-whatsapp-ia": <WhatsAppMockup />,
    // Chat Web variants
    "agente-chat-web-ia": <ChatWebMockup />,
    "chat-web-ia": <ChatWebMockup />,
    "chat-inteligente-web": <ChatWebMockup />,
    // Chat Productos
    "agente-chat-productos-ia": <ChatProductosMockup />,
    "chat-productos-ia": <ChatProductosMockup />,
    // Ventas variants
    "agente-ventas-ia": <VentasMockup />,
    "ventas-ia": <VentasMockup />,
    "agente-de-ventas-ia": <VentasMockup />,
    // Soporte variants
    "agente-soporte-ia": <SoporteMockup />,
    "soporte-ia": <SoporteMockup />,
    "agente-de-soporte-ia": <SoporteMockup />,
    // Agendamientos variants
    "agente-agendamientos-ia": <AgendamientosMockup />,
    "agendamiento-ia": <AgendamientosMockup />,
    "agente-de-agendamientos-ia": <AgendamientosMockup />,
    // Lead Generation variants
    "lead-generation-ia": <LeadGenerationMockup />,
    "generacion-leads-ia": <LeadGenerationMockup />,
    // Embudo / Automacion ventas
    "automacion-ventas-ia": <EmbudoVentasMockup />,
    "embudo-ventas-ia": <EmbudoVentasMockup />,
    // Onboarding
    "onboarding-automatico": <OnboardingMockup />,
    "onboarding-ia": <OnboardingMockup />,
    // Omnicanal
    "ia-omnicanal": <OmnicanalMockup />,
    "omnicanal-ia": <OmnicanalMockup />,
    // Voz Humana
    "agentes-ia-voz-humana": <VozHumanaMockup />,
    "voz-humana-ia": <VozHumanaMockup />,
  }

  const mockup = mockupMap[slug]
  
  if (mockup) {
    return <>{mockup}</>
  }
  
  // Fallback to icon-based mockup
  const Icon = fallbackIcon || Globe
  return <DefaultMockup icon={Icon} />
}
