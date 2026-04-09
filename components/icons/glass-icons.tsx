"use client"

// ═══════════════════════════════════════════════════════════════════════════
// ICON 1 — CANALES (Chat Bubble)
// Forma: Balão de chat com 3 linhas de texto
// ═══════════════════════════════════════════════════════════════════════════
export function GlassIconChannels() {
  return (
    <div 
      className="relative"
      style={{ 
        filter: "drop-shadow(0 0 20px rgba(0,120,170,0.35)) drop-shadow(0 0 40px rgba(124,58,237,0.2))",
        width: 96,
        height: 96
      }}
    >
      <svg width="96" height="96" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chat-back" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
          <linearGradient id="chat-mid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#0078AA" />
          </linearGradient>
          <linearGradient id="chat-front" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0078AA" />
            <stop offset="100%" stopColor="#00A3E0" />
          </linearGradient>
          <filter id="chat-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.08" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
          <filter id="chat-blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        
        {/* Layer 3 - Back shadow */}
        <g transform="translate(6, 6)">
          <path 
            d="M15 15 H90 C95 15 100 20 100 25 V65 C100 70 95 75 90 75 H45 L25 95 V75 H15 C10 75 5 70 5 65 V25 C5 20 10 15 15 15 Z" 
            fill="url(#chat-back)" 
            fillOpacity="0.3"
          />
        </g>
        
        {/* Layer 2 - Middle */}
        <g transform="translate(3, 3)">
          <path 
            d="M15 15 H90 C95 15 100 20 100 25 V65 C100 70 95 75 90 75 H45 L25 95 V75 H15 C10 75 5 70 5 65 V25 C5 20 10 15 15 15 Z" 
            fill="url(#chat-mid)" 
            fillOpacity="0.5"
          />
        </g>
        
        {/* Layer 1 - Front */}
        <g filter="url(#chat-grain)">
          <path 
            d="M15 15 H90 C95 15 100 20 100 25 V65 C100 70 95 75 90 75 H45 L25 95 V75 H15 C10 75 5 70 5 65 V25 C5 20 10 15 15 15 Z" 
            fill="url(#chat-front)" 
            fillOpacity="0.85"
          />
        </g>
        
        {/* Text lines inside bubble */}
        <rect x="22" y="32" width="50" height="5" rx="2.5" fill="white" fillOpacity="0.6" />
        <rect x="22" y="44" width="40" height="5" rx="2.5" fill="white" fillOpacity="0.5" />
        <rect x="22" y="56" width="30" height="5" rx="2.5" fill="white" fillOpacity="0.4" />
        
        {/* Glass reflection */}
        <ellipse cx="50" cy="25" rx="30" ry="8" fill="white" fillOpacity="0.2" />
        
        {/* Sparkle - 4 point star */}
        <g filter="url(#chat-blur)">
          <path d="M18 18 L20 12 L22 18 L28 20 L22 22 L20 28 L18 22 L12 20 Z" fill="white" fillOpacity="0.95" />
        </g>
        <circle cx="20" cy="20" r="2" fill="white" />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ICON 2 — IA (Brain / Neural Network)
// Forma: Cérebro estilizado com pontos de conexão neural
// ═══════════════════════════════════════════════════════════════════════════
export function GlassIconAI() {
  return (
    <div 
      className="relative"
      style={{ 
        filter: "drop-shadow(0 0 20px rgba(0,120,170,0.35)) drop-shadow(0 0 40px rgba(124,58,237,0.2))",
        width: 96,
        height: 96
      }}
    >
      <svg width="96" height="96" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brain-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0078AA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="brain-shadow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
          <filter id="brain-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.08" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
          <filter id="brain-blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        
        {/* Shadow layer */}
        <g transform="translate(4, 4)">
          <path 
            d="M60 10 C30 10 15 35 15 55 C15 75 30 95 60 105 C90 95 105 75 105 55 C105 35 90 10 60 10 Z"
            fill="url(#brain-shadow)" 
            fillOpacity="0.25"
          />
        </g>
        
        {/* Main brain shape */}
        <g filter="url(#brain-grain)">
          {/* Left hemisphere */}
          <path 
            d="M58 12 C32 14 18 36 18 55 C18 74 30 92 58 102 L58 12 Z"
            fill="url(#brain-main)" 
            fillOpacity="0.85"
          />
          {/* Right hemisphere - slightly lighter */}
          <path 
            d="M62 12 C88 14 102 36 102 55 C102 74 90 92 62 102 L62 12 Z"
            fill="url(#brain-main)" 
            fillOpacity="0.75"
          />
        </g>
        
        {/* Brain folds/sulci - curved lines */}
        <path d="M38 35 Q32 55 40 75" stroke="white" strokeOpacity="0.35" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M50 25 Q44 55 52 85" stroke="white" strokeOpacity="0.3" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M70 25 Q76 55 68 85" stroke="white" strokeOpacity="0.3" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M82 35 Q88 55 80 75" stroke="white" strokeOpacity="0.35" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        
        {/* Neural connection points */}
        <circle cx="38" cy="35" r="4" fill="white" fillOpacity="0.8" />
        <circle cx="40" cy="75" r="4" fill="white" fillOpacity="0.7" />
        <circle cx="50" cy="25" r="3.5" fill="white" fillOpacity="0.75" />
        <circle cx="52" cy="85" r="3.5" fill="white" fillOpacity="0.65" />
        <circle cx="60" cy="55" r="5" fill="white" fillOpacity="0.9" />
        <circle cx="70" cy="25" r="3.5" fill="white" fillOpacity="0.75" />
        <circle cx="68" cy="85" r="3.5" fill="white" fillOpacity="0.65" />
        <circle cx="82" cy="35" r="4" fill="white" fillOpacity="0.8" />
        <circle cx="80" cy="75" r="4" fill="white" fillOpacity="0.7" />
        
        {/* Connection lines between nodes */}
        <line x1="38" y1="35" x2="50" y2="25" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="50" y1="25" x2="60" y2="55" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="60" y1="55" x2="70" y2="25" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="70" y1="25" x2="82" y2="35" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="60" y1="55" x2="40" y2="75" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="60" y1="55" x2="80" y2="75" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="52" y1="85" x2="60" y2="55" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
        <line x1="68" y1="85" x2="60" y2="55" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
        
        {/* Glass reflection */}
        <ellipse cx="48" cy="28" rx="18" ry="8" fill="white" fillOpacity="0.15" />
        
        {/* Sparkle */}
        <g filter="url(#brain-blur)">
          <path d="M25 18 L27 12 L29 18 L35 20 L29 22 L27 28 L25 22 L19 20 Z" fill="white" fillOpacity="0.95" />
        </g>
        <circle cx="27" cy="20" r="2" fill="white" />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ICON 3 — CITAS (Calendar)
// Forma: Calendário com barra superior, argolas e grelha de dias
// ═══════════════════════════════════════════════════════════════════════════
export function GlassIconCalendar() {
  return (
    <div 
      className="relative"
      style={{ 
        filter: "drop-shadow(0 0 20px rgba(0,120,170,0.35)) drop-shadow(0 0 40px rgba(124,58,237,0.2))",
        width: 96,
        height: 96
      }}
    >
      <svg width="96" height="96" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cal-header" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0078AA" />
            <stop offset="100%" stopColor="#005588" />
          </linearGradient>
          <linearGradient id="cal-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0078AA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="cal-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
          <filter id="cal-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.08" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
          <filter id="cal-blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        
        {/* Shadow layer */}
        <g transform="translate(4, 4)">
          <rect x="15" y="22" width="90" height="80" rx="12" fill="url(#cal-shadow)" fillOpacity="0.25" />
        </g>
        
        {/* Main calendar body */}
        <g filter="url(#cal-grain)">
          {/* Body */}
          <rect x="15" y="35" width="90" height="70" rx="12" fill="url(#cal-body)" fillOpacity="0.8" />
          {/* Header bar */}
          <path d="M15 34 L15 22 C15 16 21 10 27 10 L93 10 C99 10 105 16 105 22 L105 34 Z" fill="url(#cal-header)" fillOpacity="0.95" />
          <rect x="15" y="30" width="90" height="12" fill="url(#cal-header)" fillOpacity="0.95" />
        </g>
        
        {/* Calendar rings/hooks */}
        <rect x="35" y="5" width="8" height="20" rx="4" fill="white" fillOpacity="0.8" />
        <rect x="77" y="5" width="8" height="20" rx="4" fill="white" fillOpacity="0.8" />
        
        {/* Day grid - 4x3 */}
        <rect x="24" y="50" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        <rect x="44" y="50" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        <rect x="64" y="50" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        <rect x="84" y="50" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        
        <rect x="24" y="68" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        <rect x="44" y="68" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        {/* Highlighted day with checkmark */}
        <rect x="64" y="68" width="16" height="14" rx="3" fill="white" fillOpacity="0.7" />
        <path d="M68 75 L72 79 L80 70" stroke="#0078AA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="84" y="68" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        
        <rect x="24" y="86" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        <rect x="44" y="86" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        <rect x="64" y="86" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        <rect x="84" y="86" width="16" height="14" rx="3" fill="white" fillOpacity="0.15" />
        
        {/* Glass reflection on header */}
        <ellipse cx="60" cy="22" rx="30" ry="8" fill="white" fillOpacity="0.25" />
        
        {/* Sparkle */}
        <g filter="url(#cal-blur)">
          <path d="M18 12 L20 6 L22 12 L28 14 L22 16 L20 22 L18 16 L12 14 Z" fill="white" fillOpacity="0.95" />
        </g>
        <circle cx="20" cy="14" r="2" fill="white" />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ICON 4 — DATOS (Database - Stacked Discs/Cylinders)
// Forma: 3 discos/cilindros empilhados verticalmente
// ═══════════════════════════════════════════════════════════════════════════
export function GlassIconDatabase() {
  return (
    <div 
      className="relative"
      style={{ 
        filter: "drop-shadow(0 0 20px rgba(0,120,170,0.35)) drop-shadow(0 0 40px rgba(124,58,237,0.2))",
        width: 96,
        height: 96
      }}
    >
      <svg width="96" height="96" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="db-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0078AA" />
            <stop offset="100%" stopColor="#00A3E0" />
          </linearGradient>
          <linearGradient id="db-mid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0078AA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="db-bottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <filter id="db-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.08" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
          <filter id="db-blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        
        {/* DISC 3 - Bottom (largest, darkest - violet/pink) */}
        <g filter="url(#db-grain)">
          <ellipse cx="60" cy="100" rx="45" ry="12" fill="url(#db-bottom)" fillOpacity="0.45" />
          <rect x="15" y="85" width="90" height="15" fill="url(#db-bottom)" fillOpacity="0.45" />
          <ellipse cx="60" cy="85" rx="45" ry="12" fill="url(#db-bottom)" fillOpacity="0.55" />
          {/* Reflection */}
          <ellipse cx="60" cy="85" rx="32" ry="6" fill="white" fillOpacity="0.1" />
          {/* Data line */}
          <line x1="25" y1="92" x2="95" y2="92" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
        </g>
        
        {/* DISC 2 - Middle (medium - transition colors) */}
        <g filter="url(#db-grain)">
          <ellipse cx="60" cy="70" rx="45" ry="12" fill="url(#db-mid)" fillOpacity="0.55" />
          <rect x="15" y="55" width="90" height="15" fill="url(#db-mid)" fillOpacity="0.55" />
          <ellipse cx="60" cy="55" rx="45" ry="12" fill="url(#db-mid)" fillOpacity="0.7" />
          {/* Reflection */}
          <ellipse cx="58" cy="55" rx="30" ry="6" fill="white" fillOpacity="0.15" />
          {/* Data line */}
          <line x1="28" y1="62" x2="92" y2="62" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
        </g>
        
        {/* DISC 1 - Top (smallest, brightest - cyan) */}
        <g filter="url(#db-grain)">
          <ellipse cx="60" cy="40" rx="45" ry="12" fill="url(#db-top)" fillOpacity="0.75" />
          <rect x="15" y="25" width="90" height="15" fill="url(#db-top)" fillOpacity="0.75" />
          <ellipse cx="60" cy="25" rx="45" ry="12" fill="url(#db-top)" fillOpacity="0.9" />
          {/* Reflection */}
          <ellipse cx="55" cy="25" rx="28" ry="6" fill="white" fillOpacity="0.25" />
          {/* Data line */}
          <line x1="30" y1="32" x2="90" y2="32" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        </g>
        
        {/* Sparkle on top disc */}
        <g filter="url(#db-blur)">
          <path d="M22 18 L24 12 L26 18 L32 20 L26 22 L24 28 L22 22 L16 20 Z" fill="white" fillOpacity="0.95" />
        </g>
        <circle cx="24" cy="20" r="2" fill="white" />
      </svg>
    </div>
  )
}

// Export all icons as an array for easy iteration
export const glassStackIcons = [
  GlassIconChannels,  // Canales - Chat bubble
  GlassIconAI,        // IA - Brain/neural network
  GlassIconCalendar,  // Citas - Calendar
  GlassIconDatabase,  // Datos - Stacked database discs
]
